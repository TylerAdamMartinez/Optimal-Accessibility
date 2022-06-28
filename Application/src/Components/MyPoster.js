import './MyPoster.css';
import DefaultImage from './missing_image.jpg';

function MyPoster(props) {

    function ClickEventHandler() {
        console.log(`Poster number ${props.Id} was clicked`);
    }


    return (
        <div id="MyPoster" onClick={ClickEventHandler}>
            <div id="PosterImage">
                <img src={DefaultImage} alt={`Poster number ${props.Id}`}/>
            </div>
            <div id="PosterNameSection">
                <h3>{props.PosterName}</h3>
            </div>
        </div>
    );
}

export default MyPoster;