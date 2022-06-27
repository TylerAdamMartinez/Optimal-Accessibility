// import { getColors } from './Color';
// import { getText } from './Text';
import { getImageGrid } from './Structure';
import { useState, useEffect } from 'react';

function TestImageComponent() {
	const [imageGrid, setImageGrid] = useState({});
	const image = require('./assets/Poster2.jpg');

	const imageStyles = {
		width: '31%',
		height: '31%',
		marginTop: '9px',
		marginLeft: '11.5px',
	};

	// getColors(image);
	// getText(image);

	useEffect(() => {
		getImageGrid(image).then((val) => {
			setImageGrid(val);
		});
	}, []);

	return (
		<div
			style={{
				width: '1300px',
				height: '600px',
				backgroundColor: '#2f2f2f',
				margin: 80,
				flexDirection: 'row',
				display: 'flex',
			}}
		>
			<img alt='Test poster' src={image} style={{ width: '100%', height: '100%' }} />
			<div style={{ height: '100%', width: '100%' }}>
				<img alt='Test topLeft' src={imageGrid.topLeft} style={imageStyles} />
				<img alt='Test topMiddle' src={imageGrid.topMiddle} style={imageStyles} />
				<img alt='Test topRight' src={imageGrid.topRight} style={imageStyles} />
				<img alt='Test middleLeft' src={imageGrid.middleLeft} style={imageStyles} />
				<img alt='Test middle' src={imageGrid.middle} style={imageStyles} />
				<img alt='Test middleRight' src={imageGrid.middleRight} style={imageStyles} />
				<img alt='Test bottomLeft' src={imageGrid.bottomLeft} style={imageStyles} />
				<img alt='Test bottomMiddle' src={imageGrid.bottomMiddle} style={imageStyles} />
				<img alt='Test bottomRight' src={imageGrid.bottomRight} style={imageStyles} />
			</div>
		</div>
	);
}

export default TestImageComponent;
