import "./NavBar.css";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseRounded from "@mui/icons-material/CloseRounded";
import HelpIcon from "@mui/icons-material/Help";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import Popup from "reactjs-popup";
import OptimalAccessibilityLogo from "../Images/Optimal-Accessibility-Logo.png";
import HelpPage from "./HelpPage";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { getImageGrid } from "../Utils/Structure";
import ConvertImageToBase64 from "../Utils/ConvertImageToBase64";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MagicDropZone from "react-magic-dropzone";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../FirebaseConfig";
import { ref, child, get, set } from "firebase/database";

function NavBar(props) {
  let textHelpInfo = `The text rating is mainly based on the readability of the text. If the text cannot be easily read by the computer, then it probably can't be easily read by a person. The size of the text, as well as the color contrast with its surroundings, are the largest factors.

If the text rating for your poster is low, the following list could help you find some issues:
- Text color vs. background color
- Text size (not too small or too big)
- Text orientation(vertical text can't be read easily)
- Spelling
`;

  let structureHelpInfo = `The structure rating uses both text and a split-up, 3x1 grid of the original image. Text size is compared with its parent section's location, whether it be top, middle, or bottom to find out if that specific text could be considered a heading or simply informative text. The final structure rating also uses the ratings from text and color to average itself out.

If the structure rating for your poster is low, the following list could help you find some issues:

- A low text rating can affect the structure
- A low color rating can affect the structure
- Large font in an area that shouldn't be used as a heading
`;

  let colorHelpInfo = `The color rating uses a 3x3 grid of the original image to find and evaluate color contrast. The color contrast is based on various colors found in the background and text of each grid section. The application uses a color contrast testing tool to figure out whether the colors are suitable to be used in close proximity to each other.

If the color rating for your poster is low, the following list could help you find some issues:

- Text color may not have enough contrast with its background
- Different colors that are in close proximity may have low contrast
`;

  function MouseOverExitSpotHandler() {
    let close_popup_menu_element = document.querySelector("#ExitSpot p");
    close_popup_menu_element.textContent = "close popup";
  }

  function MouseLeaveExitSpotHandler() {
    let close_popup_menu_element = document.querySelector("#ExitSpot p");
    close_popup_menu_element.textContent = "";
  }

  const [isOpen, setIsOpen] = useState(false);
  const [name, SetPosterName] = useState("");
  const [FileData, SetPosterFileData] = useState("");
  const [loadingState, setLoadingState] = useState("submit");
  const [IsProcessing, setIsProcessing] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    let cached_posters = JSON.parse(sessionStorage.getItem("cached-posters"));
    const posterNameSet = new Set(
      cached_posters.map((element) => {
        return element.name;
      })
    );

    if (posterNameSet.has(name)) {
      toast.error("Failed to add new posters because the name is taken", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
      return;
    }

    setIsProcessing(true);

    async function getAccessibilityScore(poster) {
      setLoadingState("Uploading image...");
      toast.info("Uploading image...", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
      poster = await ConvertImageToBase64(poster);
      setLoadingState("Calculating accessibility score...");
      toast.info("Calculating accessibility score...", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
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

    toast.info("sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    let accessibilityScore = await getAccessibilityScore(FileData);
    setLoadingState("Sending Poster...");
    ConvertImageToBase64(FileData)
      .then((data) => {
        const addPosterBody = { name, data, accessibilityScore };
        let uid = localStorage.getItem("uid");

        setLoadingState("Sent");
        const dbRef = ref(db);
        get(child(dbRef, `Posters/${uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              let postersSnap = snapshot.val().posters;
              let posterSanpConcat = postersSnap.concat([addPosterBody]);
              set(ref(db, "Posters/" + uid), {
                posters: posterSanpConcat,
              })
                .then(() => {
                  toast.success("Successfully added new poster!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 4000,
                  });
                  setIsProcessing(false);
                  setLoadingState("Submit");
                  SetPosterFileData("");

                  let OverallAccessibilityRating = {
                    textRating: 0,
                    structureRating: 0,
                    colorRating: 0,
                  };
                  posterSanpConcat.forEach((element) => {
                    OverallAccessibilityRating.textRating +=
                      element.accessibilityScore.textRating;
                    OverallAccessibilityRating.structureRating +=
                      element.accessibilityScore.structureRating;
                    OverallAccessibilityRating.colorRating +=
                      element.accessibilityScore.colorRating;
                  });

                  OverallAccessibilityRating.textRating =
                    OverallAccessibilityRating.textRating /
                    posterSanpConcat.length;
                  OverallAccessibilityRating.structureRating =
                    OverallAccessibilityRating.structureRating /
                    posterSanpConcat.length;
                  OverallAccessibilityRating.colorRating =
                    OverallAccessibilityRating.colorRating /
                    posterSanpConcat.length;

                  set(ref(db, "OverallAccessibilityRating/" + uid), {
                    textRating: OverallAccessibilityRating.textRating,
                    structureRating: OverallAccessibilityRating.structureRating,
                    colorRating: OverallAccessibilityRating.colorRating,
                  })
                    .then(() => {
                      props.addPosterCallback(name);
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
                })
                .catch((err) => {
                  setIsProcessing(false);
                  toast.error("Failed to add new poster", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 4000,
                  });
                  console.error(err);
                });
            } else {
              set(ref(db, "Posters/" + uid), {
                posters: [
                  {
                    name: "string",
                    data: "",
                    accessibilityScore: {
                      textRating: 5,
                      structureRating: 5,
                      colorRating: 5,
                    },
                  },
                ],
              })
                .then(() => {
                  toast.info("Successfully initiated Posters", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 4000,
                  });
                  setIsProcessing(false);
                  props.addPosterCallback(name);
                  setLoadingState("Submit");
                  SetPosterFileData("");
                })
                .catch(() => {
                  setIsProcessing(false);
                  setLoadingState("Submit");
                  SetPosterFileData("");
                  toast.error("Failed to initiate Posters", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 4000,
                  });
                });
            }
          })
          .catch((error) => {
            setIsProcessing(false);
            setLoadingState("Submit");
            SetPosterFileData("");
            console.error(error);
          });
      })
      .catch((err) => {
        setIsProcessing(false);
        setLoadingState("Submit");
        SetPosterFileData("");
        console.error(err);
      });
  }

  function generatePDF() {
    // let errorFlag = false;
    // let userId = localStorage.getItem("uid");

    // function formatDate() {
    //   let d = new Date();
    //   let month = (d.getMonth() + 1).toString();
    //   let day = d.getDate().toString();
    //   let year = d.getFullYear();
    //   if (month.length < 2) {
    //     month = "0" + month;
    //   }
    //   if (day.length < 2) {
    //     day = "0" + day;
    //   }
    //   return [month, day, year].join("-");
    // }

    toast.info("Generating PDF Report...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
    // fetch(`https://localhost:7267/api/User/GenerateReportByUserId/${userId}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     accept: "application/pdf",
    //     Authorization: `bearer ${Jwt}`,
    //   },
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       errorFlag = true;
    //     }
    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     if (errorFlag) {
    //       throw new Error(`${blob}`);
    //     }
    //     toast.success("Successfully generated PDF report!", {
    //       position: toast.POSITION.BOTTOM_RIGHT,
    //       autoClose: 2000,
    //     });
    //     let today = formatDate();
    //     var url = window.URL.createObjectURL(blob);
    //     var a = document.createElement("a");
    //     a.href = url;
    //     a.download = `Optimal-Accessibility-Report-${userId}-${today}.pdf`;
    //     document.body.appendChild(a);
    //     a.click();
    //     a.remove();
    //   })
    //   .catch((err) => {
    //     toast.error(`${err}`, {
    //       position: toast.POSITION.BOTTOM_RIGHT,
    //       autoClose: 2000,
    //     });
    //     console.error(err);
    //   });
  }

  function handleNameChange(event) {
    SetPosterName(event.target.value);
  }

  function validateName() {
    let posters = JSON.parse(sessionStorage.getItem("cached-posters"));
    const posterNameSet = new Set(
      posters.map((element) => {
        return element.name;
      })
    );

    if (posterNameSet.has(name)) {
      toast.error("Poster name is already taken", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
  }

  const handleFileChange = (accepted, rejected, links) => {
    if (accepted.length && !rejected.length) {
      SetPosterFileData(accepted[0]);
    } else {
      toast.error("Something went wrong...", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
  };

  function handleLogout() {
    localStorage.clear();
    let cookies = new Cookies();
    cookies.remove("refreshToken");
  }

  function handlePopupOpen() {
    setIsOpen(true);
  }

  function handlePopupClose() {
    setIsOpen(false);
  }

  const navigate = useNavigate();

  return (
    <div className="NavBar">
      <span></span>
      <Link to="/dashboard">
        <div id="LogoBox">
          <img
            id="LogoImg"
            alt="Optimal Accessibility Logo"
            src={OptimalAccessibilityLogo}
          />
          <h1>Optimal Accessibility</h1>
        </div>
      </Link>
      {!props.IsGuestMode ? (
        <>
          <span
            id="ExitSpot"
            onMouseOver={MouseOverExitSpotHandler}
            onMouseLeave={MouseLeaveExitSpotHandler}
          >
            <p></p>
          </span>
          <div id="NavItemsBox">
            <ul>
              <li>
                <Popup trigger={<HelpIcon fontSize="large" />}>
                  <div className="PopUpBackground">
                    <div id="PopUpHelpMenuDivSection">
                      <ul id="PopUpHelpMenuDiv">
                        <Popup
                          trigger={<li id="PopUpHelpMenuDivTextField">Text</li>}
                        >
                          <div className="PopUpBackground">
                            <HelpPage
                              PageName="Text"
                              PageContent={textHelpInfo}
                              Color={"#017F01"}
                            />
                          </div>
                        </Popup>
                        <Popup
                          trigger={
                            <li id="PopUpHelpMenuDivStructureField">
                              Structure
                            </li>
                          }
                        >
                          <div className="PopUpBackground">
                            <HelpPage
                              PageName="Structure"
                              PageContent={structureHelpInfo}
                              Color={"#640665"}
                            />
                          </div>
                        </Popup>
                        <Popup
                          trigger={
                            <li id="PopUpHelpMenuDivColorField">Color</li>
                          }
                        >
                          <div className="PopUpBackground">
                            <HelpPage
                              PageName="Color"
                              PageContent={colorHelpInfo}
                              Color={"#DA364A"}
                            />
                          </div>
                        </Popup>
                      </ul>
                    </div>
                  </div>
                </Popup>
              </li>
              <li>
                <Popup
                  trigger={
                    <AddIcon
                      onClick={() => {
                        setLoadingState("Submit");
                      }}
                      fontSize="large"
                    />
                  }
                  open={isOpen}
                  onOpen={handlePopupOpen}
                >
                  <div className="PopUpBackground">
                    <div id="PopUpAddMenuDivSection">
                      <div id="PopUpAddMenuDiv">
                        <div id="PopUpAddMenuHeaderDiv">
                          <h2>New Poster</h2>
                          <CloseRounded
                            id="PopUpAddMenuHeadeCloseBtn"
                            fontSize="large"
                            onClick={handlePopupClose}
                          />
                        </div>
                        <form onSubmit={handleSubmit} id="PopUpAddMenuForm">
                          <input
                            readOnly={IsProcessing}
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            onBlur={validateName}
                          />
                          <MagicDropZone
                            className="DragAndDropSection"
                            accept=".jpg, .png, .jpeg"
                            onDrop={handleFileChange}
                          >
                            {FileData === ""
                              ? "Drop your poster here"
                              : "✅ Poster received!"}
                          </MagicDropZone>
                          <input
                            readOnly={IsProcessing}
                            type="submit"
                            value={loadingState}
                            className="PopUpAccountMenuDivbtn"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </Popup>
              </li>
              <li>
                <PictureAsPdf onClick={generatePDF} fontSize="large" />
              </li>
              <li>
                <Popup trigger={<AccountCircleIcon fontSize="large" />}>
                  <div className="PopUpBackground">
                    <div id="PopUpAccountsMenuDivSection">
                      <ul id="PopUpAccountMenuDiv">
                        <Link to="/settings">
                          <li
                            className="PopUpAccountMenuDivbtn"
                            style={{ marginBottom: 10 }}
                          >
                            Settings
                          </li>
                        </Link>
                        <Link to="/" onClick={handleLogout}>
                          <li className="PopUpAccountMenuDivbtn">Logout</li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                </Popup>
              </li>
            </ul>
          </div>
          <ToastContainer autoClose={1000} limit={3} />
        </>
      ) : (
        <div className="GuestModeTextContainer">
          <p className="GuestModeText">You are in guest mode</p>
          <button className="CreateAccountButton" onClick={() => navigate("/")}>
            Create an Account
          </button>
          <Popup trigger={<HelpIcon className="HelpIcon" fontSize="large" />}>
            <div className="PopUpBackground">
              <div id="PopUpHelpMenuDivSection">
                <ul id="PopUpHelpMenuDiv">
                  <Popup trigger={<li id="PopUpHelpMenuDivTextField">Text</li>}>
                    <div className="PopUpBackground">
                      <HelpPage
                        PageName="Text"
                        PageContent={textHelpInfo}
                        Color={"#017F01"}
                      />
                    </div>
                  </Popup>
                  <Popup
                    trigger={
                      <li id="PopUpHelpMenuDivStructureField">Structure</li>
                    }
                  >
                    <div className="PopUpBackground">
                      <HelpPage
                        PageName="Structure"
                        PageContent={structureHelpInfo}
                        Color={"#640665"}
                      />
                    </div>
                  </Popup>
                  <Popup
                    trigger={<li id="PopUpHelpMenuDivColorField">Color</li>}
                  >
                    <div className="PopUpBackground">
                      <HelpPage
                        PageName="Color"
                        PageContent={colorHelpInfo}
                        Color={"#DA364A"}
                      />
                    </div>
                  </Popup>
                </ul>
              </div>
            </div>
          </Popup>
        </div>
      )}
    </div>
  );
}

export default NavBar;
