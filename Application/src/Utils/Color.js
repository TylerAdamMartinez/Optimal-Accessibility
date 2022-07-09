import { prominent } from 'color.js';

export async function getColors(image) {
  if (image.topLeft.img !== undefined) {
    console.log('Getting colors');
    await prominent(image.topLeft.img, { amount: 1, format: 'hex' }).then((color) => {
      image.topLeft.color = color;
    });

    await prominent(image.topMiddle.img, { amount: 1, format: 'hex' }).then((color) => {
      image.topMiddle.color = color;
    });

    await prominent(image.topRight.img, { amount: 1, format: 'hex' }).then((color) => {
      image.topRight.color = color;
    });

    await prominent(image.middleLeft.img, { amount: 1, format: 'hex' }).then((color) => {
      image.middleLeft.color = color;
    });

    await prominent(image.middle.img, { amount: 1, format: 'hex' }).then((color) => {
      image.middle.color = color;
    });

    await prominent(image.middleRight.img, { amount: 1, format: 'hex' }).then((color) => {
      image.middleRight.color = color;
    });

    await prominent(image.bottomLeft.img, { amount: 1, format: 'hex' }).then((color) => {
      image.bottomLeft.color = color;
    });

    await prominent(image.bottomMiddle.img, { amount: 1, format: 'hex' }).then((color) => {
      image.bottomMiddle.color = color;
    });

    await prominent(image.bottomRight.img, { amount: 1, format: 'hex' }).then((color) => {
      image.bottomRight.color = color;
    });

    console.log('Found colors');
  }

  return image;
}
