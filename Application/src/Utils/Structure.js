import { Image } from 'image-js';

export async function getImageGrid(image) {
	// console.clear();
	const ogImage = await Image.load(image);
	const { width, height } = ogImage;
	let newImages = {
		topLeft: {
			img: null,
			text: null,
			color: null,
		},
		topMiddle: {
			img: null,
			text: null,
			color: null,
		},
		topRight: {
			img: null,
			text: null,
			color: null,
		},
		middleLeft: {
			img: null,
			text: null,
			color: null,
		},
		middle: {
			img: null,
			text: null,
			color: null,
		},
		middleRight: {
			img: null,
			text: null,
			color: null,
		},
		bottomLeft: {
			img: null,
			text: null,
			color: null,
		},
		bottomMiddle: {
			img: null,
			text: null,
			color: null,
		},
		bottomRight: {
			img: null,
			text: null,
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

	newImages.topMiddle.img = ogImage
		.crop({
			x: squareWidth,
			y: 0,
			height: squareHeight,
			width: squareWidth,
		})
		.toDataURL();

	newImages.topRight.img = ogImage
		.crop({
			x: squareWidth * 2,
			y: 0,
			height: squareHeight,
			width: squareWidth,
		})
		.toDataURL();

	newImages.middleLeft.img = ogImage
		.crop({
			x: 0,
			y: squareHeight,
			height: squareHeight,
			width: squareWidth,
		})
		.toDataURL();

	newImages.middle.img = ogImage
		.crop({
			x: squareWidth,
			y: squareHeight,
			height: squareHeight,
			width: squareWidth,
		})
		.toDataURL();

	newImages.middleRight.img = ogImage
		.crop({
			x: squareWidth * 2,
			y: squareHeight,
			height: squareHeight,
			width: squareWidth,
		})
		.toDataURL();

	newImages.bottomLeft.img = ogImage
		.crop({
			x: 0,
			y: squareHeight * 2,
			height: squareHeight,
			width: squareWidth,
		})
		.toDataURL();

	newImages.bottomMiddle.img = ogImage
		.crop({
			x: squareWidth,
			y: squareHeight * 2,
			height: squareHeight,
			width: squareWidth,
		})
		.toDataURL();

	newImages.bottomRight.img = ogImage
		.crop({
			x: squareWidth * 2,
			y: squareHeight * 2,
			height: squareHeight,
			width: squareWidth,
		})
		.toDataURL();

	return newImages;
}
