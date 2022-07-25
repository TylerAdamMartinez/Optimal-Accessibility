import './RegistrationPage.css';
import { useEffect, useState } from "react";
import Logo from './../Components/Optimal-Accessibility-Logo.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Register() {
    const [EUID, SetEUID] = useState('');
	const [FirstName, SetFirstName] = useState('');
    const [LastName, SetLastName] = useState('');
    const [Password, SetPassword] = useState('');
	const [ConfirmPassword, SetConfirmPassword] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
		let cookies = new Cookies();
		if (cookies.get('jwt') != null && localStorage.getItem('userId') != null) {
			navigate("/dashboard");
		}
	}, [navigate]);

    function handleSubmit(event) {
        event.preventDefault();
        let errorFlag = false;

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
        .then((responce) => { 
            if (!responce.ok) { 
                errorFlag = true;
            }
            return responce.json();
        })
        .then((responseJSON) => {
            if(errorFlag) {
                throw new Error(`${responseJSON}`);
            }
            navigate("/");
        })
        .catch((err) => console.error(err));
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

    function LinkToLogin(event) {
        event.preventDefault();
        navigate(`/login`);
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
                    <div id='LoginBtnsSection'>
                        <input type="submit" value="Register" className='PopUpAccountMenuDivbtn'/>
                        <button className='PopUpAccountMenuDivbtn' onClick={LinkToLogin}>Back to Login</button>
                    </div>
                  </form>
            </div>
		</div>
	);
}

export default Register;