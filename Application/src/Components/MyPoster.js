import './MyPoster.css';
import DefaultImage from './missing_image.jpg';

import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';

import BarGraph from './BarGraph.js';

function MyPoster(props) {

    function ClickEventHandler() {
        console.log(`Poster number ${props.Id} was clicked`);
    }

    let GenericBarGraphData = {
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
            data: [95, 62, 88],
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
        <Popup trigger={
            <div id="MyPoster" onClick={ClickEventHandler}>
                <div id="PosterImage">
                    <img src={DefaultImage} alt={`Poster number ${props.Id}`}/>
                </div>
                <div id="PosterNameSection">
                    <h3>{props.PosterName}</h3>
                </div>
            </div> 
        } position="right center">
            <div id="PosterPopUpMenuDiv">
                <h3>{props.PosterName}</h3>
                <img src={DefaultImage} alt={`Poster number ${props.Id}`}/>
                <h3>Overall Accessibility Score</h3>
                <BarGraph chartData={GenericBarGraphData}/>
            </div>  
        </Popup>
    );
}

export default MyPoster;