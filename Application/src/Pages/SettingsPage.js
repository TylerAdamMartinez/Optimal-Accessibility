import NavBar from "../Components/NavBar";
import "./SettingsPage.css";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from 'react-router-dom';

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

    useEffect(() => {
        GetUserData();
    }, []);

    function GetUserData() {
        let errorFlag = false;
        let userId = localStorage.getItem('userId');
        let cookies = new Cookies();
        let Jwt = cookies.get('jwt');

        fetch(`https://localhost:7267/api/Auth/GetUserById/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
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

            console.log(responseJSON);
            SetEUID(responseJSON.euid);
            SetEmail((responseJSON.email === null) ? "No Email Provided" : responseJSON.email);
            SetFirstName(responseJSON.firstName);
            SetLastName(responseJSON.lastName);
            SetMiddleInitial((responseJSON.middleInitial=== null) ? "No middle initial Provided" : responseJSON.middleInitial);
            SetBirthday((responseJSON.birthday === null) ? "2022-06-13" : responseJSON.birthday);
            SetGender("Gender");
            SetClassfication("Classfication");
          })
          .catch((err) => {
            alert(err);
            console.error(err);
          });
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleEUIDChange(event) {
        SetEUID(event.target.value)
    }

    function handleEmailChange(event) {
        SetEmail(event.target.value)
    }

	function handleFristNameChange(event) {
        SetFirstName(event.target.value)
    }

	function handleLastNameChange(event) {
        SetLastName(event.target.value)
    }
    function handleMiddleInitialChange(event) {
        SetMiddleInitial(event.target.value)
    }

	function handleBirthdayChange(event) {
        SetBirthday(event.target.value)
    }

	function handleGenderChange(event) {
        SetGender(event.target.value)
    }

    function handleClassficationChange(event) {
        SetClassfication(event.target.value)
    }

    function resetSettingsHandler(event) {
        event.preventDefault();
        GetUserData();
    }

    function deleteProfileHandler() {
        let ans = window.confirm("Are you sure you want to delete your entire profile and all its data forever");

        if(ans) {
            localStorage.clear();
            let cookies = new Cookies();
            cookies.remove('jwt');
            navigate("/");
        }
    }

    return (
        <>
            <NavBar />
            <div id='MyPostersDiv'>
                <div id="InnerMyPostersDiv">
                    <EditIcon onClick={() => {SetIsEditing(!IsEditing)}} />
                    <PersonRemoveIcon onClick={deleteProfileHandler} />
                    <h2>Settings</h2>
                    {
                        IsEditing ?
                        <form onSubmit={handleSubmit} id="SettingsPageForm" >
                            <input placeholder={euid} type="text" value={euid} onChange={handleEUIDChange} />
                            <input placeholder={Email} type="email" value={Email} onChange={handleEmailChange} />
                            <input placeholder={FirstName} type="text"  value={FirstName} onChange={handleFristNameChange}/>
                            <input placeholder={LastName} type="text"  value={LastName} onChange={handleLastNameChange}/>
                            <input placeholder={MiddleInitial} type="text"  value={MiddleInitial} onChange={handleMiddleInitialChange}/>
                            <input placeholder={Birthday} type="date"  value={Birthday} onChange={handleBirthdayChange}/>
                            <select defaultValue={Gender} name="GenderSelector" id="GenderSelector" onChange={handleGenderChange}>
                                <option value="Other">Other</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <select defaultValue={Classfication} name="ClassficationSelector" id="ClassficationSelector" onChange={handleClassficationChange}>
                                <option value="Unclassified">Unclassified</option>
                                <option value="Freshman">Freshman</option>
                                <option value="Sophomore">Sophomore</option>
                                <option value="Junior">Junior</option>
                                <option value="Senior">Senior</option>
                            </select>
                            <div id='LoginBtnsSection'>
                                <input type="reset" className='PopUpAccountMenuDivbtn' onClick={resetSettingsHandler}/>
                                <input type="submit" value="Save" className='PopUpAccountMenuDivbtn'/>
                            </div>
                        </form>
                        :
                        <div id="SettingsPageInfo">
                            <p>EUID: {euid}</p>
                            <p>EMAIL: {Email}</p>
                            <p>FIRST NAME: {FirstName}</p>
                            <p>LAST NAME: {LastName}</p>
                            <p>MIDDLE INTITIAL: {MiddleInitial}</p>
                            <p>BIRTHDAY: {Birthday}</p>
                            <p>GENDER: {Gender}</p>
                            <p>CLASSFICATION: {Classfication} </p>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Settings;