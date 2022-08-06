import "./LoginPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Google_G_Logo from "../../Images/Google__G__Logo.svg";
import Logo from "./../../Images/Optimal-Accessibility-Logo.png";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import LoginPageBackground from "../../Components/LoginPageBackground";

function Login() {
  const [showRegisterScreen, setShowRegisterScreen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let cookies = new Cookies();
    if (cookies.get("jwt") != null && localStorage.getItem("userId") != null) {
      navigate("/dashboard");
    }
  }, [navigate]);

  function handleLoginSubmit(event) {
    event.preventDefault();
    const id = toast.loading("Please wait...", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    let errorFlag = false;

    const LoginBody = { email, password };
    fetch("https://localhost:7267/api/Auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(LoginBody),
    })
      .then((responce) => {
        if (!responce.ok) {
          errorFlag = true;
        }
        return responce.json();
      })
      .then((responseJSON) => {
        if (errorFlag) {
          throw new Error(`${responseJSON}`);
        }
        let cookies = new Cookies();
        cookies.set("jwt", responseJSON.jwt, {
          sameSite: "strict",
          path: "/",
          expires: new Date(Date.now() + 12096e5),
        });
        localStorage.setItem("userId", responseJSON.userId);
        toast.update(id, {
          render: "Successfully login!",
          type: "success",
          isLoading: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        navigate(`/dashboard`);
      })
      .catch((err) => {
        toast.update(id, {
          render: `${err}`,
          type: "error",
          isLoading: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        console.error(err);
      });
  }

  function handleSignUpSubmit(event) {
    event.preventDefault();
    const id = toast.loading("Please wait...", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    let errorFlag = false;

    const RegisterBody = { email, password };
    fetch("https://localhost:7267/api/Auth/RegisterNewUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(RegisterBody),
    })
      .then((responce) => {
        if (!responce.ok) {
          errorFlag = true;
        }
        return responce.json();
      })
      .then((responseJSON) => {
        if (errorFlag) {
          throw new Error(`${responseJSON}`);
        }
        toast.update(id, {
          render: "Successfully Registerd!",
          type: "success",
          isLoading: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        navigate("/");
      })
      .catch((err) => {
        toast.update(id, {
          render: `${err}`,
          type: "error",
          isLoading: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        console.error(err);
      });
  }

  function handleLoginWithGoogleSubmit(event) {
    event.preventDefault();
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function LinkToRegister(event) {
    event.preventDefault();
    setShowRegisterScreen(true);
  }

  function LinkToLogin(event) {
    event.preventDefault();
    setShowRegisterScreen(false);
  }

  return (
    <div id="LoginPageDiv">
      {/* <LoginPageBackground /> */}
      <div id="LoginLogoBanner">
        <img src={Logo} alt="logo" />
        <h1>Optimal Accessibility</h1>
      </div>
      <div id="heroSection">
        <p>
          We believe that more than just the web should be accessible. Optimal
          Accessibility is a <strong>free</strong>,{" "}
          <strong>open-source </strong>
          tool to check image/poster accessibility.
        </p>
      </div>
      {showRegisterScreen ? (
        <div id="RegistrationPageSignInFormDiv">
          <h2>REGISTER</h2>
          <form onSubmit={handleSignUpSubmit} id="SignInForm">
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div id="LoginBtnsSection">
              <input
                type="submit"
                value="Register"
                className="PopUpAccountMenuDivbtn"
              />
              <button className="PopUpAccountMenuDivbtn" onClick={LinkToLogin}>
                Go login
              </button>
            </div>
            <div className="GuestLinkContainer">
              <button
                id="SignInWithGooglebtn"
                onClick={handleLoginWithGoogleSubmit}
              >
                <img src={Google_G_Logo} alt="Google G Icon" />
                Sign in with Google
              </button>
              <p>or</p>
              <a href="/guest">Continue as Guest</a>
            </div>
          </form>
        </div>
      ) : (
        <div id="LoginPageSignInFormDiv">
          <h2>LOGIN</h2>
          <form onSubmit={handleLoginSubmit} id="SignInForm">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <div id="LoginBtnsSection">
              <input
                type="submit"
                value="Login"
                className="PopUpAccountMenuDivbtn"
              />
              <button
                className="PopUpAccountMenuDivbtn"
                onClick={LinkToRegister}
              >
                Go Sign Up
              </button>
            </div>
            <div className="GuestLinkContainer">
              <button
                id="SignInWithGooglebtn"
                onClick={handleLoginWithGoogleSubmit}
              >
                <img src={Google_G_Logo} alt="Google G Icon" />
                Sign in with Google
              </button>
              <p>or</p>
              <a href="/guest">Continue as Guest</a>
            </div>
          </form>
        </div>
      )}
      <ToastContainer autoClose={1000} limit={3} />
    </div>
  );
}

export default Login;
