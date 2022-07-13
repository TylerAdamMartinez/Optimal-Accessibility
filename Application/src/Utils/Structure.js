import { Image } from 'image-js';
import { changeDpiDataUrl } from 'changedpi';
import { getText } from './Text';

export async function getImageGrid(image) {
  const ogImage = await Image.load(image);
  const { width, height } = ogImage;
  let newImages = {
    tempImages: {
      top: {
        img: null,
      },
      middle: {
        img: null,
      },
      bottom: {
        img: null,
      },
    },
    topLeft: {
      img: null,
      text: null,
      textConfidence: null,
      color: null,
    },
    topMiddle: {
      img: null,
      text: null,
      textConfidence: null,
      color: null,
    },
    topRight: {
      img: null,
      text: null,
      textConfidence: null,
      color: null,
    },
    middleLeft: {
      img: null,
      text: null,
      textConfidence: null,
      color: null,
    },
    middle: {
      img: null,
      text: null,
      textConfidence: null,
      color: null,
    },
    middleRight: {
      img: null,
      text: null,
      textConfidence: null,
      color: null,
    },
    bottomLeft: {
      img: null,
      text: null,
      textConfidence: null,
      color: null,
    },
    bottomMiddle: {
      img: null,
      text: null,
      textConfidence: null,
      color: null,
    },
    bottomRight: {
      img: null,
      text: null,
      textConfidence: null,
      color: null,
    },
  };

  // split width and height for 9 section grid
  let squareWidth = width / 3;
  let squareHeight = height / 3;

  newImages = await bigGrid(newImages, ogImage, squareHeight, squareWidth);
  newImages = await smallGrid(newImages, ogImage, squareHeight, width);

  let structureGrade = 0;

  const grades = {
    images: null,
    textGrade: null,
    colorGrade: null,
    structureGrade: structureGrade,
  };

  // find text
  await getText(newImages).then(({ images, tg, cg }) => {
    grades.images = images;
    grades.textGrade = tg;
    grades.colorGrade = cg;
  });

  structureGrade = grades.colorGrade + grades.textGrade;

  grades.structureGrade = structureGrade / 2;

  return grades;
}

const bigGrid = (images, ogImage, squareHeight, squareWidth) => {
  images.topLeft.img = ogImage
    .crop({
      x: 0,
      y: 0,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  // changing DPI of the images to help the text recognition
  images.topLeft.img = changeDpiDataUrl(images.topLeft.img, 300);

  images.topMiddle.img = ogImage
    .crop({
      x: squareWidth,
      y: 0,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  images.topMiddle.img = changeDpiDataUrl(images.topMiddle.img, 300);

  images.topRight.img = ogImage
    .crop({
      x: squareWidth * 2,
      y: 0,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  images.topRight.img = changeDpiDataUrl(images.topRight.img, 300);

  images.middleLeft.img = ogImage
    .crop({
      x: 0,
      y: squareHeight,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  images.middleLeft.img = changeDpiDataUrl(images.middleLeft.img, 300);

  images.middle.img = ogImage
    .crop({
      x: squareWidth,
      y: squareHeight,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  images.middle.img = changeDpiDataUrl(images.middle.img, 300);

  images.middleRight.img = ogImage
    .crop({
      x: squareWidth * 2,
      y: squareHeight,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  images.middleRight.img = changeDpiDataUrl(images.middleRight.img, 300);

  images.bottomLeft.img = ogImage
    .crop({
      x: 0,
      y: squareHeight * 2,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  images.bottomLeft.img = changeDpiDataUrl(images.bottomLeft.img, 300);

  images.bottomMiddle.img = ogImage
    .crop({
      x: squareWidth,
      y: squareHeight * 2,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  images.bottomMiddle.img = changeDpiDataUrl(images.bottomMiddle.img, 300);

  images.bottomRight.img = ogImage
    .crop({
      x: squareWidth * 2,
      y: squareHeight * 2,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  images.bottomRight.img = changeDpiDataUrl(images.bottomRight.img, 300);

  return images;
};

const smallGrid = async (newImages, ogImage, height, width) => {
  newImages.tempImages.top.img = ogImage
    .crop({
      x: 0,
      y: 0,
      height: height,
      width: width,
    })
    .toDataURL();
  newImages.tempImages.top.img = changeDpiDataUrl(newImages.tempImages.top.img, 300);

  newImages.tempImages.middle.img = ogImage
    .crop({
      x: 0,
      y: height,
      height: height,
      width: width,
    })
    .toDataURL();
  newImages.tempImages.middle.img = changeDpiDataUrl(newImages.tempImages.middle.img, 300);

  newImages.tempImages.bottom.img = ogImage
    .crop({
      x: 0,
      y: height * 2,
      height: height,
      width: width,
    })
    .toDataURL();
  newImages.tempImages.bottom.img = changeDpiDataUrl(newImages.tempImages.bottom.img, 300);

  return newImages;
};
