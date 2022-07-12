import './App.css';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import DashBoard from './DashBoard.js';
import NotFound404ErrorPage from './NotFound404ErrorPage';
import {
	BrowserRouter as Router,
	Route,
	Routes,
  } from "react-router-dom";

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegistrationPage />} />
				<Route path="/dashboard" element={<DashBoard />} />
				<Route path='*' element={<NotFound404ErrorPage />} />
			</Routes>
		</Router>
	);
}

export default App;
