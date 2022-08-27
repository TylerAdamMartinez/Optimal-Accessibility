import "./MyPostersSection.css";
import MyPoster from "./MyPoster";
import AddPoster from "./AddPoster";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { poster } from "../../oaTypes";
import MyFolder from "./MyFolder";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import CloseRounded from "@mui/icons-material/CloseRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AccessibilityBarGraphData from "../../Components/Graphs/BarGraph/AccessibilityBarGraphData";
import BarGraph from "../../Components/Graphs/BarGraph/BarGraph";
import DefaultImage from "../../Images/missing_image.jpg";
import MyFolderLoadingAnimate from "./MyFolderLoadingAnimate";
import MyPosterLoadingAnimate from "./MyPosterLoadingAnimate";

interface MyPostersSectionProp {
  myPosters: Array<poster> | null;
  editPosterCallback: (arg0: string) => void;
}

function MyPostersSection(props: MyPostersSectionProp) {
  const [IsDataLoaded, setIsDataLoaded] = useState<boolean>(true);
  const [OldPosterEdited, SetOldPosterEdited] = useState<string>("");
  const [moreInfoText, setMoreInfoText] = useState<string>("Text");
  const [posterArray, setPosterArray] = useState<Array<poster> | null>(
    props.myPosters
  );

  let generalKey = useId();
  useEffect(() => {
    if (props.myPosters !== null && props.myPosters !== undefined) {
      setIsDataLoaded(true);
      setPosterArray(props.myPosters);
    }
  }, [props.myPosters]);

  const posterDictionary: { [key: string]: poster } = useMemo(() => {
    let pDictionary: { [key: string]: poster } = {};
    if (props.myPosters !== null && props.myPosters !== undefined) {
      props.myPosters.forEach((poster, index) => {
        pDictionary[generalKey + index.toString()] = poster;
      });
    }
    return pDictionary;
  }, [generalKey, props.myPosters]);

  useEffect(() => {
    props.editPosterCallback(OldPosterEdited);
  }, [props, OldPosterEdited]);

  function editPosterCallbackHandler(title: string) {
    SetOldPosterEdited(title);
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

  const imgRef = useRef<HTMLImageElement>(null);
  function onImageError() {
    if (imgRef.current === undefined || imgRef.current === null) return;
    imgRef.current.src = DefaultImage as string;
  }

  let [isEditing, setIsEditing] = useState<boolean>(false);
  // let [editPosterName, setEditPosterName] = useState<string>("name");
  // // let [editPosterData, setEditPosterData] = useState<string | File>("data");
  // const [IsProcessing, setIsProcessing] = useState<boolean>(false);
  let editPosterName = "name";
  let IsProcessing = false;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function Folders() {
    return (
      <>
        {folders.map((folder) => {
          return (
            <motion.div key={Math.random()}>
              <MyFolder
                folderType={folder.folderType}
                folderName={folder.folderName}
              />
            </motion.div>
          );
        })}
      </>
    );
  }

  function Posters() {
    if (posterArray) {
      return (
        <Reorder.Group
          style={{
            display: "flex",
            marginBlockStart: 0,
            marginBlockEnd: 0,
            paddingInlineStart: 0,
          }}
          onReorder={setPosterArray}
          values={posterArray}
          axis="x"
        >
          {posterArray.map((poster, index) => {
            return (
              <Reorder.Item
                style={{ listStyleType: "none" }}
                onClick={() => {
                  setSelectedId(generalKey + index.toString());
                }}
                layoutId={generalKey + index.toString()}
                key={generalKey + index.toString()}
                value={poster}
                whileDrag={{cursor: "grabbing"}}
              >
                <MyPoster
                  name={poster.name}
                  data={poster.data}
                  accessibilityRating={poster.accessibilityScore}
                  editPosterCallback={editPosterCallbackHandler}
                />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      );
    }

    return <></>;
  }

  return (
    <motion.div
      id="MyPostersDiv"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div id="InnerMyPostersDiv">
        <h2>My Posters</h2>
        <span className="FolderSpan">
          {IsDataLoaded ? (
            <>
              <Folders />
              <MyFolder folderType="new" folderName="Create a new folder" />
            </>
          ) : (
            <>
              <MyFolderLoadingAnimate />
              <MyFolder folderType="new" folderName="Create a new folder" />
            </>
          )}
        </span>
        <span className="PosterSpan">
          {IsDataLoaded ? <Posters /> : <MyPosterLoadingAnimate />}
          <AnimatePresence mode="wait">
            {selectedId && (
              <motion.div
                layoutId={selectedId}
                style={{ position: "fixed", top: 0, left: 0 }}
                initial={{ backgroundColor: "#33333300" }}
                animate={{ backgroundColor: "#33333387" }}
                exit={{ backgroundColor: "#33333300" }}
                transition={{ duration: 0.3 }}
                className="PopUpBackground"
                onClick={() => {
                  setSelectedId(null);
                }}
              >
                <motion.div id="PosterPopUpMenuContainerDiv">
                  <div
                    className="PosterPopUpMenuDivContainer"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <CloseRounded
                      id="closePosterPopupBtn"
                      className="CloseIcon"
                      fontSize="large"
                      onClick={() => {
                        setSelectedId(null);
                      }}
                    />
                    <div id="PosterPopUpMenuDiv">
                      <div className="PosterImgAndNameContainer">
                        <div id="PosterPopUpMenuPosterNameDiv">
                          {isEditing ? (
                            <form id="editForm" /*onSubmit={UpdatePosterName}*/>
                              <input
                                readOnly={IsProcessing}
                                id="editPosterNameInput"
                                placeholder={posterDictionary[selectedId].name}
                                type="text"
                                value={editPosterName}
                                /*onChange={editPosterNameHandler}
                          onBlur={validateEditPosterName}*/
                              />
                              <input
                                readOnly={IsProcessing}
                                id="editPosterNameBtn"
                                type="submit"
                                value={"Enter"}
                              />
                            </form>
                          ) : (
                            <h3>{posterDictionary[selectedId].name}</h3>
                          )}
                        </div>
                        <div id="PosterPopUpMenuImgDiv">
                          {isEditing ? (
                            <>
                              <div id="editingPosterDataFrom">
                                <form /*onSubmit={UpdatePosterData}*/>
                                  <input
                                    disabled={IsProcessing}
                                    readOnly={IsProcessing}
                                    type="File"
                                    accept=".png, .jpg, .jpeg"
                                    /*onChange={editPosterDatahandler}*/
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
                                src={`data:image/png;base64,${posterDictionary[selectedId].data}`}
                                alt={`Preview Poster: poster with name ${posterDictionary[selectedId].name}}`}
                              />
                            </>
                          ) : (
                            <div className="ScaleOnHover">
                              <img
                                ref={imgRef}
                                onError={onImageError}
                                src={`data:image/png;base64,${posterDictionary[selectedId].data}`}
                                alt={`Preview Poster: poster with name ${posterDictionary[selectedId].name}}`}
                              />
                            </div>
                          )}
                        </div>
                        <div className="PosterPopUpMenuIconContainer">
                          <div className="tooltip">
                            <DeleteForeverIcon
                              className="PopupIcon"
                              fontSize="large"
                              //onClick={DeleteForeverHandler}
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
                            data={
                              new AccessibilityBarGraphData(
                                posterDictionary[selectedId].accessibilityScore
                              ).build
                            }
                            BarGraphCallback={(state: string) => {
                              setMoreInfoText(state);
                            }}
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
                            moreInfoText === "Text"
                              ? "none"
                              : "0.15em solid #333",
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
                            moreInfoText === "Color"
                              ? "none"
                              : "0.15em solid #333",
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <AddPoster />
        </span>
      </div>
    </motion.div>
  );
}

export default MyPostersSection;
