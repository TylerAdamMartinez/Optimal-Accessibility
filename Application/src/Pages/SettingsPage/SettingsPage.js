import NavBar from "../../Components/NavBar";
import "./SettingsPage.css";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Cookies from "universal-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Settings() {
  const navigate = useNavigate();
  const [IsEditing, SetIsEditing] = useState(false);
  const [Email, SetEmail] = useState("Email");
  const [FirstName, SetFirstName] = useState("Frist Name");
  const [LastName, SetLastName] = useState("Last Name");
  const [Birthday, SetBirthday] = useState("Birthday");

  useEffect(() => {
    GetUserData();
  }, []);

  function GetUserData() {
    let uid = localStorage.getItem("uid");

    // fetch(`https://localhost:7267/api/Auth/GetUserById/${userId}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     accept: "application/json",
    //     Authorization: `bearer ${Jwt}`,
    //   },
    // })
    //   .then((responce) => {
    //     if (!responce.ok) {
    //       errorFlag = true;
    //     }

    //     return responce.json();
    //   })
    //   .then((responseJSON) => {
    //     if (errorFlag) {
    //       throw new Error(`${responseJSON}`);
    //     }

    //     SetEUID(responseJSON.euid);
    //     SetEmail(
    //       responseJSON.email === null ? "No Email Provided" : responseJSON.email
    //     );
    //     SetFirstName(responseJSON.firstName);
    //     SetLastName(responseJSON.lastName);
    //     SetMiddleInitial(
    //       responseJSON.middleInitial === null
    //         ? "No middle initial Provided"
    //         : responseJSON.middleInitial
    //     );
    //     SetBirthday(
    //       responseJSON.birthday === null ? "2022-06-13" : responseJSON.birthday
    //     );
    //     SetGender(GenderArray[responseJSON.gender]);
    //     SetClassfication(ClassficationArray[responseJSON.classfication]);
    //   })
    //   .catch((err) => {
    //     toast.error(`${err}`, {
    //       position: toast.POSITION.BOTTOM_RIGHT,
    //       autoClose: 2000,
    //     });
    //     console.error(err);
    //   });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let userId = localStorage.getItem("userId");

    toast.info("sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });

    const firstName = FirstName;
    const lastName = LastName;
    const email = Email;
    const birthday = Birthday;

    const updateUserBody = {
      firstName,
      lastName,
      email,
      birthday,
    };
    // fetch(`https://localhost:7267/api/Auth/UpdateUserById/${userId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     accept: "application/json",
    //     Authorization: `bearer ${Jwt}`,
    //   },
    //   body: JSON.stringify(updateUserBody),
    // })
    //   .then((responce) => {
    //     if (!responce.ok) {
    //       errorFlag = true;
    //     } else {
    //       toast.success("User was successfully updated!", {
    //         position: toast.POSITION.BOTTOM_RIGHT,
    //         autoClose: 2000,
    //       });
    //     }
    //     return responce.json();
    //   })
    //   .then((responseJSON) => {
    //     if (errorFlag) {
    //       throw new Error(`${responseJSON}`);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(`${err}`, {
    //       position: toast.POSITION.BOTTOM_RIGHT,
    //       autoClose: 2000,
    //     });
    //     console.error(err);
    //   });
  }

  function handleEmailChange(event) {
    SetEmail(event.target.value);
  }

  function handleFristNameChange(event) {
    SetFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    SetLastName(event.target.value);
  }

  function handleBirthdayChange(event) {
    SetBirthday(event.target.value);
  }

  function resetSettingsHandler(event) {
    event.preventDefault();
    GetUserData();
  }

  function deleteProfileHandler() {
    let ans = window.confirm(
      "Are you sure you want to delete your entire profile and all its data forever"
    );

    if (ans) {
      let uid = localStorage.getItem("userId");
      let cookies = new Cookies();

      toast.info("sent", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });

      // fetch(`https://localhost:7267/api/Auth/DeleteUserById/${userId}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //     accept: "application/json",
      //     Authorization: `bearer ${Jwt}`,
      //   },
      // })
      //   .then((responce) => {
      //     if (!responce.ok) {
      //       errorFlag = true;
      //     } else {
      //       toast.success("User was successfully deleted!", {
      //         position: toast.POSITION.BOTTOM_RIGHT,
      //         autoClose: 2000,
      //       });
      //     }
      //     return responce.json();
      //   })
      //   .then((responseJSON) => {
      //     if (errorFlag) {
      //       throw new Error(`${responseJSON}`);
      //     }
      //   })
      //   .catch((err) => {
      //     toast.error(`${err}`, {
      //       position: toast.POSITION.BOTTOM_RIGHT,
      //       autoClose: 2000,
      //     });
      //     console.error(err);
      //   });

      localStorage.clear();
      sessionStorage.clear();
      cookies.remove("refreshToken");
      navigate("/");
    }
  }

  function linkToDashboard() {
    navigate("/dashboard");
  }

  return (
    <>
      <NavBar />
      <div id="MyPostersDiv">
        <div id="InnerMyPostersDiv">
          <div id="SettingsPageHeaderDiv">
            <h2>Settings</h2>
            <div className="tooltip">
              <ArrowBackIcon
                fontSize="large"
                onClick={linkToDashboard}
                id="SettingsPageHeaderReturnBtn"
              />
              <span className="tooltiptext">return back to dashboard</span>
            </div>
          </div>
          {IsEditing ? (
            <>
              <form onSubmit={handleSubmit} id="SettingsPageForm">
                <div className="SettingsPageEditItem">
                  <label>Email: </label>
                  <input
                    placeholder={Email}
                    type="email"
                    value={Email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="SettingsPageEditItem">
                  <label>Frist Name: </label>
                  <input
                    placeholder={FirstName}
                    type="text"
                    value={FirstName}
                    onChange={handleFristNameChange}
                  />
                </div>
                <div className="SettingsPageEditItem">
                  <label>Last Name: </label>
                  <input
                    placeholder={LastName}
                    type="text"
                    value={LastName}
                    onChange={handleLastNameChange}
                  />
                </div>
                <div className="SettingsPageEditItem">
                  <label>Birthday: </label>
                  <input
                    placeholder={Birthday}
                    type="date"
                    value={Birthday}
                    onChange={handleBirthdayChange}
                  />
                </div>
                <div id="LoginBtnsSection">
                  <input
                    type="reset"
                    className="PopUpAccountMenuDivbtn"
                    onClick={resetSettingsHandler}
                  />
                  <input
                    type="submit"
                    value="Save"
                    className="PopUpAccountMenuDivbtn"
                  />
                </div>
              </form>
              <div className="IconContainer">
                <div className="tooltip">
                  <EditIcon
                    className="IconHover"
                    fontSize="large"
                    onClick={() => {
                      SetIsEditing(!IsEditing);
                    }}
                  />
                  <span className="tooltiptext">Close Editing</span>
                </div>
                <div className="tooltip">
                  <PersonRemoveIcon
                    className="IconHover"
                    fontSize="large"
                    onClick={deleteProfileHandler}
                  />
                  <span className="tooltiptext">Delete Account</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div id="SettingsPageInfo">
                <p>
                  <span>Email:</span>
                  {Email}
                </p>
                <p>
                  <span>First Name:</span>
                  {FirstName}
                </p>
                <p>
                  <span>Last Name:</span>
                  {LastName}
                </p>
                <p>
                  <span>Birthday:</span>
                  {Birthday}
                </p>
              </div>
              <div className="IconContainer">
                <div className="tooltip">
                  <EditIcon
                    className="IconHover"
                    fontSize="large"
                    onClick={() => {
                      SetIsEditing(!IsEditing);
                    }}
                  />
                  <span className="tooltiptext">Edit profile</span>
                </div>
                <div className="tooltip">
                  <PersonRemoveIcon
                    className="IconHover"
                    fontSize="large"
                    onClick={deleteProfileHandler}
                  />
                  <span className="tooltiptext">Delete Account</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Settings;
