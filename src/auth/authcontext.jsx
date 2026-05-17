import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore login on page load
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

  // Called after successful login
  const login = (firstname, user_id) => {
    const u = { firstname, id: user_id };
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
