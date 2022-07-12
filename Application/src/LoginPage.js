import './LoginPage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Components/Optimal-Accessibility-Logo.png';

function Login() {
    const [EUID, SetEUID] = useState('');
    const [PASSWORD, SetPASSWORD] = useState('');
  
    function handleSubmit(event) {
      alert(`PosterName="${EUID}"\nPosterFileData="${PASSWORD}"`);
      event.preventDefault();
    }
  
    function handleEUIDChange(event) {
        SetEUID(event.target.value)
    }
  
    function handlePASSWORDChange(event) {
        SetPASSWORD(event.target.value)
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
                    <input placeholder="EUID" type="text" value={EUID} onChange={handleEUIDChange} />
                    <input placeholder="PASSWORD" type="password"  value={PASSWORD} onChange={handlePASSWORDChange}/>
                    <div id='LoginBtnsSection'>
                        <Link to="/register"><button className='PopUpAccountMenuDivbtn'>Sign Up</button></Link>
                        <input type="submit" value="Login" className='PopUpAccountMenuDivbtn'/>
                    </div>
                  </form>
            </div>
		</div>
	);
}

export default Login;