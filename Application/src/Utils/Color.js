import ColorThief from 'colorthief';

export function getColors(image) {
	let ct = new ColorThief();
	let result = ct.getColor(image.topLeft);
	console.log(result);
}
