import "./MyPostersSection.css";
import MyPoster from "./MyPoster";
import { useEffect, useId, useState } from "react";
import { accessibilityScore, poster } from "../../oaTypes";
import MyFolder from "./MyFolder";

interface MyPostersSectionProp {
  myPosters: Array<poster> | null;
  editPosterCallback: (arg0: string) => void;
}

function MyPostersSection(props: MyPostersSectionProp) {
  let [OldPosterEdited, SetOldPosterEdited] = useState<string>("");

  useEffect(() => {
    props.editPosterCallback(OldPosterEdited);
  }, [props, OldPosterEdited]);

  function editPosterCallbackHandler(title: string) {
    SetOldPosterEdited(title);
  }

  let AddPosterAccessibilitScore: accessibilityScore = {
    textRating: 0,
    structureRating: 0,
    colorRating: 0,
  };

  let unquie_id: string = useId();
  return (
    <div id="MyPostersDiv">
      <div id="InnerMyPostersDiv">
        <h2>My Posters</h2>
        <span className="FolderSpan">
          <MyFolder folderType="old" folderName="My Folder example" />
          <MyFolder folderType="old" folderName="Other Folder example" />
          <MyFolder folderType="new" folderName="Create a new folder" />
        </span>
        <span className="PosterSpan">
          {props.myPosters?.reverse().map((poster, index) => {
            return (
              <MyPoster
                posterType="old"
                name={poster.name}
                key={Math.random()}
                Id={unquie_id + index}
                data={poster.data}
                accessibilityRating={poster.accessibilityScore}
                editPosterCallback={editPosterCallbackHandler}
              />
            );
          })}
          <MyPoster
            posterType="new"
            name={"Add a new poster"}
            key={Math.random()}
            Id={unquie_id}
            data={""}
            accessibilityRating={AddPosterAccessibilitScore}
            editPosterCallback={editPosterCallbackHandler}
          />
        </span>
      </div>
    </div>
  );
}

export default MyPostersSection;
