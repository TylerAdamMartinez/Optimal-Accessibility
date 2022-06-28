import './MyPostersSection.css';
import MyPoster from './MyPoster.js';

function MyPostersSection() {
    return (
        <div id='MyPostersDiv'>
            <div id="InnerMyPostersDiv">
                <h2>My Posters</h2>
                <span>
                    <MyPoster PosterName="My Poster 0" Id={0} />
                    <MyPoster PosterName="My Poster 1" Id={1} />
                    <MyPoster PosterName="My Poster 2" Id={2} />
                    <MyPoster PosterName="My Poster 3" Id={3} />
                    <MyPoster PosterName="My Poster 4" Id={4} />
                    <MyPoster PosterName="My Poster 5" Id={5} />
                    <MyPoster PosterName="My Poster 6" Id={6} />
                    <MyPoster PosterName="My Poster 7" Id={7} />
                </span>
            </div>
        </div>
    );
}

export default MyPostersSection;
  