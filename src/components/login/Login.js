import React from "react";
import { authorize } from "../../services/spotify-service";
import Welcome from '../Welcome/Welcome';

import "./Login.css";

const Login = ({ onLoginClick }) => (
  <div>
    <Welcome/>
    <button className="btn btn-primary btn login-btn" onClick={authorize}>
      Authorize with Spotify
    </button>
  </div>
);

export default Login;
