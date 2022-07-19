import './MyPoster.css';
import DefaultImage from './missing_image.jpg';
import Popup from 'reactjs-popup';
import BarGraph from './BarGraph.js';
import { useState, useRef } from 'react';
import AccessibilityBarGraphData from './AccessibilityBarGraphData';

function MyPoster(props) {
  const imgRef = useRef();
  function onImageError() {
    imgRef.current.src = DefaultImage;
  }

  let [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(false);
  }

  let BarGraphData = new AccessibilityBarGraphData(props.AccessibilityRating);

  return (
    <Popup
      trigger={
        <div id='MyPoster'>
          <div id='PosterImage'>
            <img
              src={`data:image/png;base64,${props.Data}`}
              ref={imgRef}
              onError={onImageError}
              alt={`Poster number ${props.Id}`}
            />
          </div>
          <div id='PosterNameSection'>
            <h3>{props.PosterName}</h3>
          </div>
        </div>
      }
      open={isOpen}
      onOpen={handleOpen}
    >
      <div id='PosterPopUpMenuDiv'>
        <div className='PosterImgAndNameContainer'>
          <div id='PosterPopUpMenuPosterNameDiv'>
            <h3>{props.PosterName}</h3>
          </div>
          <div id='PosterPopUpMenuImgDiv'>
            <img
              ref={imgRef}
              onError={onImageError}
              src={`data:image/png;base64,${props.Data}`}
              alt={`Poster number ${props.Id}`}
            />
          </div>
        </div>
        <div className='AccessibilityBarGraphScoreContainer'>
          <h3>Accessibility Score</h3>
          <div id='PosterPopUpMenuBarGraphDiv'>
            <BarGraph chartData={BarGraphData.build} />
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default MyPoster;
