import "./MyPostersSection.css";
import MyPoster from "./MyPoster";
import AddPoster from "./AddPoster";
import { useEffect, useId, useState } from "react";
import { poster } from "../../oaTypes";
import MyFolder from "./MyFolder";
import { motion } from "framer-motion";

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

  let folders: Array<{ folderType: string; folderName: string }> = [
    {
      folderType: "old",
      folderName: "My Folder example",
    },
    {
      folderType: "old",
      folderName: "Other Folder example",
    },
  ];

  let unquie_id: string = useId();
  return (
    <div id="MyPostersDiv">
      <div id="InnerMyPostersDiv">
        <h2>My Posters</h2>
        <span className="FolderSpan">
          {folders.map((folder, index) => {
            return (
              <motion.div
                key={Math.random()}
                initial={{ opacity: 0, translateX: -50, translateY: -50 }}
                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                transition={{ duration: 0.3, delay: index * 0.5 }}
              >
                <MyFolder
                  folderType={folder.folderType}
                  folderName={folder.folderName}
                />
              </motion.div>
            );
          })}
          <MyFolder folderType="new" folderName="Create a new folder" />
        </span>
        <span className="PosterSpan">
          {props.myPosters?.map((poster, index) => {
            return (
              <motion.div
                key={Math.random()}
                initial={{ opacity: 0, translateX: -50, translateY: -50 }}
                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                transition={{ duration: 0.3, delay: index * 0.5 }}
              >
                <MyPoster
                  name={poster.name}
                  key={Math.random()}
                  Id={unquie_id + index}
                  data={poster.data}
                  accessibilityRating={poster.accessibilityScore}
                  editPosterCallback={editPosterCallbackHandler}
                />
              </motion.div>
            );
          })}
          <AddPoster />
        </span>
      </div>
    </div>
  );
}

export default MyPostersSection;
