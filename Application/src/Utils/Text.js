import Tesseract from 'tesseract.js';

export async function getText(images) {
	for (let i = 0; i < 9; i++) {
		switch (i) {
			case 0:
				Tesseract.recognize(images.topLeft.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					images.topLeft.text = text;
				});
				break;
			case 1:
				Tesseract.recognize(images.topMiddle.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					images.topMiddle.text = text;
				});
				break;
			case 2:
				Tesseract.recognize(images.topRight.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					images.topRight.text = text;
				});
				break;
			case 3:
				Tesseract.recognize(images.middleLeft.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					images.middleLeft.text = text;
				});
				break;
			case 4:
				Tesseract.recognize(images.middle.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					images.middle.text = text;
				});
				break;
			case 5:
				Tesseract.recognize(images.middleRight.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					images.middleRight.text = text;
				});
				break;
			case 6:
				Tesseract.recognize(images.bottomLeft.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					images.bottomLeft.text = text;
				});
				break;
			case 7:
				Tesseract.recognize(images.bottomMiddle.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					images.bottomMiddle.text = text;
				});
				break;
			case 8:
				Tesseract.recognize(images.bottomRight.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					images.bottomRight.text = text;
				});
				break;
			default:
				break;
		}
	}
	return images;
}
