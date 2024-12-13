// src/SignIn.js

import React, { useState, useEffect } from "react";
import axios from "../axios"; // Assurez-vous que le chemin vers votre instance Axios est correct

function  SignIn() {
  const [loginUrl, setLoginUrl] = useState(null);

  useEffect(() => {
    axios
      .get("/auth")
      .then((response) => {
        if (response.status === 200) {
          setLoginUrl(response.data.url);
        } else {
          throw new Error("Something went wrong!");
        }
      })
      .catch((error) => console.error("Error fetching login URL:", error));
  }, []);

  return (
    <div>
      {loginUrl != null && <a href={loginUrl}>Sign in with Google</a>}
    </div>
  );
}

export default SignIn;
