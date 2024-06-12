import React from "react";
import { Navigate } from "react-router-dom";
import { loginPath } from "../services/PathUrls";
import { basePath } from "../services/UrlPaths";

function PrivateRoute({ children }) {
  const user = true;

  if (user === null || user === false) {
    return <Navigate to={basePath + loginPath} />;
  }

  return children;
}

export default PrivateRoute;
