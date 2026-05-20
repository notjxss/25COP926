import { NavLink } from "react-router-dom";
import AuthPanel from "../auth/authpanel";
import logo from "../Images/logo.PNG";


export default function Header({ onSignIn, onRegister }) {
  return (
    <header>
      <img src={logo} alt="Logo" id="site-logo" />

      <div id="auth-buttons">
        <AuthPanel />
      </div>

      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/explore">Explore</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/parents">Parents</NavLink></li>
      </ul>
    </header>
  );
}