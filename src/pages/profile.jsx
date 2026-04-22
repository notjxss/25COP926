import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/authcontext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null; 
  return (
    <main>
      <h1>Welcome back, {user.username}</h1>
      {/* Your account content here */}
    </main>
  );
}