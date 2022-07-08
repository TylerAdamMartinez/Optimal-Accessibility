import Tesseract from 'tesseract.js';

export async function getText(images) {
  // making sure Tesseract only runs when there is a valid image
  if (images.topLeft !== undefined) {
    console.log('Searching for text...');
    await Tesseract.recognize(images.topLeft.img, 'eng').then(({ data }) => {
      images.topLeft.textConfidence = data.confidence;
      images.topLeft.text = data.text;
    });

    await Tesseract.recognize(images.topMiddle.img, 'eng').then(({ data }) => {
      images.topMiddle.textConfidence = data.confidence;
      images.topMiddle.text = data.text;
    });

    await Tesseract.recognize(images.topRight.img, 'eng').then(({ data }) => {
      images.topRight.textConfidence = data.confidence;
      images.topRight.text = data.text;
    });

    await Tesseract.recognize(images.middleLeft.img, 'eng').then(({ data }) => {
      images.middleLeft.textConfidence = data.confidence;
      images.middleLeft.text = data.text;
    });

    await Tesseract.recognize(images.middle.img, 'eng').then(({ data }) => {
      images.middle.textConfidence = data.confidence;
      images.middle.text = data.text;
    });

    await Tesseract.recognize(images.middleRight.img, 'eng').then(({ data }) => {
      images.middleRight.textConfidence = data.confidence;
      images.middleRight.text = data.text;
    });

    await Tesseract.recognize(images.bottomLeft.img, 'eng').then(({ data }) => {
      images.bottomLeft.textConfidence = data.confidence;
      images.bottomLeft.text = data.text;
    });

    await Tesseract.recognize(images.bottomMiddle.img, 'eng').then(({ data }) => {
      images.bottomMiddle.textConfidence = data.confidence;
      images.bottomMiddle.text = data.text;
    });

    await Tesseract.recognize(images.bottomRight.img, 'eng').then(({ data }) => {
      images.bottomRight.textConfidence = data.confidence;
      images.bottomRight.text = data.text;
    });

    console.log('Text Found');
  }

  return images;
}
