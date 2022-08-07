import "./HomePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Google_G_Logo from "../../Images/Google__G__Logo.svg";
import Logo from "./../../Images/Optimal-Accessibility-Logo.png";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "@mui/icons-material/Menu";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";

function HomePage() {
  const [homePageMode, setHomePageMode] = useState("hero");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let cookies = new Cookies();
    if (
      cookies.get("refreshToken") != null &&
      localStorage.getItem("uid") != null
    ) {
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
        localStorage.setItem("uid", response.user.uid);
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
        localStorage.setItem("uid", response.user.uid);
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
    const authentication = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        let cookies = new Cookies();
        cookies.set("refreshToken", credential.refreshToken, {
          sameSite: "strict",
          path: "/",
          expires: new Date(Date.now() + 12096e5),
        });
        localStorage.setItem("uid", result.user.uid);
        toast.success("Successfully Signed In with Google!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        navigate(`/dashboard`);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        const email = err.customData.email;
        const uid = err.customData.uid;
        const credential = GoogleAuthProvider.credentialFromError(err);
        toast.error(`${err.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
        });
        console.error(errorMessage);
        console.error(errorCode);
        console.error(email);
        console.error(credential.refreshToken);
        console.error(uid);
      });
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

  function validateEmail() {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(regex)) {
      toast.error("invalid email format", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
  }

  function validateConfirmPassword() {
    if (password === "") {
      return;
    } else if (password === confirmPassword) {
      toast.info("passwords match", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    } else {
      toast.error("passwords do not match", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
  }

  function LinkToHero(event) {
    event.preventDefault();
    setMobileMenu(false);
    setHomePageMode("hero");
  }

  function LinkToSignUp(event) {
    event.preventDefault();
    setHomePageMode("signup");
  }

  function LinkToLogin(event) {
    event.preventDefault();
    setHomePageMode("login");
  }

  function mobileMenuHandler(state) {
    if (state) {
      return (
        <div id="mobileMenuDiv">
          <ul>
            <li
              onClick={() => {
                setMobileMenu(!mobileMenu);
                setHomePageMode("login");
              }}
            >
              Login
            </li>
            <li onClick={handleLoginWithGoogleSubmit}>Login with Google</li>
            <li onClick={handleGuestModeSubmit}>Continue as Guest</li>
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  }

  function HomePageModeHandler(state) {
    if (state === "hero") {
      return (
        <div id="heroSection">
          <h1>Optimal Accessibility</h1>
          <p>
            We believe that more than just the web should be accessible. Optimal
            Accessibility is a <strong>free</strong>,{" "}
            <strong>open-source </strong>
            tool to check image/poster accessibility.
          </p>
          <button className="PopUpAccountMenuDivbtn" onClick={LinkToSignUp}>
            Sign Up
          </button>
        </div>
      );
    } else if (state === "signup") {
      return (
        <div id="RegistrationPageSignInFormDiv">
          <h2>SIGN UP</h2>
          <form onSubmit={handleSignUpSubmit} id="SignInForm">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
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
                value="Sign Up"
                className="PopUpAccountMenuDivbtn"
              />
              <button
                id="SignInWithGooglebtn"
                onClick={handleLoginWithGoogleSubmit}
              >
                <img src={Google_G_Logo} alt="Google G Icon" />
                Sign Up with Google
              </button>
            </div>
          </form>
        </div>
      );
    } else if (state === "login") {
      return (
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
              <button className="PopUpAccountMenuDivbtn" onClick={LinkToSignUp}>
                Go Sign Up
              </button>
            </div>
            <div className="GuestLinkContainer">
              <button
                id="SignInWithGooglebtn"
                onClick={handleLoginWithGoogleSubmit}
              >
                <img src={Google_G_Logo} alt="Google G Icon" />
                Login with Google
              </button>
            </div>
          </form>
        </div>
      );
    } else if (state === "mobileMenu") {
      return <></>;
    }
  }

  return (
    <div id="LoginPageDiv">
      <div id="HomeBanner">
        <div id="LogoBanner" onClick={LinkToHero}>
          <img src={Logo} alt="logo" />
          <h1>Optimal Accessibility</h1>
        </div>
        <div id="OptionsBanner">
          <Menu
            fontSize="large"
            className="MenuActivity"
            onClick={() => {
              if (!mobileMenu) {
                setHomePageMode("mobileMenu");
              } else {
                setHomePageMode("hero");
              }
              setMobileMenu(!mobileMenu);
            }}
          />
          <button
            className="PopUpAccountMenuDivbtn ButtonActivity"
            onClick={LinkToLogin}
          >
            Login
          </button>
          <p
            id="GuestModeLink"
            className="ButtonActivity"
            onClick={handleGuestModeSubmit}
          >
            Continue as Guest
          </p>
        </div>
      </div>
      {mobileMenuHandler(mobileMenu)}
      {HomePageModeHandler(homePageMode)}
      <ToastContainer autoClose={4000} limit={3} />
    </div>
  );
}

export default HomePage;
