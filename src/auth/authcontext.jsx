import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

<<<<<<< Updated upstream
  /* run useEffect on page load */
  /* checks if saved user in localStorage (ie already logged in) and sets user state to it */
=======
  // restore login on page load
>>>>>>> Stashed changes
  useEffect(() => {
    const storedId = localStorage.getItem("user_id");
    const storedName = localStorage.getItem("firstname");

    if (storedId && storedName) {
      setUser({
        id: storedId,
        firstname: storedName
      });
    }
  }, []);

  const login = (username) => {
    const u = { username };
    setUser(u);

    localStorage.setItem("firstname", firstname);
    localStorage.setItem("user_id", user_id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("firstname");
    localStorage.removeItem("user_id");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
