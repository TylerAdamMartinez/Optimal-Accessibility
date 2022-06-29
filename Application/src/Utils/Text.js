import Tesseract from 'tesseract.js';

export async function getText(images) {
	for (let i = 0; i < 9; i++) {
		switch (i) {
			case 0:
				await Tesseract.recognize(images.topLeft.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					console.log('Top Left:\n' + text);
					images.topLeft.text = text;
				});
				break;
			case 1:
				await Tesseract.recognize(images.topMiddle.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					console.log('Top Middle:\n' + text);
					images.topMiddle.text = text;
				});
				break;
			case 2:
				await Tesseract.recognize(images.topRight.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					console.log('Top Right:\n' + text);
					images.topRight.text = text;
				});
				break;
			case 3:
				await Tesseract.recognize(images.middleLeft.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					console.log('Middle Left:\n' + text);
					images.middleLeft.text = text;
				});
				break;
			case 4:
				await Tesseract.recognize(images.middle.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					console.log('Middle:\n' + text);
					images.middle.text = text;
				});
				break;
			case 5:
				await Tesseract.recognize(images.middleRight.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					console.log('Middle Right:\n' + text);
					images.middleRight.text = text;
				});
				break;
			case 6:
				await Tesseract.recognize(images.bottomLeft.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					console.log('Bottom Left:\n' + text);
					images.bottomLeft.text = text;
				});
				break;
			case 7:
				Tesseract.recognize(images.bottomMiddle.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					console.log('Bottom Middle:\n' + text);
					images.bottomMiddle.text = text;
				});
				break;
			case 8:
				await Tesseract.recognize(images.bottomRight.img, 'eng', {
					// logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					console.log('Bottom Right:\n' + text);
					images.bottomRight.text = text;
				});
				break;
			default:
				break;
		}
	}
	return images;
}
