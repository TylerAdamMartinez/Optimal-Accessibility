import './App.css';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import DashBoard from './Pages/DashBoard/DashBoard.js';
import NotFound404ErrorPage from './Pages/NotFound404ErrorPage';
import PrivateRoutes from './Components/PrivateRoutes';
import {
	BrowserRouter as Router,
	Route,
	Routes,
  } from "react-router-dom";
import SettingsPage from './Pages/SettingsPage';

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegistrationPage />} />
				<Route element={<PrivateRoutes />} >
					<Route path="/dashboard" element={<DashBoard />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Route>
				<Route path='*' element={<NotFound404ErrorPage />} />
			</Routes>
		</Router>
	);
}

export default App;
