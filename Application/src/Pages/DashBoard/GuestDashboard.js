import "./GuestDashboard.css";
import React, { useState } from "react";
import MagicDropZone from "react-magic-dropzone";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../../Components/NavBar";
import BarGraph from "../../Components/BarGraph";
import AccessibilityBarGraphData from "../../Components/AccessibilityBarGraphData";
import ConvertImageToBase64 from "../../Utils/ConvertImageToBase64";
import { getImageGrid } from "../../Utils/Structure";

const GuestDashboard = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [posterGrade, setPosterGrade] = useState({
    textRating: 5,
    structureRating: 5,
    colorRating: 5,
  });

  async function getAccessibilityScore(poster) {
    toast.info("Uploading image...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    poster = await ConvertImageToBase64(poster);
    toast.info("Calculating accessibility score...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    await getImageGrid("data:image/png;base64," + poster).then((score) => {
      setPosterGrade({
        textRating: Math.round(score.textGrade),
        structureRating: Math.round(score.structureGrade),
        colorRating: Math.round(score.colorGrade),
      });
    });
    toast.success("Done!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
  }

  const fileDrop = (accepted, rejected, links) => {
    if (accepted.length && !rejected.length) {
      setFilePreview(accepted[0].preview);
      getAccessibilityScore(accepted[0]);
    } else {
      toast.error("Invalid image type...", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
  };

  let BarGraphData = new AccessibilityBarGraphData(posterGrade);

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
            {filePreview === null ? (
              "Drop your poster here"
            ) : (
              <img className="PosterImg" src={filePreview} alt="User Upload" />
            )}
          </MagicDropZone>
        </div>
        <div className="PosterRatingContainer">
          <h2 className="SectionHeading">Accessibility Score</h2>
          <div style={{ width: "90%" }}>
            <BarGraph chartData={BarGraphData.build} />
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} limit={3} />
    </div>
  );
};

export default GuestDashboard;
