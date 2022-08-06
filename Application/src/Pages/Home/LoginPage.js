import "./LoginPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Google_G_Logo from "../../Images/Google__G__Logo.svg";
import Logo from "./../../Images/Optimal-Accessibility-Logo.png";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
//import LoginPageBackground from "../../Components/LoginPageBackground";

function Login() {
  const [showRegisterScreen, setShowRegisterScreen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let cookies = new Cookies();
    if (cookies.get("refreshToken") != null && localStorage.getItem("uid") != null) {
      navigate("/dashboard");
    }
  }, [navigate]);

  function handleLoginSubmit(event) {
    event.preventDefault();
    toast.info("Login Request Sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
      const authentication = getAuth();
      signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        let cookies = new Cookies();
        cookies.set("refreshToken", response._tokenResponse.refreshToken, {
          sameSite: "strict",
          path: "/",
          expires: new Date(Date.now() + 12096e5),
        });
        console.log("response", response);
        localStorage.setItem('uid', response.user.uid)
        toast.success("Successfully login!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        navigate(`/dashboard`);
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        console.error(err);
      });
  }

  function handleSignUpSubmit(event) {
    event.preventDefault();
    toast.info("Registeration Request Sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password)
    .then((response) => {
      let cookies = new Cookies();
      cookies.set("refreshToken", response._tokenResponse.refreshToken, {
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 12096e5),
      });
      console.log("response", response);
      localStorage.setItem('uid', response.user.uid)
      toast.success("Successfully Registered!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
      navigate(`/dashboard`);
    })
      .catch((err) => {
        toast.error(`${err}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        console.error(err);
      });
  }

  function handleLoginWithGoogleSubmit(event) {
    event.preventDefault();
  }

  function handleGuestModeSubmit(event) {
    event.preventDefault();
    toast.info("Anonymous sign in request sent", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    const authentication = getAuth();
    signInAnonymously(authentication)
    .then(() => {
      toast.success("Successfully Signed in Anonymously!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
      navigate(`/guest`);
    })
      .catch((err) => {
        toast.error("Anonymously Sign In Failed", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        console.error(err);
      });
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

  function validateConfirmPassword(event) {
    if(password === "") {
      return;
    }
    else if(password === confirmPassword) {
      toast.info("passwords match", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
    else {
      toast.error("passwords do not match", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
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
          <form onSubmit={handleSignUpSubmit}  id="SignInForm">
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
              onBlur={validateConfirmPassword}
            />
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={validateConfirmPassword}
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
              <p className="GuestModeLink" onClick={handleGuestModeSubmit}>Continue as Guest</p>
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
              <p className="GuestModeLink" onClick={handleGuestModeSubmit}>Continue as Guest</p>
            </div>
          </form>
        </div>
      )}
      <ToastContainer autoClose={1000} limit={3} />
    </div>
  );
}

export default Login;
