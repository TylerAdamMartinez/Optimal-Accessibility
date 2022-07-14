import './RegistrationPage.css';
import { useState } from "react";
import Logo from './Components/Optimal-Accessibility-Logo.png';

function Register() {
    const [EUID, SetEUID] = useState('');
	const [FirstName, SetFirstName] = useState('');
    const [LastName, SetLastName] = useState('');
    const [Password, SetPassword] = useState('');
	const [ConfirmPassword, SetConfirmPassword] = useState('');
  
    function handleSubmit(event) {
        event.preventDefault();

        const RegisterBody = {EUID, FirstName, LastName, Password};
        console.log(JSON.stringify(RegisterBody));
        fetch('https://localhost:7267/api/Auth/RegisterNewUser', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "accept" : "application/json"
            },
            body : JSON.stringify(RegisterBody)
        })
        .then((responce) => responce.json())
        .then((responseJSON) => console.log(responseJSON))
        .catch((err) => console.log(err));
    }
  
    function handleEUIDChange(event) {
        SetEUID(event.target.value)
    }

	function handleFristNameChange(event) {
        SetFirstName(event.target.value)
    }

	function handleLastNameChange(event) {
        SetLastName(event.target.value)
    }

    function handlePasswordChange(event) {
        SetPassword(event.target.value)
    }

	function handleConfirmPasswordChange(event) {
        SetConfirmPassword(event.target.value)
    }

	return (
		<div id='RegistrationPageDiv'>
			<div id='LoginLogoBanner'>
                <img src={Logo} alt='logo' />
                <h1>Optimal Accessibility</h1>
            </div>
		    <div id='RegistrationPageSignInFormDiv'>
                <h2>REGISTER</h2>
                <form onSubmit={handleSubmit} id="SignInForm">
                    <input placeholder="EUID" type="text" value={EUID} onChange={handleEUIDChange} />
					<input placeholder="First Name" type="text" value={FirstName} onChange={handleFristNameChange} />
					<input placeholder="Last Name" type="text" value={LastName} onChange={handleLastNameChange} />
                    <input placeholder="Password" type="password"  value={Password} onChange={handlePasswordChange}/>
					<input placeholder="Confirm Password" type="password"  value={ConfirmPassword} onChange={handleConfirmPasswordChange}/>
                    <input type="submit" value="Submit" className='PopUpAccountMenuDivbtn'/>
                  </form>
            </div>
		</div>
	);
}

export default Register;