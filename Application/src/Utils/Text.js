import Tesseract from 'tesseract.js';

export function getText(image) {
	Tesseract.recognize(image, 'eng', {
		logger: (m) => console.log(m),
	}).then(({ data: { text } }) => {
		console.log(text);
	});
}
