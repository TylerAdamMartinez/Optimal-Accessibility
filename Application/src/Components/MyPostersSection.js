import './MyPostersSection.css';
import MyPoster from './MyPoster.js';

function MyPostersSection(props) {
    return (
        <div id='MyPostersDiv'>
            <div id="InnerMyPostersDiv">
                <h2>My Posters</h2>
                <span>
                    {props.myPosters.map((poster) => {
                        return(<MyPoster PosterName={poster.name} key={Math.random()} Data={poster.data} AccessibilityRating={poster.accessibilityScore}/>);
                    })}
                </span>
            </div>
        </div>
    );
}

export default MyPostersSection;
  