import Tesseract from 'tesseract.js';
import { getColors } from './Color';

export async function getText(image) {
  let grade = 0;
  // making sure Tesseract only runs when there is a valid image
  await Tesseract.recognize(image.topLeft.img, 'eng').then(({ data }) => {
    image.topLeft.textConfidence = data.confidence;
    grade += data.confidence;
    image.topLeft.text = data.text;
  });

  await Tesseract.recognize(image.topMiddle.img, 'eng').then(({ data }) => {
    image.topMiddle.textConfidence = data.confidence;
    grade += data.confidence;
    image.topMiddle.text = data.text;
  });

  await Tesseract.recognize(image.topRight.img, 'eng').then(({ data }) => {
    image.topRight.textConfidence = data.confidence;
    grade += data.confidence;
    image.topRight.text = data.text;
  });

  await Tesseract.recognize(image.middleLeft.img, 'eng').then(({ data }) => {
    image.middleLeft.textConfidence = data.confidence;
    grade += data.confidence;
    image.middleLeft.text = data.text;
  });

  await Tesseract.recognize(image.middle.img, 'eng').then(({ data }) => {
    image.middle.textConfidence = data.confidence;
    grade += data.confidence;
    image.middle.text = data.text;
  });

  await Tesseract.recognize(image.middleRight.img, 'eng').then(({ data }) => {
    image.middleRight.textConfidence = data.confidence;
    grade += data.confidence;
    image.middleRight.text = data.text;
  });

  await Tesseract.recognize(image.bottomLeft.img, 'eng').then(({ data }) => {
    image.bottomLeft.textConfidence = data.confidence;
    grade += data.confidence;
    image.bottomLeft.text = data.text;
  });

  await Tesseract.recognize(image.bottomMiddle.img, 'eng').then(({ data }) => {
    image.bottomMiddle.textConfidence = data.confidence;
    grade += data.confidence;
    image.bottomMiddle.text = data.text;
  });

  await Tesseract.recognize(image.bottomRight.img, 'eng').then(({ data }) => {
    image.bottomRight.textConfidence = data.confidence;
    grade += data.confidence;
    image.bottomRight.text = data.text;
  });

  grade = grade / 9;
  if (grade < 60 && grade > 0) {
    grade += 40;
  } else if (grade < 70 && grade > 60) {
    grade += 30;
  } else if (grade < 80 && grade > 70) {
    grade += 20;
  } else if (grade < 90 && grade > 80) {
    grade += 20;
  }

  let cg;
  let images;
  await getColors(image).then(({ image, colorGrade }) => {
    images = image;
    cg = colorGrade;
  });

  let obj = {
    images,
    tg: grade,
    cg,
  };

  return obj;
}
