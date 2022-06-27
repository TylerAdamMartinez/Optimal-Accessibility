import './OverallAccessibilitySection.css';
import MyPoster from './MyPoster.js';

function OverallAccessibilitySection() {
    return (
        <div id='OverallAccessibilityDiv'>
            <div id="InnerOverallAccessibilityDiv">
                <h2>Overall Accessibility Rating</h2>
                <span>
                    <MyPoster PosterName="My Poster 0" Id={0} />
                    <MyPoster PosterName="My Poster 1" Id={1} />
                    <MyPoster PosterName="My Poster 2" Id={2} />
                    <MyPoster PosterName="My Poster 3" Id={3} />
                </span>
            </div>
        </div>
    );
}

export default OverallAccessibilitySection;
  