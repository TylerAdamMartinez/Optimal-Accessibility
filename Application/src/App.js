import './App.css';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import DashBoard from './Pages/DashBoard.js';
import NotFound404ErrorPage from './Pages/NotFound404ErrorPage';
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
				<Route path="/dashboard/:userId" element={<DashBoard />} />
				<Route path='*' element={<NotFound404ErrorPage />} />
			</Routes>
		</Router>
	);
}

export default App;
