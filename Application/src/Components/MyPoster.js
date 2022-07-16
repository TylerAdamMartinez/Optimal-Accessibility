import './MyPoster.css';
import DefaultImage from './missing_image.jpg';
import Popup from 'reactjs-popup';
import BarGraph from './BarGraph.js';
import { useState, useRef } from 'react';

function MyPoster(props) {
    const imgRef = useRef();
    function onImageError() {
      imgRef.current.src = DefaultImage; 
    }

    let [isOpen, setIsOpen] = useState(false);

    function handleOpen() {
      setIsOpen(false);
    }

    let BarGraphData = {
        labels: ['Text', 'Structure', 'Color'],
        datasets: [
          {
            label: 'Rating Score',
            backgroundColor: [
              'rgba(1, 127, 1, 1)',
              'rgba(100, 6, 101, 1)',
              'rgba(218, 54, 74, 1)',
            ],
            borderColor: 'rgba(51, 51, 51, 1)',
            borderWidth: 1,
            data: [props.AccessibilityRating.textRating, props.AccessibilityRating.structureRating, props.AccessibilityRating.colorRating],
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                yAxes: {
                  min: 0,
                  max: 100,
                },
              }
            },
          }
        ]
      };

    return (
        <Popup 
        trigger={
          <div id="MyPoster">
              <div id="PosterImage">
                  <img src={`data:image/png;base64,${props.Data}`} ref={imgRef} onError={onImageError} alt={`Poster number ${props.Id}`}/>
              </div>
              <div id="PosterNameSection">
                  <h3>{props.PosterName}</h3>
              </div>
          </div>}
        open={isOpen}
        onOpen={handleOpen}
        >
            <div id="PosterPopUpMenuDiv">
                <div id="PosterPopUpMenuPosterNameDiv">
                  <h3>{props.PosterName}</h3>
                </div>
                <div id="PosterPopUpMenuImgDiv">
                  <img ref={imgRef} onError={onImageError} src={`data:image/png;base64,${props.Data}`} alt={`Poster number ${props.Id}`}/>
                </div>
                <h3>Overall Accessibility Score</h3>
                <div id="PosterPopUpMenuBarGraphDiv">
                  <BarGraph chartData={BarGraphData}/>
                </div>
            </div>  
        </Popup>
    );
}

export default MyPoster;