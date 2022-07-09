import { getText } from './Text';
import { getImageGrid } from './Structure';
import { getColors } from './Color';
import { useState, useEffect } from 'react';

/*
  This file will not be included in the final release
*/

function TestImageComponent() {
  const [imageGrid, setImageGrid] = useState({});
  const image = require('./assets/AdPoster.jpg');

  const imageStyles = {
    width: '33%',
    height: '33%',
    marginLeft: '1px',
  };

  useEffect(() => {
    getImageGrid(image)
      .then((val) => {
        setImageGrid(val);
      })
      .catch((e) => console.log(e));
  }, [image]);

  useEffect(() => {
    console.log(imageGrid);
  }, [imageGrid]);

  return imageGrid.topLeft !== undefined ? (
    <div
      style={{
        width: '50%',
        height: '45%',
        margin: 80,
        flexDirection: 'row',
        display: 'flex',
      }}
    >
      <img alt='Test poster' src={image} style={{ width: '50%', height: '50%' }} />
      <div
        style={{
          height: '50%',
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
  ) : (
    <h3 style={{ margin: 80 }}>Image is processing...</h3>
  );
}

export default TestImageComponent;
