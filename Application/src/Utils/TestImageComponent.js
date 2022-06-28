import { getText } from './Text';
import { getImageGrid } from './Structure';
import { useState, useEffect } from 'react';

function TestImageComponent() {
	const [imageGrid, setImageGrid] = useState({});
	const image = require('./assets/Poster2.jpg');

	const imageStyles = {
		width: '31%',
		height: '31%',
		marginTop: '7px',
		marginLeft: '9.5px',
	};

	useEffect(() => {
		getImageGrid(image)
			.then((val) => {
				setImageGrid(val);
			})
			.catch((e) => console.log(e));
	}, [image]);

	useEffect(() => {
		getText(imageGrid)
			.then((val) => {
				setImageGrid(val);
			})
			.catch((e) => console.log(e));
	}, [imageGrid]);

	return imageGrid.topLeft !== undefined ? (
		<div
			style={{
				width: '65%',
				height: '65%',
				backgroundColor: '#2f2f2f',
				margin: 80,
				flexDirection: 'row',
				display: 'flex',
			}}
		>
			<img alt='Test poster' src={image} style={{ width: '100%', height: '100%' }} />
			<div style={{ height: '100%', width: '100%' }}>
				<img alt='Test topLeft' src={imageGrid.topLeft.img} style={imageStyles} />
				<img alt='Test topMiddle' src={imageGrid.topMiddle.img} style={imageStyles} />
				<img alt='Test topRight' src={imageGrid.topRight.img} style={imageStyles} />
				<img alt='Test middleLeft' src={imageGrid.middleLeft.img} style={imageStyles} />
				<img alt='Test middle' src={imageGrid.middle.img} style={imageStyles} />
				<img alt='Test middleRight' src={imageGrid.middleRight.img} style={imageStyles} />
				<img alt='Test bottomLeft' src={imageGrid.bottomLeft.img} style={imageStyles} />
				<img alt='Test bottomMiddle' src={imageGrid.bottomMiddle.img} style={imageStyles} />
				<img alt='Test bottomRight' src={imageGrid.bottomRight.img} style={imageStyles} />
			</div>
		</div>
	) : null;
}

export default TestImageComponent;
