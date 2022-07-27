import "./MyPostersSection.css";
import MyPoster from "./MyPoster.js";
import { useEffect, useState } from "react";

function MyPostersSection(props) {
  let [OldPosterEdited, SetOldPosterEdited] = useState("");

  useEffect(() => {
    props.editPosterCallback(OldPosterEdited);
  }, [props, OldPosterEdited]);

  function editPosterCallbackHandler(title) {
    SetOldPosterEdited(title);
  }
  return (
    <div id="MyPostersDiv">
      <div id="InnerMyPostersDiv">
        <h2>My Posters</h2>
        <span>
          {props.myPosters.map((poster) => {
            return (
              <MyPoster
                PosterName={poster.name}
                key={Math.random()}
                Data={poster.data}
                AccessibilityRating={poster.accessibilityScore}
                editPosterCallback={editPosterCallbackHandler}
              />
            );
          })}
        </span>
      </div>
    </div>
  );
}

export default MyPostersSection;
