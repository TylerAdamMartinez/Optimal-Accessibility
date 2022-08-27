import "./GuestDashboard.css";
import React, { useState } from "react";
import MagicDropZone from "react-magic-dropzone";
import { ToastContainer, toast } from "react-toastify";
import GuestNavBar from "./GuestNavBar";
import BarGraph from "../../Components/Graphs/BarGraph/BarGraph";
import AccessibilityBarGraphData from "../../Components/Graphs/BarGraph/AccessibilityBarGraphData";
import ConvertImageToBase64 from "../../Utils/ConvertImageToBase64";
import { getImageGrid } from "../../Utils/Structure";
import { accessibilityScore } from "../../oaTypes";
import { motion } from "framer-motion";

const GuestDashboard = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [posterGrade, setPosterGrade] = useState<accessibilityScore>({
    textRating: 1,
    structureRating: 1,
    colorRating: 1,
  });
  const [totalCalculationTime, setTotalCalculationTime] = useState<number>(0.0);
  const [calculating, setCalculating] = useState<boolean>(false);

  async function getAccessibilityScore(poster: Blob) {
    let startTime = Date.now();
    setCalculating(true);
    toast.info("Uploading image...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
    const posterBase64String = await ConvertImageToBase64(poster);
    toast.info("Calculating accessibility score...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    await getImageGrid("data:image/png;base64," + posterBase64String)
      .then((score) => {
        setPosterGrade({
          textRating: Math.round(score.textRating),
          structureRating: Math.round(score.structureRating),
          colorRating: Math.round(score.colorRating),
        });
      })
      .catch(() => {
        setCalculating(false);
        toast.error("Something went wrong...", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
      });
    let endTime = Date.now();
    setCalculating(false);
    toast.success("Done!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    setTotalCalculationTime((endTime - startTime) / 1000.0);
  }

  const fileDrop = (
    accepted: string | any[],
    rejected: string | any[],
    _links: any
  ) => {
    if (accepted.length && !rejected.length) {
      setFilePreview(accepted[0].preview);
      getAccessibilityScore(accepted[0]);
    } else {
      toast.error("Something went wrong...", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
  };

  let BarGraphData = new AccessibilityBarGraphData(posterGrade);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GuestNavBar />
      <div className="GuestUIContainer">
        <motion.div
          className="PosterDragAndDrop"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
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
        </motion.div>
        <motion.div
          className="PosterRatingContainer"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="SectionHeading">Accessibility Score</h2>
          <div style={{ width: "95%" }}>
            <BarGraph
              data={BarGraphData.build}
              BarGraphCallback={(_state: string) => {}}
            />
            <p className="TimeToCalculate">
              {calculating
                ? `Calculating score...`
                : `Calculated in ${totalCalculationTime} seconds`}
            </p>
          </div>
        </motion.div>
      </div>
      <ToastContainer autoClose={1000} limit={1} />
    </motion.div>
  );
};

export default GuestDashboard;
