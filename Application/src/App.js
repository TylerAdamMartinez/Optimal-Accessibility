import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import DashBoard from "./Pages/DashBoard/DashBoard.js";
import NotFound404ErrorPage from "./Pages/NotFound404ErrorPage/NotFound404ErrorPage";
import PrivateRoutes from "./Components/PrivateRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import GuestDashboard from "./Pages/DashBoard/GuestDashboard";
import { analytics } from "./FirebaseConfig";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guest" element={<GuestDashboard />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFound404ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
