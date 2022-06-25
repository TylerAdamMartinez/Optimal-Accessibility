// import { getColors } from './Color';
import { getText } from './Text';

function TestImageComponent() {
	const image = require('./Poster2.jpg');

	// getColors(image);
	getText(image);

	return (
		<div
			style={{
				width: '600px',
				height: '600px',
				backgroundColor: 'black',
				justifyItems: 'center',
				margin: 80,
			}}
		>
			<img
				alt='Test poster'
				src={image}
				onError={(err) => console.error(err)}
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
}

export default TestImageComponent;
