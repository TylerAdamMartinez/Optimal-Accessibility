import NavBar from "../Components/NavBar";
import "./SettingsPage.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Settings() {
  const navigate = useNavigate();
  const [IsEditing, SetIsEditing] = useState(false);
  const [euid, SetEUID] = useState("EUID");
  const [Email, SetEmail] = useState("Email");
  const [FirstName, SetFirstName] = useState("Frist Name");
  const [LastName, SetLastName] = useState("Last Name");
  const [MiddleInitial, SetMiddleInitial] = useState("Middle Intitial");
  const [Birthday, SetBirthday] = useState("Birthday");
  const [Gender, SetGender] = useState("Gender");
  const [Classfication, SetClassfication] = useState("Classfication");

  const GenderArray = ["Other", "Male", "Female"];
  const ClassficationArray = ["Unclassified", "Freshman", "Sophomore", "Junior", "Senior"];

  useEffect(() => {
    GetUserData();
  }, []);

  function GetUserData() {
    let errorFlag = false;
    let userId = localStorage.getItem("userId");
    let cookies = new Cookies();
    let Jwt = cookies.get("jwt");

    fetch(`https://localhost:7267/api/Auth/GetUserById/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `bearer ${Jwt}`,
      },
    })
      .then((responce) => {
        if (!responce.ok) {
          errorFlag = true;
        }

        return responce.json();
      })
      .then((responseJSON) => {
        if (errorFlag) {
          throw new Error(`${responseJSON}`);
        }

        SetEUID(responseJSON.euid);
        SetEmail(responseJSON.email === null ? "No Email Provided" : responseJSON.email);
        SetFirstName(responseJSON.firstName);
        SetLastName(responseJSON.lastName);
        SetMiddleInitial(
          responseJSON.middleInitial === null
            ? "No middle initial Provided"
            : responseJSON.middleInitial
        );
        SetBirthday(responseJSON.birthday === null ? "2022-06-13" : responseJSON.birthday);
        SetGender(GenderArray[responseJSON.gender]);
        SetClassfication(ClassficationArray[responseJSON.classfication]);
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        console.error(err);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let errorFlag = false;
    let userId = localStorage.getItem("userId");
    let cookies = new Cookies();
    let Jwt = cookies.get("jwt");

    toast.info("sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });

    const firstName = FirstName;
    const lastName = LastName;
    const email = Email;
    const middleInitial = MiddleInitial;
    const birthday = Birthday;
    const gender = GenderArray.findIndex((element) => {
      return element === Gender;
    });
    const classfication = ClassficationArray.findIndex((element) => {
      return element === Classfication;
    });

    const updateUserBody = {
      firstName,
      lastName,
      email,
      middleInitial,
      birthday,
      gender,
      classfication,
    };
    fetch(`https://localhost:7267/api/Auth/UpdateUserById/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `bearer ${Jwt}`,
      },
      body: JSON.stringify(updateUserBody),
    })
      .then((responce) => {
        if (!responce.ok) {
          errorFlag = true;
        } else {
          toast.success("User was successfully updated!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
        }
        return responce.json();
      })
      .then((responseJSON) => {
        if (errorFlag) {
          throw new Error(`${responseJSON}`);
        }
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        console.error(err);
      });
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
  function handleMiddleInitialChange(event) {
    SetMiddleInitial(event.target.value);
  }

  function handleBirthdayChange(event) {
    SetBirthday(event.target.value);
  }

  function handleGenderChange(event) {
    SetGender(event.target.value);
  }

  function handleClassficationChange(event) {
    SetClassfication(event.target.value);
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
      let errorFlag = false;
      let userId = localStorage.getItem("userId");
      let cookies = new Cookies();
      let Jwt = cookies.get("jwt");

      toast.info("sent", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });

      fetch(`https://localhost:7267/api/Auth/DeleteUserById/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `bearer ${Jwt}`,
        },
      })
        .then((responce) => {
          if (!responce.ok) {
            errorFlag = true;
          } else {
            toast.success("User was successfully deleted!", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 2000,
            });
          }
          return responce.json();
        })
        .then((responseJSON) => {
          if (errorFlag) {
            throw new Error(`${responseJSON}`);
          }
        })
        .catch((err) => {
          toast.error(`${err}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
          console.error(err);
        });

      localStorage.clear();
      cookies.remove("jwt");
      navigate("/");
    }
  }

  return (
    <>
      <NavBar />
      <div id="MyPostersDiv">
        <div id="InnerMyPostersDiv">
          <h2>Settings</h2>
          {IsEditing ? (
            <>
              <div id="SettingsPageOnEditInfo">
                <p>
                  <span>EUID:</span>
                  {euid}
                </p>
              </div>
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
                  <label>Middle Initial: </label>
                  <input
                    placeholder={MiddleInitial}
                    type="text"
                    value={MiddleInitial}
                    onChange={handleMiddleInitialChange}
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
                <div className="SettingsPageEditItem">
                  <label>Gender: </label>
                  <select
                    defaultValue={GenderArray.findIndex((element) => {
                      return element === Gender;
                    })}
                    name="GenderSelector"
                    id="GenderSelector"
                    onChange={handleGenderChange}
                  >
                    <option value={0}>Other</option>
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                  </select>
                </div>
                <div className="SettingsPageEditItem">
                  <label>Classfication: </label>
                  <select
                    defaultValue={ClassficationArray.findIndex((element) => {
                      return element === Classfication;
                    })}
                    name="ClassficationSelector"
                    id="ClassficationSelector"
                    onChange={handleClassficationChange}
                  >
                    <option value={0}>Unclassified</option>
                    <option value={1}>Freshman</option>
                    <option value={2}>Sophomore</option>
                    <option value={3}>Junior</option>
                    <option value={4}>Senior</option>
                  </select>
                </div>
                <div id="LoginBtnsSection">
                  <input
                    type="reset"
                    className="PopUpAccountMenuDivbtn"
                    onClick={resetSettingsHandler}
                  />
                  <input type="submit" value="Save" className="PopUpAccountMenuDivbtn" />
                </div>
              </form>
              <div className="IconContainer">
                <EditIcon
                  className="IconHover"
                  fontSize="large"
                  onClick={() => {
                    SetIsEditing(!IsEditing);
                  }}
                />
                <PersonRemoveIcon
                  className="IconHover"
                  fontSize="large"
                  onClick={deleteProfileHandler}
                />
              </div>
            </>
          ) : (
            <>
              <div id="SettingsPageInfo">
                <p>
                  <span>EUID:</span>
                  {euid}
                </p>
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
                  <span>Middle Initial:</span>
                  {MiddleInitial}
                </p>
                <p>
                  <span>Birthday:</span>
                  {Birthday}
                </p>
                <p>
                  <span>Gender:</span>
                  {Gender}
                </p>
                <p>
                  <span>Classification:</span>
                  {Classfication}
                </p>
              </div>
              <div className="IconContainer">
                <EditIcon
                  className="IconHover"
                  fontSize="large"
                  onClick={() => {
                    SetIsEditing(!IsEditing);
                  }}
                />
                <PersonRemoveIcon
                  className="IconHover"
                  fontSize="large"
                  onClick={deleteProfileHandler}
                />
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
