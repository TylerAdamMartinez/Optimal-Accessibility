import "./MyPoster.css";
import DefaultImage from "../../Images/missing_image.jpg";
import Popup from "reactjs-popup";
import BarGraph from "../../Components/BarGraph";
import { useState, useRef, SetStateAction } from "react";
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
import { GlobalPosters } from "../../Pages/DashBoard/DashBoard";
import { accessibilityScore, poster } from "../../oaTypes";
import { motion } from "framer-motion";

const MyPoster: React.FC<{
  name: string;
  data: string;
  accessibilityRating: accessibilityScore;
  editPosterCallback: (arg0: string) => void;
  Id: string;
}> = ({ name, data, accessibilityRating, editPosterCallback, Id }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  function onImageError() {
    if (imgRef.current === undefined || imgRef.current === null) return;
    imgRef.current.src = DefaultImage as string;
  }

  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [isEditing, setIsEditing] = useState<boolean>(false);
  let [editPosterName, setEditPosterName] = useState<string>(name);
  let [editPosterData, setEditPosterData] = useState<string | File>(data);
  const [IsProcessing, setIsProcessing] = useState<boolean>(false);
  const [moreInfoText, setMoreInfoText] = useState<string>("Text");
  const [isMyPosterDragging, setIsMyPosterDragging] = useState<boolean>(false);

  function DeletePoster() {
    setIsProcessing(true);
    let uid = localStorage.getItem("uid");

    const posterNames = GlobalPosters.map((element) => {
      return element.name;
    });
    const index = posterNames.indexOf(name);

    if (index > -1) {
      GlobalPosters.splice(index, 1);
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
      posters: GlobalPosters,
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
        GlobalPosters.forEach((element) => {
          OverallAccessibilityRating.textRating +=
            element.accessibilityScore.textRating;
          OverallAccessibilityRating.structureRating +=
            element.accessibilityScore.structureRating;
          OverallAccessibilityRating.colorRating +=
            element.accessibilityScore.colorRating;
        });

        OverallAccessibilityRating.textRating =
          OverallAccessibilityRating.textRating / GlobalPosters.length;
        OverallAccessibilityRating.structureRating =
          OverallAccessibilityRating.structureRating / GlobalPosters.length;
        OverallAccessibilityRating.colorRating =
          OverallAccessibilityRating.colorRating / GlobalPosters.length;

        set(ref(db, "OverallAccessibilityRating/" + uid), {
          textRating: OverallAccessibilityRating.textRating,
          structureRating: OverallAccessibilityRating.structureRating,
          colorRating: OverallAccessibilityRating.colorRating,
        })
          .then(() => {
            setIsProcessing(false);
            editPosterCallback(Math.random().toString());
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

  function UpdatePosterName(event: { preventDefault: () => void }) {
    setIsEditing(false);
    setIsProcessing(true);
    event.preventDefault();
    let uid = localStorage.getItem("uid");

    const posterNameSet = new Set(
      GlobalPosters.map((element) => {
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

    const posterNames = GlobalPosters.map((element) => {
      return element.name;
    });
    const index = posterNames.indexOf(name);

    if (index > -1) {
      GlobalPosters[index] = {
        name: editPosterName,
        data: GlobalPosters[index].data,
        accessibilityScore: GlobalPosters[index].accessibilityScore,
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
      posters: GlobalPosters,
    })
      .then(() => {
        toast.success("Poster's name was successfully updated", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        setIsProcessing(false);
        editPosterCallback(editPosterName);
      })
      .catch(() => {
        setIsProcessing(false);
        toast.error("Failed to update poster's name", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
      });
  }

  async function UpdatePosterData(event: { preventDefault: () => void }) {
    setIsEditing(false);
    setIsProcessing(true);
    event.preventDefault();
    let uid = localStorage.getItem("uid");

    async function getAccessibilityScore(poster: Blob) {
      const posterBase64String = await ConvertImageToBase64(poster);
      let posterGrades = await getImageGrid(
        "data:image/png;base64," + posterBase64String
      ).then((score) => {
        let posterGrade = {
          textRating: Math.round(score.textRating),
          structureRating: Math.round(score.structureRating),
          colorRating: Math.round(score.colorRating),
        };

        return posterGrade;
      });

      return posterGrades;
    }

    toast.info("Sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    let accessibilityScore = await getAccessibilityScore(
      editPosterData as Blob
    );
    toast.info("Caculating Accessibility Score...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });

    ConvertImageToBase64(editPosterData as Blob)
      .then((data: any) => {
        const newPosterBody = { data, accessibilityScore };
        const posterNames = GlobalPosters.map((element) => {
          return element.name;
        });

        const index = posterNames.indexOf(name);

        console.log("old posters", GlobalPosters);
        if (index > -1) {
          GlobalPosters[index] = {
            name: GlobalPosters[index].name,
            data: newPosterBody.data,
            accessibilityScore: newPosterBody.accessibilityScore,
          };
          console.log("new posters", GlobalPosters);
        } else {
          toast.error("Failed to find poster", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 4000,
          });
          return;
        }

        set(ref(db, "Posters/" + uid), {
          posters: GlobalPosters,
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

          GlobalPosters.forEach((element) => {
            OverallAccessibilityRating.textRating +=
              element.accessibilityScore.textRating;
            OverallAccessibilityRating.structureRating +=
              element.accessibilityScore.structureRating;
            OverallAccessibilityRating.colorRating +=
              element.accessibilityScore.colorRating;
          });

          OverallAccessibilityRating.textRating =
            OverallAccessibilityRating.textRating / GlobalPosters.length;
          OverallAccessibilityRating.structureRating =
            OverallAccessibilityRating.structureRating / GlobalPosters.length;
          OverallAccessibilityRating.colorRating =
            OverallAccessibilityRating.colorRating / GlobalPosters.length;

          set(ref(db, "OverallAccessibilityRating/" + uid), {
            textRating: OverallAccessibilityRating.textRating,
            structureRating: OverallAccessibilityRating.structureRating,
            colorRating: OverallAccessibilityRating.colorRating,
          })
            .then(() => {
              editPosterCallback(Math.random().toString());
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
      .catch((err: any) => {
        setIsProcessing(false);
        toast.error(`${err}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        console.error(err);
      });
  }

  function editPosterNameHandler(event: {
    target: { value: SetStateAction<string> };
  }) {
    setEditPosterName(event.target.value);
  }

  function editPosterDatahandler(event: {
    target: { files: FileList | null };
  }) {
    if (event.target.files === null) return;
    let file: File | null = event.target.files[0];
    if (file === null) return;
    setEditPosterData(file);
  }

  function validateEditPosterName() {
    const cached_posters = sessionStorage.getItem("cached-posters");

    if (cached_posters === null) return;

    let GlobalPosters: Array<poster> = JSON.parse(cached_posters);
    const posterNameSet = new Set(
      GlobalPosters.map((element: { name: string }) => {
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
      `Are you sure you would like to delete poster: '${name}' forever?`
    );

    if (userAnswer) {
      DeletePoster();
    }
  }

  function BarGarphCallbackHandler(state: string): void {
    setMoreInfoText(state);
  }

  function MoreInformationText(state: string): JSX.Element {
    if (state === "Text") {
      return (
        <div
          className="MoreInformationText"
          style={{ backgroundColor: "rgba(1, 127, 1, 1)" }}
        >
          <p>
            Text Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            omnis eligendi veniam. Cupiditate corporis dicta, nihil porro
            praesentium quam dolorem omnis nobis voluptatibus voluptatum maiores
            impedit fugit reiciendis voluptates eum!
          </p>
        </div>
      );
    } else if (state === "Structure") {
      return (
        <div
          className="MoreInformationText"
          style={{ backgroundColor: "rgba(100, 6, 101, 1)" }}
        >
          <p>
            Strucuture Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quibusdam cum id quia explicabo dolores aut officiis? Incidunt modi
            aliquid perferendis natus consectetur amet, blanditiis excepturi vel
            nisi, reiciendis quis adipisci?
          </p>
        </div>
      );
    } else if (state === "Color") {
      return (
        <div
          className="MoreInformationText"
          style={{ backgroundColor: "rgba(218, 54, 74, 1)" }}
        >
          <p>
            Color Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Inventore maiores autem, animi quasi temporibus, necessitatibus
            praesentium recusandae quam id ipsam veritatis aliquid, molestias
            nisi atque unde repellendus laborum voluptas perspiciatis!
          </p>
        </div>
      );
    }

    return (
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi numquam
        totam qui. Cupiditate eveniet asperiores eligendi libero distinctio
        optio sed ipsam dolorem culpa neque odio debitis, vel ducimus fugit
        sapiente.
      </p>
    );
  }

  let BarGraphData = new AccessibilityBarGraphData(accessibilityRating);

  function handlePopupOpen() {
    setIsOpen(true);
  }

  function handlePopupClose() {
    setIsOpen(false);
  }

  function stopPropagation(event: { stopPropagation: () => void }) {
    event.stopPropagation();
  }

  return (
    <motion.div
      style={{
        zIndex: isMyPosterDragging ? 999 : 1,
      }}
      drag
      dragSnapToOrigin={true}
      dragConstraints={{
        bottom: -100,
      }}
      dragElastic={0.2}
      onDrag={(event) => {
        event.preventDefault();
      }}
      onDragStart={() => {
        setIsMyPosterDragging(true);
      }}
      onDragEnd={() => {
        setIsMyPosterDragging(false);
      }}
    >
      <Popup
        trigger={
          <div id="MyPoster" className="MadePoster">
            <div id="PosterImage">
              {" "}
              <img
                src={`data:image/png;base64,${data}`}
                ref={imgRef}
                onError={onImageError}
                alt={`Poster number ${Id}`}
              />
            </div>
            <div id="PosterNameSection">
              <h3>{name}</h3>
            </div>
            <ToastContainer autoClose={1000} limit={1} />
          </div>
        }
        open={isOpen}
        onOpen={handlePopupOpen}
      >
        <div className="PopUpBackground" onClick={handlePopupClose}>
          <div id="PosterPopUpMenuContainerDiv">
            <div
              className="PosterPopUpMenuDivContainer"
              onClick={stopPropagation}
            >
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
                          placeholder={name}
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
                      <h3>{name}</h3>
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
                          src={`data:image/png;base64,${data}`}
                          alt={`Poster number ${Id}`}
                        />
                      </>
                    ) : (
                      <div className="ScaleOnHover">
                        <img
                          ref={imgRef}
                          onError={onImageError}
                          src={`data:image/png;base64,${data}`}
                          alt={`Poster number ${Id}`}
                        />
                      </div>
                    )}
                  </div>
                  <div className="PosterPopUpMenuIconContainer">
                    <div className="tooltip">
                      <DeleteForeverIcon
                        className="PopupIcon"
                        fontSize="large"
                        onClick={DeleteForeverHandler}
                      />
                      <span className="tooltiptext">Delete poster</span>
                    </div>
                    <div className="tooltip">
                      <EditIcon
                        className="PopupIcon"
                        fontSize="large"
                        onClick={() => {
                          setIsEditing(!isEditing);
                        }}
                      />
                      <span className="tooltiptext">Edit poster</span>
                    </div>
                  </div>
                </div>
                <div className="AccessibilityBarGraphScoreContainer">
                  <h3>Accessibility Score</h3>
                  <div id="PosterPopUpMenuBarGraphDiv">
                    <BarGraph
                      data={BarGraphData.build}
                      BarGraphCallback={BarGarphCallbackHandler}
                    />
                  </div>
                </div>
              </div>
              <h1>Informational Text</h1>
              <div style={{ display: "flex", gap: "0.25em" }}>
                <button
                  className="MoreInformationTextBtn"
                  id="TextInformationBtn"
                  style={{
                    borderBottom:
                      moreInfoText === "Text" ? "none" : "0.15em solid #333",
                  }}
                  onClick={() => {
                    setMoreInfoText("Text");
                  }}
                >
                  Text
                </button>
                <button
                  className="MoreInformationTextBtn"
                  id="StructureInformationBtn"
                  style={{
                    borderBottom:
                      moreInfoText === "Structure"
                        ? "none"
                        : "0.15em solid #333",
                  }}
                  onClick={() => {
                    setMoreInfoText("Structure");
                  }}
                >
                  Structure
                </button>
                <button
                  className="MoreInformationTextBtn"
                  style={{
                    borderBottom:
                      moreInfoText === "Color" ? "none" : "0.15em solid #333",
                  }}
                  id="ColorInformationBtn"
                  onClick={() => {
                    setMoreInfoText("Color");
                  }}
                >
                  Color
                </button>
              </div>
              {MoreInformationText(moreInfoText)}
            </div>
          </div>
        </div>
      </Popup>{" "}
    </motion.div>
  );
};

export default MyPoster;
