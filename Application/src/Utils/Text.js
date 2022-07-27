import Tesseract from "tesseract.js";
import { getColors } from "./Color";

export async function getText(image) {
  let grade = 0;

  [image, grade] = await findText(image, grade);

  grade = grade / 3;
  if (grade < 60 && grade > 0) {
    grade += 15;
  } else if (grade < 70 && grade > 60) {
    grade += 25;
  } else if (grade < 80 && grade > 70) {
    grade += 15;
  } else if (grade < 90 && grade > 80) {
    grade += 20;
  }

  let cg;
  let images;
  await getColors(image).then(({ image, colorGrade }) => {
    images = image;
    cg = colorGrade;
  });

  let imagesWithGrades = {
    images,
    tg: grade,
    cg,
  };

  return imagesWithGrades;
}

const findText = async (image, grade) => {
  await Tesseract.recognize(image.tempImages.top.img, "eng").then(
    ({ data }) => {
      image.tempImages.top.text = data.text;
      image.tempImages.top.textConfidence = data.confidence;
      grade += data.confidence;
    }
  );

  await Tesseract.recognize(image.tempImages.middle.img, "eng").then(
    ({ data }) => {
      image.tempImages.middle.text = data.text;
      image.tempImages.middle.textConfidence = data.confidence;
      grade += data.confidence;
    }
  );

  await Tesseract.recognize(image.tempImages.bottom.img, "eng").then(
    ({ data }) => {
      image.tempImages.bottom.text = data.text;
      image.tempImages.bottom.textConfidence = data.confidence;
      grade += data.confidence;
    }
  );

  grade = findOutlier(image, grade);

  return [image, grade];
};

const findOutlier = (image, grade) => {
  let topGrade = image.tempImages.top.textConfidence;
  let middleGrade = image.tempImages.middle.textConfidence;
  let bottomGrade = image.tempImages.bottom.textConfidence;

  // edge case for no text
  if (topGrade < 15 && middleGrade < 15 && bottomGrade < 15) {
    grade = 0;
  } else {
    // find outlier, generally, the section of the image has no text is getting a low score
    let diffTop = topGrade - middleGrade;
    let diffBottom = bottomGrade - middleGrade;
    if (diffTop > 20 || diffBottom > 20) {
      // if there is an outlier, try and counter its effect on the score
      grade += 25;
    } else if (diffTop > 20 && diffBottom > 20) {
      grade += 35;
    }
  }

  return grade;
};
