import "./../../App.css";
import NavBar from "../../Components/NavBar.js";
import MyPostersSection from "./MyPostersSection";
import OverallAccessibilitySection from "./OverallAccessibilitySection";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AccessibilityBarGraphData from "../../Components/AccessibilityBarGraphData";
import { db } from "../../FirebaseConfig";
import { ref, child, get, set } from "firebase/database";

function DashBoard() {
  const [NewPosterAdded, SetNewPosterAdded] = useState("");
  const [OldPosterEdited, SetOldPosterEdited] = useState("");
  const [OverallAccessibilityRating, SetOverallAccessibilityRating] = useState({
    textRating: 0,
    structureRating: 0,
    colorRating: 0,
  });

  const [Posters, SetPosters] = useState([
    {
      name: "string",
      data: "",
      accessibilityScore: {
        textRating: 55,
        structureRating: 55,
        colorRating: 55,
      },
    },
  ]);

  useEffect(() => {
    let uid = localStorage.getItem("uid");
    const dbRef = ref(db);
    get(child(dbRef, `Posters/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let posters = snapshot.val().posters;
          SetPosters(posters);
          sessionStorage.setItem("cached-posters", JSON.stringify(posters));
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
            })
            .catch(() => {
              toast.error("Failed to initiate Posters", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 4000,
              });
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [NewPosterAdded, OldPosterEdited]);

  useEffect(() => {
    let uid = localStorage.getItem("uid");
    const dbRef = ref(db);
    get(child(dbRef, `OverallAccessibilityRating/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          SetOverallAccessibilityRating(snapshot.val());
        } else {
          set(ref(db, "OverallAccessibilityRating/" + uid), {
            textRating: 5,
            structureRating: 5,
            colorRating: 5,
          })
            .then(() => {
              toast.info("Successfully initiated OverallAccessibilityRating", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 4000,
              });
            })
            .catch(() => {
              toast.error("Failed to initiate OverallAccessibilityRating", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 4000,
              });
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [NewPosterAdded, OldPosterEdited]);

  function addPosterCallbackHandler(name) {
    SetNewPosterAdded(name);
  }

  function editPosterCallbackHandler(title) {
    SetOldPosterEdited(title);
  }

  let OverallAccessibilityBarGraphData = new AccessibilityBarGraphData(
    OverallAccessibilityRating
  );

  return (
    <div className="App">
      <NavBar addPosterCallback={addPosterCallbackHandler} />
      <MyPostersSection
        myPosters={Posters}
        editPosterCallback={editPosterCallbackHandler}
      />
      <OverallAccessibilitySection
        chartData={OverallAccessibilityBarGraphData.build}
      />
    </div>
  );
}

export default DashBoard;
