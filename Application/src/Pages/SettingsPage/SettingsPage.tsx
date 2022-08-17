import NavBar from "../../Components/NavBar";
import "./SettingsPage.css";
import { SetStateAction, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Cookies from "universal-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Settings() {
  const navigate = useNavigate();
  const [IsEditing, SetIsEditing] = useState<boolean>(false);
  const [Email, SetEmail] = useState<string>("Email");
  const [FirstName, SetFirstName] = useState<string>("Frist Name");
  const [LastName, SetLastName] = useState<string>("Last Name");
  const [Birthday, SetBirthday] = useState<string>("Birthday");

  useEffect(() => {
    GetUserData();
  }, []);

  function GetUserData() {
    // let uid = localStorage.getItem("uid");
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    // let userId = localStorage.getItem("userId");

    toast.info("sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });

    // const firstName = FirstName;
    // const lastName = LastName;
    // const email = Email;
    // const birthday = Birthday;

    // const updateUserBody = {
    //   firstName,
    //   lastName,
    //   email,
    //   birthday,
    // };
  }

  function handleEmailChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    SetEmail(event.target.value);
  }

  function handleFristNameChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    SetFirstName(event.target.value);
  }

  function handleLastNameChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    SetLastName(event.target.value);
  }

  function handleBirthdayChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    SetBirthday(event.target.value);
  }

  function resetSettingsHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    GetUserData();
  }

  function deleteProfileHandler() {
    let ans = window.confirm(
      "Are you sure you want to delete your entire profile and all its data forever"
    );

    if (ans) {
      // let uid = localStorage.getItem("userId");
      let cookies = new Cookies();

      toast.info("sent", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });

      localStorage.clear();
      sessionStorage.clear();
      cookies.remove("refreshToken");
      navigate("/");
    }
  }

  function linkToDashboard() {
    navigate("/dashboard");
  }

  function handleAddPosterCallback(_arg0: string): void {}

  return (
    <>
      <NavBar addPosterCallback={handleAddPosterCallback} />
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
