import { useContext, useState } from "react";
import { AuthContext } from "./authcontext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // NEW

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.firstname);
        navigate("/profile");
      } else {
        setError(data.error || "Login failed"); // NEW
      }

    } catch (err) {
      console.error("Network error:", err);
      setError("Cannot reach backend"); // NEW
    }
  };

  return (
    <form onSubmit={handleSubmit} id="sign-in">
      <h2>Sign In</h2>

      {error && (
        <div className="error-box">{error}</div>   // NEW
      )}

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className={error === "Wrong password" ? "error-input" : ""}
      />

      <button type="submit">Sign In</button>

      <p>Don't have an account? <a href="/register">Register here</a></p>
    </form>
  );
}
