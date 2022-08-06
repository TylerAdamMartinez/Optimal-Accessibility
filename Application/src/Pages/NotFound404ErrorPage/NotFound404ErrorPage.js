import "./NotFound404ErrorPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./../../Images/Optimal-Accessibility-Logo.png";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function NoMatch() {
  let location = useLocation();
  let navigate = useNavigate();

  const [ButtonName, SetButtonName] = useState("Return Home");
  const [ReturnPath, SetReturnPath] = useState("/");

  useEffect(() => {
    let cookies = new Cookies();
    if (cookies.get("jwt") != null && localStorage.getItem("userId") != null) {
      SetButtonName("Go Back");
      SetReturnPath(-1);
    }
  }, [navigate]);

  return (
    <div id="LoginPageDiv">
      <div id="LoginLogoBanner">
        <img src={Logo} alt="logo" />
        <h1>Optimal Accessibility</h1>
      </div>
      <div id="NotFound404Div">
        <h2>404 Not Found</h2>
        <div id="Content404">
          <h3>
            No match for <code>{location.pathname}</code>
          </h3>
          <button
            onClick={() => navigate(ReturnPath)}
            className="PopUpAccountMenuDivbtn"
          >
            {ButtonName}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoMatch;
