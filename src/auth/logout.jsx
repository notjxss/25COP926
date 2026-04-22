import { useEffect, useContext } from "react";
import { AuthContext } from "./authcontext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();       // clear user from context
    navigate("/");  // redirect to home
  }, []);

  return null; // nothing to show
}