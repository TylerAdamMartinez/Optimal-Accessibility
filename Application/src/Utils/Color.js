import { prominent } from 'color.js';

export async function getColors(image) {
  if (image.topLeft.img !== undefined) {
    console.log('Getting colors');
    await prominent(image.topLeft.img, { format: 'hex' }).then((color) => {
      image.topLeft.color = color;
    });

    await prominent(image.topMiddle.img, { format: 'hex' }).then((color) => {
      image.topMiddle.color = color;
    });

    await prominent(image.topRight.img, { format: 'hex' }).then((color) => {
      image.topRight.color = color;
    });

    await prominent(image.middleLeft.img, { format: 'hex' }).then((color) => {
      image.middleLeft.color = color;
    });

    await prominent(image.middle.img, { format: 'hex' }).then((color) => {
      image.middle.color = color;
    });

    await prominent(image.middleRight.img, { format: 'hex' }).then((color) => {
      image.middleRight.color = color;
    });

    await prominent(image.bottomLeft.img, { format: 'hex' }).then((color) => {
      image.bottomLeft.color = color;
    });

    await prominent(image.bottomMiddle.img, { format: 'hex' }).then((color) => {
      image.bottomMiddle.color = color;
    });

    await prominent(image.bottomRight.img, { format: 'hex' }).then((color) => {
      image.bottomRight.color = color;
    });

    console.log('Found colors');
  }

  return image;
}
