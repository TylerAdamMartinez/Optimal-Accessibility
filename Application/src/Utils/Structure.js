import { Image } from 'image-js';

export async function getImageGrid(image) {
	console.clear();
	const ogImage = await Image.load(image);
	const { width, height } = ogImage;
	let newImages = {
		topLeft: null,
		topMiddle: null,
		topRight: null,
		middleLeft: null,
		middle: null,
		middleRight: null,
		bottomLeft: null,
		bottomMiddle: null,
		bottomRight: null,
	};

	// split width and height for 9 section grid
	let squareWidth = width / 3;
	let squareHeight = height / 3;

	// ignoring formatter because it likes to newline the methods
	// prettier-ignore
	newImages.topLeft = ogImage.crop({
			x: 0,
			y: 0,
			height: squareHeight,
			width: squareWidth,
	}).toDataURL();

	// prettier-ignore
	newImages.topMiddle = ogImage.crop({
			x: squareWidth,
			y: 0,
			height: squareHeight,
			width: squareWidth,
	}).toDataURL();

	// prettier-ignore
	newImages.topRight = ogImage.crop({
			x: squareWidth * 2,
			y: 0,
			height: squareHeight,
			width: squareWidth,
	}).toDataURL();

	// prettier-ignore
	newImages.middleLeft = ogImage.crop({
			x: 0,
			y: squareHeight,
			height: squareHeight,
			width: squareWidth,
	}).toDataURL();

	// prettier-ignore
	newImages.middle = ogImage.crop({
			x: squareWidth,
			y: squareHeight,
			height: squareHeight,
			width: squareWidth,
	}).toDataURL();

	// prettier-ignore
	newImages.middleRight = ogImage.crop({
			x: squareWidth * 2,
			y: squareHeight,
			height: squareHeight,
			width: squareWidth,
	}).toDataURL();

	// prettier-ignore
	newImages.bottomLeft = ogImage.crop({
			x: 0,
			y: squareHeight * 2,
			height: squareHeight,
			width: squareWidth,
	}).toDataURL();

	// prettier-ignore
	newImages.bottomMiddle = ogImage.crop({
			x: squareWidth,
			y: squareHeight * 2,
			height: squareHeight,
			width: squareWidth,
	}).toDataURL();

	// prettier-ignore
	newImages.bottomRight = ogImage.crop({
			x: squareWidth * 2,
			y: squareHeight * 2,
			height: squareHeight,
			width: squareWidth,
	}).toDataURL();

	return newImages;
}
