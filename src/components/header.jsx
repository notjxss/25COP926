import { Link } from "react-router-dom";
import AuthPanel from "../auth/authpanel";

export default function Header({ onSignIn, onRegister }) {
  return (
    <header>
      <div id="logo">
        <img src="/Images/IMG_9946.PNG" alt="Logo" id="site-logo" />
      </div>

      <div id="auth-buttons">
        <AuthPanel />
      </div>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explore</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/parents">Parents</Link></li>
      </ul>
    </header>
  );
}