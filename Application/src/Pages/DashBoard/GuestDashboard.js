import "./GuestDashboard.css";
import React, { useState } from "react";
import MagicDropZone from "react-magic-dropzone";
import NavBar from "../../Components/NavBar";

const GuestDashboard = () => {
  const [file, setFile] = useState(null);

  const fileDrop = (accepted, rejected, links) => {
    if (accepted.length > 0 && rejected.length === 0) {
      console.log("File accepted");
      setFile(accepted[0].preview);
    } else {
      console.log("File type not accepted");
    }
    console.log(accepted);
    console.log(rejected);
    console.log(links);
  };

  return (
    <div>
      <NavBar IsGuestMode={true} />
      <div className="GuestUIContainer">
        <div className="PosterDragAndDrop">
          <h2 className="SectionHeading">Upload a Poster</h2>
          <MagicDropZone
            className="DragAndDropArea"
            accept=".jpg, .png, .jpeg"
            onDrop={fileDrop}
          >
            {file === null ? (
              "Drop your poster here"
            ) : (
              <img height="100%" src={file} alt="User Upload" />
            )}
          </MagicDropZone>
        </div>
        <div className="PosterRatingContainer">Score</div>
      </div>
    </div>
  );
};

export default GuestDashboard;
