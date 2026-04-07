import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  /* user is set to variable user, otherwise null */
  const [user, setUser] = useState(null);

  /* run useEffect on page load */
  /* checks if saved user in localStorage (ie already logged in) and sets user state to it */
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);
  /* runs on first render */

  const login = (username) => {
    const u = { username };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}