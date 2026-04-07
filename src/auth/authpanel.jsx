import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/authcontext";

export default function AuthPanel() {
  /* acess user from authcontext */
  const { user } = useContext(AuthContext);

  /* if user is logged in, show welcome message and log out link, otherwise show log in and register links */
  return (
    <div className="auth-panel">
      {user ? (
        <div className="auth-logged-in">
          <span>Hello {user.username}! </span>
          <span className="divider">|</span>
          <Link className="auth-link" to="/logout">Log Out</Link>
        </div>

      ) : (
        <div className="auth-logged-out">
          <Link className="auth-link" to="/login">Log In</Link>
          <span className="divider">|</span>
          <Link className="auth-link" to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}