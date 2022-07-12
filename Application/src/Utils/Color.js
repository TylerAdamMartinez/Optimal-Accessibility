import { prominent } from 'color.js';
import { colorContrastRatioCalculator } from '@mdhnpm/color-contrast-ratio-calculator';

export async function getColors(image) {
  await prominent(image.topLeft.img, { amount: 3, format: 'hex' }).then((color) => {
    image.topLeft.color = color;
  });

  await prominent(image.topMiddle.img, { amount: 3, format: 'hex' }).then((color) => {
    image.topMiddle.color = color;
  });

  await prominent(image.topRight.img, { amount: 3, format: 'hex' }).then((color) => {
    image.topRight.color = color;
  });

  await prominent(image.middleLeft.img, { amount: 3, format: 'hex' }).then((color) => {
    image.middleLeft.color = color;
  });

  await prominent(image.middle.img, { amount: 3, format: 'hex' }).then((color) => {
    image.middle.color = color;
  });

  await prominent(image.middleRight.img, { amount: 3, format: 'hex' }).then((color) => {
    image.middleRight.color = color;
  });

  await prominent(image.bottomLeft.img, { amount: 3, format: 'hex' }).then((color) => {
    image.bottomLeft.color = color;
  });

  await prominent(image.bottomMiddle.img, { amount: 3, format: 'hex' }).then((color) => {
    image.bottomMiddle.color = color;
  });

  await prominent(image.bottomRight.img, { amount: 3, format: 'hex' }).then((color) => {
    image.bottomRight.color = color;
  });

  let cgArr = [];
  for (let i = 0; i < 9; i++) {
    switch (i) {
      case 0:
        cgArr[i] = getScore(image.topLeft.color);
        break;
      case 1:
        cgArr[i] = getScore(image.topMiddle.color);
        break;
      case 2:
        cgArr[i] = getScore(image.topRight.color);
        break;
      case 3:
        cgArr[i] = getScore(image.middleLeft.color);
        break;
      case 4:
        cgArr[i] = getScore(image.middle.color);
        break;
      case 5:
        cgArr[i] = getScore(image.middleRight.color);
        break;
      case 6:
        cgArr[i] = getScore(image.bottomLeft.color);
        break;
      case 7:
        cgArr[i] = getScore(image.bottomMiddle.color);
        break;
      case 8:
        cgArr[i] = getScore(image.bottomRight.color);
        break;
      default:
        break;
    }
  }

  let colorGrade = 0;
  cgArr.forEach((grade) => {
    console.log(grade);
    colorGrade += grade;
  });

  colorGrade.toFixed(2);

  if (colorGrade >= 50) {
    colorGrade = 95;
  } else if (colorGrade >= 30 && colorGrade < 50) {
    colorGrade += 45;
  } else {
    colorGrade += 55;
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
  scores[0] = colorContrastRatioCalculator(color[0], color[1]);
  scores[1] = colorContrastRatioCalculator(color[0], color[2]);
  scores[2] = colorContrastRatioCalculator(color[1], color[2]);

  scores.forEach((score) => {
    if (score > high) high = score;
  });

  return high;
};
