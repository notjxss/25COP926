import { useContext, useState } from "react";
import { AuthContext } from "./authcontext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // default form state
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // UI feedback
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState("");

  // update form + clear previous errors
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
    setErrorField("");
  };

  const handleSubmit = async (e) => {
    // stops from refreshing the page when the form is updated
    e.preventDefault();

    // basic validation
    if (!form.username || !form.password) {
      setError("Please fill in all fields.");
      setErrorField("missing");
      return;
    }

    try {
      const res = await fetch("/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
<<<<<<< Updated upstream
        login(data.firstname);
=======
        // reuse login across refreshes
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("firstname", data.firstname);

        // update global auth state
        login(data.firstname, data.user_id);

>>>>>>> Stashed changes
        navigate("/profile");
      } else {
        // backend rejected login (wrong password, unknown username, etc.)
        setError(data.error || "Login failed");
<<<<<<< Updated upstream
        setErrorField(data.error === "Wrong password" ? "password" : "username");
=======
        setErrorField(
          // highlight the field that caused the error
          data.error === "Wrong password" ? "password" : "username"
        );
>>>>>>> Stashed changes
      }
    } catch (err) {
      // network/server unreachable
      console.error("Network error:", err);
      setError("Cannot reach backend");
      setErrorField("server");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="sign-in">
      <h2>Sign In</h2>

      {error && <div className="error-box">{error}</div>}

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className={
          errorField === "missing" && !form.username
            ? "error-input"
            : errorField === "username"
            ? "error-input"
            : ""
        }
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className={
          errorField === "missing" && !form.password
            ? "error-input"
            : errorField === "password"
            ? "error-input"
            : ""
        }
      />

      <button type="submit">Sign In</button>

      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </form>
  );
}
