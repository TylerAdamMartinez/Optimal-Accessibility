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
      alert(`PosterName="${EUID}"\nPosterFileData="${Password}"`);
      event.preventDefault();
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