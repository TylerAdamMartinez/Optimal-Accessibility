import "./MyPoster.css";
import DefaultImage from "../../Images/missing_image.jpg";
// import Popup from "reactjs-popup";
// import BarGraph from "../../Components/Graphs/BarGraph/BarGraph";
import { useRef } from "react";
// import AccessibilityBarGraphData from "../../Components/Graphs/BarGraph/AccessibilityBarGraphData";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import EditIcon from "@mui/icons-material/Edit";
// import CloseRounded from "@mui/icons-material/CloseRounded";
// import ConvertImageToBase64 from "../../Utils/ConvertImageToBase64";
// import { getImageGrid } from "../../Utils/Structure";
// import { db } from "../../FirebaseConfig";
// import { ref, set } from "firebase/database";
// import { GlobalPosters } from "../../Pages/DashBoard/DashBoard";
import { accessibilityScore } from "../../oaTypes";

const MyPoster: React.FC<{
  name: string;
  data: string;
  accessibilityRating: accessibilityScore;
  editPosterCallback: (arg0: string) => void;
}> = ({ name, data }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  function onImageError() {
    if (imgRef.current === undefined || imgRef.current === null) return;
    imgRef.current.src = DefaultImage as string;
  }

  // let [isOpen, setIsOpen] = useState<boolean>(false);
  // let [isEditing, setIsEditing] = useState<boolean>(false);
  // let [editPosterName, setEditPosterName] = useState<string>(name);
  // let [editPosterData, setEditPosterData] = useState<string | File>(data);
  // const [IsProcessing, setIsProcessing] = useState<boolean>(false);
  // const [moreInfoText, setMoreInfoText] = useState<string>("Text");

  // function DeletePoster() {
  //   setIsProcessing(true);
  //   let uid = localStorage.getItem("uid");

  //   const posterNames = GlobalPosters.map((element) => {
  //     return element.name;
  //   });
  //   const index = posterNames.indexOf(name);

  //   if (index > -1) {
  //     GlobalPosters.splice(index, 1);
  //   } else {
  //     toast.error("Failed to find poster", {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //       autoClose: 4000,
  //     });
  //     return;
  //   }

  //   toast.info("Sent", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     autoClose: 4000,
  //   });

  //   set(ref(db, "Posters/" + uid), {
  //     posters: GlobalPosters,
  //   })
  //     .then(() => {
  //       toast.success("Successfully deleted poster", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //         autoClose: 4000,
  //       });
  //       setIsProcessing(false);
  //       let OverallAccessibilityRating = {
  //         textRating: 0,
  //         structureRating: 0,
  //         colorRating: 0,
  //       };
  //       GlobalPosters.forEach((element) => {
  //         OverallAccessibilityRating.textRating +=
  //           element.accessibilityScore.textRating;
  //         OverallAccessibilityRating.structureRating +=
  //           element.accessibilityScore.structureRating;
  //         OverallAccessibilityRating.colorRating +=
  //           element.accessibilityScore.colorRating;
  //       });

  //       OverallAccessibilityRating.textRating =
  //         OverallAccessibilityRating.textRating / GlobalPosters.length;
  //       OverallAccessibilityRating.structureRating =
  //         OverallAccessibilityRating.structureRating / GlobalPosters.length;
  //       OverallAccessibilityRating.colorRating =
  //         OverallAccessibilityRating.colorRating / GlobalPosters.length;

  //       set(ref(db, "OverallAccessibilityRating/" + uid), {
  //         textRating: OverallAccessibilityRating.textRating,
  //         structureRating: OverallAccessibilityRating.structureRating,
  //         colorRating: OverallAccessibilityRating.colorRating,
  //       })
  //         .then(() => {
  //           setIsProcessing(false);
  //           editPosterCallback(Math.random().toString());
  //         })
  //         .catch(() => {
  //           setIsProcessing(false);
  //           toast.error("Failed to calculate new OverallAccessibilityRating", {
  //             position: toast.POSITION.BOTTOM_RIGHT,
  //             autoClose: 4000,
  //           });
  //         });
  //     })
  //     .catch(() => {
  //       setIsProcessing(false);
  //       toast.error("Failed to delete poster", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //         autoClose: 4000,
  //       });
  //     });
  // }

  // function UpdatePosterName(event: { preventDefault: () => void }) {
  //   setIsEditing(false);
  //   setIsProcessing(true);
  //   event.preventDefault();
  //   let uid = localStorage.getItem("uid");

  //   const posterNameSet = new Set(
  //     GlobalPosters.map((element) => {
  //       return element.name;
  //     })
  //   );

  //   if (posterNameSet.has(editPosterName)) {
  //     toast.error("Failed to update poster because the name is taken", {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //       autoClose: 4000,
  //     });
  //     return;
  //   }

  //   const posterNames = GlobalPosters.map((element) => {
  //     return element.name;
  //   });
  //   const index = posterNames.indexOf(name);

  //   if (index > -1) {
  //     GlobalPosters[index] = {
  //       name: editPosterName,
  //       data: GlobalPosters[index].data,
  //       accessibilityScore: GlobalPosters[index].accessibilityScore,
  //     };
  //   } else {
  //     toast.error("Failed to find poster", {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //       autoClose: 4000,
  //     });
  //     return;
  //   }

  //   toast.info("Sent", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     autoClose: 4000,
  //   });

  //   set(ref(db, "Posters/" + uid), {
  //     posters: GlobalPosters,
  //   })
  //     .then(() => {
  //       toast.success("Poster's name was successfully updated", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //         autoClose: 4000,
  //       });
  //       setIsProcessing(false);
  //       editPosterCallback(editPosterName);
  //     })
  //     .catch(() => {
  //       setIsProcessing(false);
  //       toast.error("Failed to update poster's name", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //         autoClose: 4000,
  //       });
  //     });
  // }

  // async function UpdatePosterData(event: { preventDefault: () => void }) {
  //   setIsEditing(false);
  //   setIsProcessing(true);
  //   event.preventDefault();
  //   let uid = localStorage.getItem("uid");

  //   async function getAccessibilityScore(poster: Blob) {
  //     const posterBase64String = await ConvertImageToBase64(poster);
  //     let posterGrades = await getImageGrid(
  //       "data:image/png;base64," + posterBase64String
  //     ).then((score) => {
  //       let posterGrade = {
  //         textRating: Math.round(score.textRating),
  //         structureRating: Math.round(score.structureRating),
  //         colorRating: Math.round(score.colorRating),
  //       };

  //       return posterGrade;
  //     });

  //     return posterGrades;
  //   }

  //   toast.info("Sent", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     autoClose: 4000,
  //   });
  //   let accessibilityScore = await getAccessibilityScore(
  //     editPosterData as Blob
  //   );
  //   toast.info("Caculating Accessibility Score...", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     autoClose: 4000,
  //   });

  //   ConvertImageToBase64(editPosterData as Blob)
  //     .then((data: any) => {
  //       const newPosterBody = { data, accessibilityScore };
  //       const posterNames = GlobalPosters.map((element) => {
  //         return element.name;
  //       });

  //       const index = posterNames.indexOf(name);

  //       console.log("old posters", GlobalPosters);
  //       if (index > -1) {
  //         GlobalPosters[index] = {
  //           name: GlobalPosters[index].name,
  //           data: newPosterBody.data,
  //           accessibilityScore: newPosterBody.accessibilityScore,
  //         };
  //         console.log("new posters", GlobalPosters);
  //       } else {
  //         toast.error("Failed to find poster", {
  //           position: toast.POSITION.BOTTOM_RIGHT,
  //           autoClose: 4000,
  //         });
  //         return;
  //       }

  //       set(ref(db, "Posters/" + uid), {
  //         posters: GlobalPosters,
  //       }).then(() => {
  //         toast.success("Successfully update poster's image!", {
  //           position: toast.POSITION.BOTTOM_RIGHT,
  //           autoClose: 4000,
  //         });
  //         setIsProcessing(false);

  //         let OverallAccessibilityRating = {
  //           textRating: 0,
  //           structureRating: 0,
  //           colorRating: 0,
  //         };

  //         GlobalPosters.forEach((element) => {
  //           OverallAccessibilityRating.textRating +=
  //             element.accessibilityScore.textRating;
  //           OverallAccessibilityRating.structureRating +=
  //             element.accessibilityScore.structureRating;
  //           OverallAccessibilityRating.colorRating +=
  //             element.accessibilityScore.colorRating;
  //         });

  //         OverallAccessibilityRating.textRating =
  //           OverallAccessibilityRating.textRating / GlobalPosters.length;
  //         OverallAccessibilityRating.structureRating =
  //           OverallAccessibilityRating.structureRating / GlobalPosters.length;
  //         OverallAccessibilityRating.colorRating =
  //           OverallAccessibilityRating.colorRating / GlobalPosters.length;

  //         set(ref(db, "OverallAccessibilityRating/" + uid), {
  //           textRating: OverallAccessibilityRating.textRating,
  //           structureRating: OverallAccessibilityRating.structureRating,
  //           colorRating: OverallAccessibilityRating.colorRating,
  //         })
  //           .then(() => {
  //             editPosterCallback(Math.random().toString());
  //           })
  //           .catch(() => {
  //             toast.error(
  //               "Failed to calculate new OverallAccessibilityRating",
  //               {
  //                 position: toast.POSITION.BOTTOM_RIGHT,
  //                 autoClose: 4000,
  //               }
  //             );
  //           });
  //       });
  //     })
  //     .catch((err: any) => {
  //       setIsProcessing(false);
  //       toast.error(`${err}`, {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //         autoClose: 4000,
  //       });
  //       console.error(err);
  //     });
  // }

  // function editPosterNameHandler(event: {
  //   target: { value: SetStateAction<string> };
  // }) {
  //   setEditPosterName(event.target.value);
  // }

  // function editPosterDatahandler(event: {
  //   target: { files: FileList | null };
  // }) {
  //   if (event.target.files === null) return;
  //   let file: File | null = event.target.files[0];
  //   if (file === null) return;
  //   setEditPosterData(file);
  // }

  // function validateEditPosterName() {
  //   const cached_posters = sessionStorage.getItem("cached-posters");

  //   if (cached_posters === null) return;

  //   let GlobalPosters: Array<poster> = JSON.parse(cached_posters);
  //   const posterNameSet = new Set(
  //     GlobalPosters.map((element: { name: string }) => {
  //       return element.name;
  //     })
  //   );

  //   if (posterNameSet.has(editPosterName)) {
  //     toast.error("Poster name is already taken", {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //       autoClose: 4000,
  //     });
  //   }
  // }

  // function DeleteForeverHandler() {
  //   let userAnswer = window.confirm(
  //     `Are you sure you would like to delete poster: '${name}' forever?`
  //   );

  //   if (userAnswer) {
  //     DeletePoster();
  //   }
  // }

  // function BarGarphCallbackHandler(state: string): void {
  //   setMoreInfoText(state);
  // }

  // function MoreInformationText(state: string): JSX.Element {
  //   if (state === "Text") {
  //     return (
  //       <div
  //         className="MoreInformationText"
  //         style={{ backgroundColor: "rgba(1, 127, 1, 1)" }}
  //       >
  //         <p>
  //           Text Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
  //           omnis eligendi veniam. Cupiditate corporis dicta, nihil porro
  //           praesentium quam dolorem omnis nobis voluptatibus voluptatum maiores
  //           impedit fugit reiciendis voluptates eum!
  //         </p>
  //       </div>
  //     );
  //   } else if (state === "Structure") {
  //     return (
  //       <div
  //         className="MoreInformationText"
  //         style={{ backgroundColor: "rgba(100, 6, 101, 1)" }}
  //       >
  //         <p>
  //           Strucuture Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  //           Quibusdam cum id quia explicabo dolores aut officiis? Incidunt modi
  //           aliquid perferendis natus consectetur amet, blanditiis excepturi vel
  //           nisi, reiciendis quis adipisci?
  //         </p>
  //       </div>
  //     );
  //   } else if (state === "Color") {
  //     return (
  //       <div
  //         className="MoreInformationText"
  //         style={{ backgroundColor: "rgba(218, 54, 74, 1)" }}
  //       >
  //         <p>
  //           Color Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  //           Inventore maiores autem, animi quasi temporibus, necessitatibus
  //           praesentium recusandae quam id ipsam veritatis aliquid, molestias
  //           nisi atque unde repellendus laborum voluptas perspiciatis!
  //         </p>
  //       </div>
  //     );
  //   }

  //   return (
  //     <p>
  //       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi numquam
  //       totam qui. Cupiditate eveniet asperiores eligendi libero distinctio
  //       optio sed ipsam dolorem culpa neque odio debitis, vel ducimus fugit
  //       sapiente.
  //     </p>
  //   );
  // }

  // let BarGraphData = new AccessibilityBarGraphData(accessibilityRating);

  // function handlePopupOpen() {
  //   setIsOpen(true);
  // }

  // function handlePopupClose() {
  //   setIsOpen(false);
  // }

  // function stopPropagation(event: { stopPropagation: () => void }) {
  //   event.stopPropagation();
  // }

  return (
      <div id="MyPoster" className="MadePoster">
        <div id="PosterImage">
          {" "}
          <img
            src={`data:image/png;base64,${data}`}
            ref={imgRef}
            onError={onImageError}
            alt={`Preview Poster: poster with name ${name}}`}
          />
        </div>
        <div id="PosterNameSection">
          <h3>{name}</h3>
        </div>
      </div>
  );
};

export default MyPoster;
