import "./MyPoster.css";
import DefaultImage from "../../Images/missing_image.jpg";
import Popup from "reactjs-popup";
import BarGraph from "../../Components/BarGraph";
import { useState, useRef } from "react";
import AccessibilityBarGraphData from "../../Components/AccessibilityBarGraphData";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ConvertImageToBase64 from "../../Utils/ConvertImageToBase64";
import { getImageGrid } from "../../Utils/Structure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../FirebaseConfig";
import { ref, set } from "firebase/database";

function MyPoster(props) {
  const imgRef = useRef();
  function onImageError() {
    imgRef.current.src = DefaultImage;
  }

  let [isOpen, setIsOpen] = useState(false);
  let [isEditing, setIsEditing] = useState(false);
  let [editPosterName, setEditPosterName] = useState(props.PosterName);
  let [editPosterData, setEditPosterData] = useState(props.Data);
  const [IsProcessing, setIsProcessing] = useState(false);

  function DeletePoster() {
    setIsProcessing(true);
    let uid = localStorage.getItem("uid");

    let cached_posters = JSON.parse(sessionStorage.getItem("cached-posters"));
    const posterNames = cached_posters.map((element) => {
      return element.name;
    });
    const index = posterNames.indexOf(props.PosterName);

    if (index > -1) {
      cached_posters.splice(index, 1);
    } else {
      toast.error("Failed to find poster", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
      return;
    }

    toast.info("Sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });

    set(ref(db, "Posters/" + uid), {
      posters: cached_posters,
    })
      .then(() => {
        toast.success("Successfully deleted poster", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        setIsProcessing(false);
        let OverallAccessibilityRating = {
          textRating: 0,
          structureRating: 0,
          colorRating: 0,
        };
        cached_posters.forEach((element) => {
          OverallAccessibilityRating.textRating +=
            element.accessibilityScore.textRating;
          OverallAccessibilityRating.structureRating +=
            element.accessibilityScore.structureRating;
          OverallAccessibilityRating.colorRating +=
            element.accessibilityScore.colorRating;
        });

        OverallAccessibilityRating.textRating =
          OverallAccessibilityRating.textRating / cached_posters.length;
        OverallAccessibilityRating.structureRating =
          OverallAccessibilityRating.structureRating / cached_posters.length;
        OverallAccessibilityRating.colorRating =
          OverallAccessibilityRating.colorRating / cached_posters.length;

        set(ref(db, "OverallAccessibilityRating/" + uid), {
          textRating: OverallAccessibilityRating.textRating,
          structureRating: OverallAccessibilityRating.structureRating,
          colorRating: OverallAccessibilityRating.colorRating,
        })
          .then(() => {
            setIsProcessing(false);
            props.editPosterCallback(Math.random());
          })
          .catch(() => {
            setIsProcessing(false);
            toast.error("Failed to calculate new OverallAccessibilityRating", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 4000,
            });
          });
      })
      .catch(() => {
        setIsProcessing(false);
        toast.error("Failed to delete poster", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
      });
  }

  function UpdatePosterName(event) {
    setIsEditing(false);
    setIsProcessing(true);
    event.preventDefault();
    let uid = localStorage.getItem("uid");

    let cached_posters = JSON.parse(sessionStorage.getItem("cached-posters"));
    const posterNameSet = new Set(
      cached_posters.map((element) => {
        return element.name;
      })
    );

    if (posterNameSet.has(editPosterName)) {
      toast.error("Failed to update poster because the name is taken", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
      return;
    }

    const posterNames = cached_posters.map((element) => {
      return element.name;
    });
    const index = posterNames.indexOf(props.PosterName);

    if (index > -1) {
      cached_posters[index] = {
        name: editPosterName,
        data: cached_posters[index].data,
        accessibilityScore: cached_posters[index].accessibilityScore,
      };
    } else {
      toast.error("Failed to find poster", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
      return;
    }

    toast.info("Sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });

    set(ref(db, "Posters/" + uid), {
      posters: cached_posters,
    })
      .then(() => {
        toast.success("Poster's name was successfully updated", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        setIsProcessing(false);
        props.editPosterCallback(editPosterName);
      })
      .catch(() => {
        setIsProcessing(false);
        toast.error("Failed to update poster's name", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
      });
  }

  async function UpdatePosterData(event) {
    setIsEditing(false);
    setIsProcessing(true);
    event.preventDefault();
    let uid = localStorage.getItem("uid");

    async function getAccessibilityScore(poster) {
      poster = await ConvertImageToBase64(poster);
      let posterGrades = await getImageGrid(
        "data:image/png;base64," + poster
      ).then((score) => {
        let posterGrade = {
          textRating: Math.round(score.textGrade),
          structureRating: Math.round(score.structureGrade),
          colorRating: Math.round(score.colorGrade),
        };

        return posterGrade;
      });

      return posterGrades;
    }

    toast.info("Sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    let accessibilityScore = await getAccessibilityScore(editPosterData);
    toast.info("Caculating Accessibility Score...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    ConvertImageToBase64(editPosterData)
      .then((data) => {
        const newPosterBody = { data, accessibilityScore };
        let cached_posters = JSON.parse(
          sessionStorage.getItem("cached-posters")
        );
        const posterNames = cached_posters.map((element) => {
          return element.name;
        });

        const index = posterNames.indexOf(props.PosterName);

        console.log("old posters", cached_posters);
        if (index > -1) {
          cached_posters[index] = {
            name: cached_posters[index].name,
            data: newPosterBody.data,
            accessibilityScore: newPosterBody.accessibilityScore,
          };
          console.log("new posters", cached_posters);
        } else {
          toast.error("Failed to find poster", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 4000,
          });
          return;
        }

        set(ref(db, "Posters/" + uid), {
          posters: cached_posters,
        }).then(() => {
          toast.success("Successfully update poster's image!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 4000,
          });
          setIsProcessing(false);

          let OverallAccessibilityRating = {
            textRating: 0,
            structureRating: 0,
            colorRating: 0,
          };

          cached_posters.forEach((element) => {
            OverallAccessibilityRating.textRating +=
              element.accessibilityScore.textRating;
            OverallAccessibilityRating.structureRating +=
              element.accessibilityScore.structureRating;
            OverallAccessibilityRating.colorRating +=
              element.accessibilityScore.colorRating;
          });

          OverallAccessibilityRating.textRating =
            OverallAccessibilityRating.textRating / cached_posters.length;
          OverallAccessibilityRating.structureRating =
            OverallAccessibilityRating.structureRating / cached_posters.length;
          OverallAccessibilityRating.colorRating =
            OverallAccessibilityRating.colorRating / cached_posters.length;

          set(ref(db, "OverallAccessibilityRating/" + uid), {
            textRating: OverallAccessibilityRating.textRating,
            structureRating: OverallAccessibilityRating.structureRating,
            colorRating: OverallAccessibilityRating.colorRating,
          })
            .then(() => {
              props.editPosterCallback(Math.random());
            })
            .catch(() => {
              toast.error(
                "Failed to calculate new OverallAccessibilityRating",
                {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 4000,
                }
              );
            });
        });
      })
      .catch((err) => {
        setIsProcessing(false);
        toast.error(`${err}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        console.error(err);
      });
  }

  function editPosterNameHandler(event) {
    setEditPosterName(event.target.value);
  }

  function editPosterDatahandler(event) {
    let file = event.target.files[0];
    setEditPosterData(file);
  }

  function validateEditPosterName() {
    let cached_posters = JSON.parse(sessionStorage.getItem("cached-posters"));
    const posterNameSet = new Set(
      cached_posters.map((element) => {
        return element.name;
      })
    );

    if (posterNameSet.has(editPosterName)) {
      toast.error("Poster name is already taken", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
  }

  function DeleteForeverHandler() {
    let userAnswer = window.confirm(
      `Are you sure you would like to delete poster: '${props.PosterName}' forever?`
    );

    if (userAnswer) {
      DeletePoster();
    }
  }

  let BarGraphData = new AccessibilityBarGraphData(props.AccessibilityRating);

  function handlePopupOpen() {
    setIsOpen(true);
  }

  function handlePopupClose() {
    setIsOpen(false);
  }

  return (
    <Popup
      trigger={
        <div id="MyPoster">
          <div id="PosterImage">
            <img
              src={`data:image/png;base64,${props.Data}`}
              ref={imgRef}
              onError={onImageError}
              alt={`Poster number ${props.Id}`}
            />
          </div>
          <div id="PosterNameSection">
            <h3>{props.PosterName}</h3>
          </div>
          <ToastContainer autoClose={1000} limit={3} />
        </div>
      }
      open={isOpen}
      onOpen={handlePopupOpen}
    >
      <div className="PopUpBackground">
        <div id="PosterPopUpMenuContainerDiv">
          <div className="PosterPopUpMenuDivContainer">
            <CloseRounded
              id="closePosterPopupBtn"
              className="CloseIcon"
              fontSize="large"
              onClick={handlePopupClose}
            />
            <div id="PosterPopUpMenuDiv">
              <div className="PosterImgAndNameContainer">
                <div id="PosterPopUpMenuPosterNameDiv">
                  {isEditing ? (
                    <form id="editForm" onSubmit={UpdatePosterName}>
                      <input
                        readOnly={IsProcessing}
                        id="editPosterNameInput"
                        placeholder={props.PosterName}
                        type="text"
                        value={editPosterName}
                        onChange={editPosterNameHandler}
                        onBlur={validateEditPosterName}
                      />
                      <input
                        readOnly={IsProcessing}
                        id="editPosterNameBtn"
                        type="submit"
                        value={"Enter"}
                      />
                    </form>
                  ) : (
                    <h3>{props.PosterName}</h3>
                  )}
                </div>
                <div id="PosterPopUpMenuImgDiv">
                  {isEditing ? (
                    <>
                      <div id="editingPosterDataFrom">
                        <form onSubmit={UpdatePosterData}>
                          <input
                            disabled={IsProcessing}
                            readOnly={IsProcessing}
                            type="File"
                            accept=".png, .jpg, .jpeg"
                            onChange={editPosterDatahandler}
                          />
                          <input
                            readOnly={IsProcessing}
                            id="editPosterDataBtn"
                            type="submit"
                            value={"Enter"}
                          />
                        </form>
                      </div>
                      <img
                        id="editingPosterDataImage"
                        ref={imgRef}
                        onError={onImageError}
                        src={`data:image/png;base64,${props.Data}`}
                        alt={`Poster number ${props.Id}`}
                      />
                    </>
                  ) : (
                    <div className="ScaleOnHover">
                      <img
                        ref={imgRef}
                        onError={onImageError}
                        src={`data:image/png;base64,${props.Data}`}
                        alt={`Poster number ${props.Id}`}
                      />
                    </div>
                  )}
                </div>
                <div className="PosterPopUpMenuIconContainer">
                  <DeleteForeverIcon
                    className="PopupIcon"
                    fontSize="large"
                    onClick={DeleteForeverHandler}
                  />
                  <EditIcon
                    className="PopupIcon"
                    fontSize="large"
                    onClick={() => {
                      setIsEditing(!isEditing);
                    }}
                  />
                </div>
              </div>
              <div className="AccessibilityBarGraphScoreContainer">
                <h3>Accessibility Score</h3>
                <div id="PosterPopUpMenuBarGraphDiv">
                  <BarGraph chartData={BarGraphData.build} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default MyPoster;
