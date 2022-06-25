function TestImageComponent() {
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
			<img alt='Test poster' src={require('./Poster.png')} style={{ width: '100%', height: '100%' }} />
		</div>
	);
}

export default TestImageComponent;
