import { Image } from 'image-js';
import { changeDpiDataUrl } from 'changedpi';

export async function getImageGrid(image) {
  const ogImage = await Image.load(image);
  const { width, height } = ogImage;
  let newImages = {
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

  newImages.topLeft.img = ogImage
    .crop({
      x: 0,
      y: 0,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  // changing DPI of the images to help the text recognition
  newImages.topLeft.img = changeDpiDataUrl(newImages.topLeft.img, 300);

  newImages.topMiddle.img = ogImage
    .crop({
      x: squareWidth,
      y: 0,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  newImages.topMiddle.img = changeDpiDataUrl(newImages.topMiddle.img, 300);

  newImages.topRight.img = ogImage
    .crop({
      x: squareWidth * 2,
      y: 0,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  newImages.topRight.img = changeDpiDataUrl(newImages.topRight.img, 300);

  newImages.middleLeft.img = ogImage
    .crop({
      x: 0,
      y: squareHeight,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  newImages.middleLeft.img = changeDpiDataUrl(newImages.middleLeft.img, 300);

  newImages.middle.img = ogImage
    .crop({
      x: squareWidth,
      y: squareHeight,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  newImages.middle.img = changeDpiDataUrl(newImages.middle.img, 300);

  newImages.middleRight.img = ogImage
    .crop({
      x: squareWidth * 2,
      y: squareHeight,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  newImages.middleRight.img = changeDpiDataUrl(newImages.middleRight.img, 300);

  newImages.bottomLeft.img = ogImage
    .crop({
      x: 0,
      y: squareHeight * 2,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  newImages.bottomLeft.img = changeDpiDataUrl(newImages.bottomLeft.img, 300);

  newImages.bottomMiddle.img = ogImage
    .crop({
      x: squareWidth,
      y: squareHeight * 2,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  newImages.bottomMiddle.img = changeDpiDataUrl(newImages.bottomMiddle.img, 300);

  newImages.bottomRight.img = ogImage
    .crop({
      x: squareWidth * 2,
      y: squareHeight * 2,
      height: squareHeight,
      width: squareWidth,
    })
    .toDataURL();
  newImages.bottomRight.img = changeDpiDataUrl(newImages.bottomRight.img, 300);

  return newImages;
}
