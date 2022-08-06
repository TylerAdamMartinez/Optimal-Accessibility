import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

function PrivateRoutes() {
  let auth = false;
  let cookies = new Cookies();

  if (
    cookies.get("refreshToken") != null &&
    localStorage.getItem("uid") != null
  ) {
    auth = true;
  }
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
