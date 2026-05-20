import { useEffect, useContext } from "react";
import { AuthContext } from "./authcontext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // clear user from context and local storage
    logout();       
    // redirect to home page
    navigate("/");  
  }, []);

  return null; 
}