import "./NavBar.css";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseRounded from "@mui/icons-material/CloseRounded";
import HelpIcon from "@mui/icons-material/Help";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import LoopIcon from "@mui/icons-material/Loop";
import Popup from "reactjs-popup";
import OptimalAccessibilityLogo from "../Images/Optimal-Accessibility-Logo.png";
import HelpPage from "./HelpPage";
import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { getImageGrid } from "../Utils/Structure";
import ConvertImageToBase64 from "../Utils/ConvertImageToBase64";
import { ToastContainer, toast } from "react-toastify";
import MagicDropZone from "react-magic-dropzone";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../FirebaseConfig";
import { ref, child, get, set } from "firebase/database";
import createPDF from "../Utils/CreatePDF";
import { GlobalPosters } from "../Pages/DashBoard/DashBoard";
import { accessibilityScore, poster } from "../oaTypes";

function NavBar(props: { addPosterCallback: (arg0: string) => void }) {
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

  const [isOpenHelpPages, setIsOpenHelpPages] = useState<boolean>(false);
  const [isOpenAddPosterMenu, setIsOpenAddPosterMenu] =
    useState<boolean>(false);
  const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
  const [name, SetPosterName] = useState<string>("");
  const [FileData, SetPosterFileData] = useState<string>("");
  const [loadingState, setLoadingState] = useState<string>("submit");
  const [IsProcessing, setIsProcessing] = useState<boolean>(false);

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const posterNameSet = new Set(
      GlobalPosters.map((element: { name: any }) => {
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

    async function getAccessibilityScore(poster: Blob) {
      setLoadingState("Uploading image...");
      toast.info("Uploading image...", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      let posterBase64String = await ConvertImageToBase64(poster);
      setLoadingState("Calculating accessibility score...");
      toast.info("Calculating accessibility score...", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      let posterGrades = await getImageGrid(
        "data:image/png;base64," + posterBase64String?.toString()
      ).then((score) => {
        let posterGrade: accessibilityScore = {
          textRating: Math.round(score.textRating),
          structureRating: Math.round(score.structureRating),
          colorRating: Math.round(score.colorRating),
        };

        return posterGrade;
      });

      return posterGrades;
    }

    toast.info("sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
    let accessibilityScore = await getAccessibilityScore(
      FileData as unknown as Blob
    );
    setLoadingState("Sending Poster...");
    ConvertImageToBase64(FileData as unknown as Blob)
      .then((data: any) => {
        const addPosterBody = { name, data, accessibilityScore };
        let uid = localStorage.getItem("uid");

        setLoadingState("Sent");
        const dbRef = ref(db);
        get(child(dbRef, `Posters/${uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              let postersSnap: Array<poster> = snapshot.val().posters;
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
                  SetPosterName("");
                  SetPosterFileData("");
                  setIsOpenAddPosterMenu(false);

                  let OverallAccessibilityRating: accessibilityScore = {
                    textRating: 0,
                    structureRating: 0,
                    colorRating: 0,
                  };
                  posterSanpConcat.forEach(
                    (element: {
                      accessibilityScore: {
                        textRating: number;
                        structureRating: number;
                        colorRating: number;
                      };
                    }) => {
                      OverallAccessibilityRating.textRating +=
                        element.accessibilityScore.textRating;
                      OverallAccessibilityRating.structureRating +=
                        element.accessibilityScore.structureRating;
                      OverallAccessibilityRating.colorRating +=
                        element.accessibilityScore.colorRating;
                    }
                  );

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
                    name: "Example Poster",
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
                  SetPosterName("");
                  SetPosterFileData("");
                })
                .catch(() => {
                  setIsProcessing(false);
                  setLoadingState("Submit");
                  SetPosterFileData("");
                  SetPosterName("");
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
      .catch((err: any) => {
        setIsProcessing(false);
        setLoadingState("Submit");
        SetPosterFileData("");
        console.error(err);
      });
  }

  function generatePDF() {
    toast.info("Generating PDF Report...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });

    createPDF(GlobalPosters);
  }

  function handleNameChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    SetPosterName(event.target.value);
  }

  function validateName() {
    const posterNameSet = new Set(
      GlobalPosters.map((element: { name: any }) => {
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

  const handleFileChange = (
    accepted: string | any[],
    rejected: string | any[],
    _links: any
  ) => {
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

  function handlePopupHelpPagesOpen() {
    setIsOpenHelpPages(true);
  }

  function handlePopupHelpPagesClose() {
    setIsOpenHelpPages(false);
  }

  function handlePopupAddPosterMenuOpen() {
    setIsOpenAddPosterMenu(true);
  }

  function handlePopupAddPosterMenuClose() {
    setIsOpenAddPosterMenu(false);
  }

  function handlePopupSettingsOpen() {
    setIsOpenSettings(true);
  }

  function handlePopupSettingsClose() {
    setIsOpenSettings(false);
  }

  function stopPropagation(event: { stopPropagation: () => void }) {
    event.stopPropagation();
  }

  return (
    <div className="NavBar">
      <div id="NavItemsBox">
        <ul>
          <li>
            <Link to="/dashboard" id="LogoBoxLink">
              <div id="LogoBox">
                <img
                  id="LogoImg"
                  alt="Optimal Accessibility Logo"
                  src={OptimalAccessibilityLogo}
                />
              </div>
            </Link>
          </li>
          <li>
            <Popup
              trigger={
                <div className="tooltip">
                  <AccountCircleIcon fontSize="large" />
                  <span className="tooltiptext">
                    Account Settings and Logout
                  </span>
                </div>
              }
              open={isOpenSettings}
              onOpen={handlePopupSettingsOpen}
            >
              <div
                className="PopUpBackground"
                onClick={handlePopupSettingsClose}
              >
                <div id="PopUpAccountsMenuDivSection">
                  <ul id="PopUpAccountMenuDiv" onClick={stopPropagation}>
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
          <li>
            <Popup
              trigger={
                <div className="tooltip">
                  <HelpIcon fontSize="large" />
                  <span className="tooltiptext">Help pages</span>
                </div>
              }
              open={isOpenHelpPages}
              onOpen={handlePopupHelpPagesOpen}
            >
              <div className="PopUpBackground">
                <div
                  id="PopUpHelpMenuDivSection"
                  onClick={handlePopupHelpPagesClose}
                >
                  <ul id="PopUpHelpMenuDiv" onClick={stopPropagation}>
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
          </li>
          <li>
            <Popup
              trigger={
                <div className="tooltip">
                  <AddIcon
                    onClick={() => {
                      setLoadingState("Submit");
                    }}
                    fontSize="large"
                  />
                  <span className="tooltiptext">Add a new poster</span>
                </div>
              }
              open={isOpenAddPosterMenu}
              onOpen={handlePopupAddPosterMenuOpen}
            >
              <div
                className="PopUpBackground"
                onClick={handlePopupAddPosterMenuClose}
              >
                <div id="PopUpAddMenuDivSection">
                  <div id="PopUpAddMenuDiv" onClick={stopPropagation}>
                    <div id="PopUpAddMenuHeaderDiv">
                      <h2>New Poster</h2>
                      <CloseRounded
                        id="PopUpAddMenuHeadeCloseBtn"
                        fontSize="large"
                        onClick={handlePopupAddPosterMenuClose}
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
                      {IsProcessing ? (
                        <div className="spinning_loader_wrapper">
                          <LoopIcon
                            fontSize="large"
                            className="spinning_loader"
                          />
                        </div>
                      ) : (
                        <MagicDropZone
                          className="DragAndDropSection"
                          accept=".jpg, .png, .jpeg"
                          onDrop={handleFileChange}
                        >
                          {FileData === ""
                            ? "Drop your poster here"
                            : "✅ Poster received!"}
                        </MagicDropZone>
                      )}
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
            <div className="tooltip">
              <PictureAsPdf onClick={generatePDF} fontSize="large" />
              <span className="tooltiptext">Generate a new PDF report</span>
            </div>
          </li>
        </ul>
      </div>
      <ToastContainer autoClose={1000} limit={1} />
    </div>
  );
}

export default NavBar;
