import './LoginPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './../Components/Optimal-Accessibility-Logo.png';
import Cookies from 'universal-cookie';

function Login() {
    const [euid, SetEUID] = useState('');
    const [password, SetPASSWORD] = useState('');
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

        const LoginBody = {euid, password};
        fetch('https://localhost:7267/api/Auth/Login', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "accept" : "application/json"
            },
            body : JSON.stringify(LoginBody)
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
            let cookies = new Cookies();
            cookies.set("jwt", responseJSON.jwt, {sameSite: 'strict', path: "/", expires: new Date(Date.now() + 12096e5)});
            localStorage.setItem('userId', responseJSON.userId);
            navigate(`/dashboard`);
        })
        .catch((err) => {
            alert(err);
            console.error(err);
        });
    }
  
    function handleEUIDChange(event) {
        SetEUID(event.target.value)
    }
  
    function handlePASSWORDChange(event) {
        SetPASSWORD(event.target.value)
    }

    function LinkToRegister(event) {
        event.preventDefault();
        navigate(`/register`);
    }

	return (
		<div id='LoginPageDiv'>
            <div id='LoginLogoBanner'>
                <img src={Logo} alt='logo' />
                <h1>Optimal Accessibility</h1>
            </div>
		    <div id='LoginPageSignInFormDiv'>
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit} id="SignInForm">
                    <input placeholder="EUID" type="text" value={euid} onChange={handleEUIDChange} />
                    <input placeholder="PASSWORD" type="password"  value={password} onChange={handlePASSWORDChange}/>
                    <div id='LoginBtnsSection'>
                        <input type="submit" value="Login" className='PopUpAccountMenuDivbtn'/>
                        <button className='PopUpAccountMenuDivbtn' onClick={LinkToRegister}>Sign Up</button>
                    </div>
                  </form>
            </div>
		</div>
	);
}

export default Login;