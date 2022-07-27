import { prominent } from "color.js";
import { colorContrastRatioCalculator } from "@mdhnpm/color-contrast-ratio-calculator";

export async function getColors(image) {
  let cgArr = [];
  await prominent(image.topLeft.img, { amount: 3, format: "hex" }).then(
    (color) => {
      image.topLeft.color = color;
      cgArr[0] = getScore(image.topLeft.color);
    }
  );

  await prominent(image.topMiddle.img, { amount: 3, format: "hex" }).then(
    (color) => {
      image.topMiddle.color = color;
      cgArr[1] = getScore(image.topMiddle.color);
    }
  );

  await prominent(image.topRight.img, { amount: 3, format: "hex" }).then(
    (color) => {
      image.topRight.color = color;
      cgArr[2] = getScore(image.topRight.color);
    }
  );

  await prominent(image.middleLeft.img, { amount: 3, format: "hex" }).then(
    (color) => {
      image.middleLeft.color = color;
      cgArr[3] = getScore(image.middleLeft.color);
    }
  );

  await prominent(image.middle.img, { amount: 3, format: "hex" }).then(
    (color) => {
      image.middle.color = color;
      cgArr[4] = getScore(image.middle.color);
    }
  );

  await prominent(image.middleRight.img, { amount: 3, format: "hex" }).then(
    (color) => {
      image.middleRight.color = color;
      cgArr[5] = getScore(image.middleRight.color);
    }
  );

  await prominent(image.bottomLeft.img, { amount: 3, format: "hex" }).then(
    (color) => {
      image.bottomLeft.color = color;
      cgArr[6] = getScore(image.bottomLeft.color);
    }
  );

  await prominent(image.bottomMiddle.img, { amount: 3, format: "hex" }).then(
    (color) => {
      image.bottomMiddle.color = color;
      cgArr[7] = getScore(image.bottomMiddle.color);
    }
  );

  await prominent(image.bottomRight.img, { amount: 3, format: "hex" }).then(
    (color) => {
      image.bottomRight.color = color;
      cgArr[8] = getScore(image.bottomRight.color);
    }
  );

  let colorGrade = 0;
  let counter = 0;
  cgArr.forEach((grade) => {
    if (grade === 3) {
      counter++;
    }
    colorGrade += grade;
  });

  // if counter === 9 then the image should be one solid color, gets a rating of 0
  if (counter === 9) {
    colorGrade = 0;
  }

  colorGrade.toFixed(2);

  if (colorGrade >= 50) {
    colorGrade = 95;
  } else if (colorGrade >= 30 && colorGrade < 50) {
    colorGrade += 45;
  } else if (colorGrade > 0 && colorGrade < 30) {
    colorGrade += 25;
  }

  let obj = {
    image,
    colorGrade,
  };

  return obj;
}

const getScore = (color) => {
  let scores = [];
  let high = 0;
  if (color.length === 3) {
    scores[0] = colorContrastRatioCalculator(color[0], color[1]);
    scores[1] = colorContrastRatioCalculator(color[0], color[2]);
    scores[2] = colorContrastRatioCalculator(color[1], color[2]);
  } else {
    // If 'color' received by getScore() is only one value, no need to find contrast ratio for that square
    return 3;
  }

  scores.forEach((score) => {
    if (score > high) high = score;
  });

  return high;
};
