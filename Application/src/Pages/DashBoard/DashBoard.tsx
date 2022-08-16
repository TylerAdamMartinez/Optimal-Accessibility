import "./../../App.css";
import NavBar from "../../Components/NavBar";
import MyPostersSection from "./MyPostersSection";
import OverallAccessibilitySection from "./OverallAccessibilitySection";
import { SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AccessibilityBarGraphData from "../../Components/AccessibilityBarGraphData";
import { db } from "../../FirebaseConfig";
import { ref, child, get, set } from "firebase/database";
import { poster, chartData, accessibilityScore } from "../../oaTypes";

export var GlobalPosters: Array<poster>;

function DashBoard() {
  const [NewPosterAdded, SetNewPosterAdded] = useState<string>("");
  const [OldPosterEdited, SetOldPosterEdited] = useState<string>("");
  const [OverallAccessibilityRating, SetOverallAccessibilityRating] =
    useState<accessibilityScore>({
      textRating: 0,
      structureRating: 0,
      colorRating: 0,
    });

  const [Posters, SetPosters] = useState<Array<poster> | null>(null);

  useEffect(() => {
    let uid = localStorage.getItem("uid");
    const dbRef = ref(db);
    get(child(dbRef, `Posters/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let posters = snapshot.val().posters;
          SetPosters(posters);
          GlobalPosters = posters;
          sessionStorage.setItem("cached-posters", "true");
        } else {
          set(ref(db, "Posters/" + uid), {
            posters: [],
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

  function addPosterCallbackHandler(name: SetStateAction<string>) {
    SetNewPosterAdded(name);
  }

  function editPosterCallbackHandler(title: SetStateAction<string>) {
    SetOldPosterEdited(title);
  }

  let OverallAccessibilityBarGraphData: AccessibilityBarGraphData =
    new AccessibilityBarGraphData(OverallAccessibilityRating);

  let chartData: chartData = OverallAccessibilityBarGraphData.build;

  return (
    <div className="App">
      <NavBar
        addPosterCallback={addPosterCallbackHandler}
        IsGuestMode={false}
      />
      <MyPostersSection
        myPosters={Posters}
        editPosterCallback={editPosterCallbackHandler}
      />
      <OverallAccessibilitySection data={chartData} />
    </div>
  );
}

export default DashBoard;
