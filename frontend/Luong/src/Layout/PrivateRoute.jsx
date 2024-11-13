import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
export default function PrivateRoute() {
  const [isHasToken, setIsHasToken] = useState(() => {
    const tokenObject = localStorage.getItem("token");
    if (tokenObject) {
      const tokenJson = JSON.parse(tokenObject);
      const now = new Date().getTime();
      if (tokenJson.expireDate > now) {
        return tokenJson.token;
      } else {
        localStorage.removeItem("token");
        return null;
      }
    }
    return null;
  });

  return isHasToken !== null ? <Outlet /> : <Navigate to="/" />;
}
