import "./MyPoster.css";
import DefaultImage from "../../Images/missing_image.jpg";
import Popup from "reactjs-popup";
import BarGraph from "../../Components/BarGraph";
import { useState, useRef } from "react";
import AccessibilityBarGraphData from "../../Components/AccessibilityBarGraphData";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CloseRounded from "@mui/icons-material/CloseRounded";
import Cookies from "universal-cookie";
import ConvertImageToBase64 from "../../Utils/ConvertImageToBase64";
import { getImageGrid } from "../../Utils/Structure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  function closeModel() {
    setIsOpen(false);
  }

  function DeletePoster() {
    setIsProcessing(true);
    let errorFlag = false;
    let userId = localStorage.getItem("userId");
    let cookies = new Cookies();
    let Jwt = cookies.get("jwt");

    toast.info("Sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    fetch(
      `https://localhost:7267/api/User/DeletePosterByUserId/${userId}/ByPosterName/${props.PosterName}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `bearer ${Jwt}`,
        },
      }
    )
      .then((responce) => {
        if (!responce.ok) {
          errorFlag = true;
          return responce.json();
        } else {
          toast.success("poster was successfully deleted", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 4000,
          });
        }
      })
      .then((responseJSON) => {
        if (errorFlag) {
          throw new Error(`${responseJSON}`);
        }

        setIsProcessing(false);
        props.editPosterCallback(Math.random());
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

  function UpdatePosterName(event) {
    setIsEditing(false);
    setIsProcessing(true);
    event.preventDefault();
    let errorFlag = false;
    let userId = localStorage.getItem("userId");
    let cookies = new Cookies();
    let Jwt = cookies.get("jwt");

    toast.info("Sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    fetch(
      `https://localhost:7267/api/User/UpdatePosterNameByUserId/${userId}/ByPosterName/${props.PosterName}?newPosterName=${editPosterName}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `bearer ${Jwt}`,
        },
      }
    )
      .then((responce) => {
        if (!responce.ok) {
          errorFlag = true;
          return responce.json();
        } else {
          toast.success("Poster name was successfully updated", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 4000,
          });
        }
      })
      .then((responseJSON) => {
        if (errorFlag) {
          throw new Error(`${responseJSON}`);
        }

        setIsProcessing(false);
        props.editPosterCallback(editPosterName);
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        setIsProcessing(false);
        console.error(err);
      });
  }

  async function UpdatePosterData(event) {
    setIsEditing(false);
    setIsProcessing(true);
    event.preventDefault();
    let errorFlag = false;
    let userId = localStorage.getItem("userId");
    let cookies = new Cookies();
    let Jwt = cookies.get("jwt");

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

    let name = props.PosterName;
    let title = Math.random().toString();
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
        const addPosterBody = { name, title, data, accessibilityScore };

        fetch(
          `https://localhost:7267/api/User/UpdatePosterDataByUserId/${userId}/ByPosterName/${name}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `bearer ${Jwt}`,
            },
            body: JSON.stringify(addPosterBody),
          }
        )
          .then((responce) => {
            if (!responce.ok) {
              errorFlag = true;
              return responce.json();
            } else {
              toast.success("Successfully updated poster image", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 4000,
              });
            }
          })
          .then((responseJSON) => {
            if (errorFlag) {
              throw new Error(`${responseJSON}`);
            }

            setIsProcessing(false);
            props.editPosterCallback(editPosterData);
          })
          .catch((err) => {
            setIsProcessing(false);
            toast.error(`${err}`, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 4000,
            });
            console.error(err);
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

  function DeleteForeverHandler() {
    let userAnswer = window.confirm(
      `Are you sure you would like to delete poster: '${props.PosterName}' forever?`
    );

    if (userAnswer) {
      DeletePoster();
    }
  }

  let BarGraphData = new AccessibilityBarGraphData(props.AccessibilityRating);

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
      onClose={closeModel}
    >
      <div className="PopUpBackground">
        <div id="PosterPopUpMenuContainerDiv">
          <div className="PosterPopUpMenuDivContainer">
            <CloseRounded
              id="closePosterPopupBtn"
              className="CloseIcon"
              fontSize="large"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
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
                      />
                      <input
                        readOnly={IsProcessing}
                        id="editPosterNameBtn"
                        type="submit"
                        value={"submit"}
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
                            value={"Submit"}
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
                    <img
                      ref={imgRef}
                      onError={onImageError}
                      src={`data:image/png;base64,${props.Data}`}
                      alt={`Poster number ${props.Id}`}
                    />
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
