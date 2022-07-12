import './NotFound404ErrorPage.css';
import { Link, useLocation } from "react-router-dom";
import Logo from './Components/Optimal-Accessibility-Logo.png';


function NoMatch() {
	let location = useLocation();
  
	return (
		<div id='LoginPageDiv'>
			<div id='LoginLogoBanner'>
				<img src={Logo} alt='logo' />
				<h1>Optimal Accessibility</h1>
			</div>
			<div id='LoginPageSignInFormDiv'>
				<h2>404 Not Found</h2>
				<div id="Content404" >
					<h3>No match for <code>{location.pathname}</code></h3>
					<Link to="/"><button className='PopUpAccountMenuDivbtn'>Return to Home</button></Link>
				</div>
			</div>
		</div>
	);
}

export default  NoMatch;