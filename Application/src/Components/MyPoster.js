import './MyPoster.css';
import DefaultImage from './missing_image.jpg';

function MyPoster(props) {


    return (
        <div id="MyPoster">
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