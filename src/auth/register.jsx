import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // form state for controlled inputs
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  // UI feedback states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  const [errorField, setErrorField] = useState("");

  const navigate = useNavigate();

  // update form + clear previous messages
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // reset UI feedback when user edits the form
    setError("");
    setSuccess("");
    setErrorField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic client‑side validation, produces error if any required field is empty
    if (!form.username || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      setErrorField("missing");
      return;
    }

    try {
      const res = await fetch("/backend/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
<<<<<<< Updated upstream
        setSuccess("Account created!"); // NEW
=======
        // backend accepted registration
        setSuccess("Account created!"); 
>>>>>>> Stashed changes
        setError("");

        // redirect after 1 second
        setTimeout(() => navigate("/profile"), 1000);

      } else {
        // backend returned an error (duplicate username, invalid email, etc.)
        setError(data.error || "Registration failed.");
        setSuccess("");
        setErrorField("server");
      }

    } catch (err) {
      // network or server unreachable
      setError("Cannot reach backend.");
      setSuccess("");
      setErrorField("server");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="register">
      <h2>Create an Account</h2>

      {error && <div className="error-box">{error}</div>}
      {success && <div className="success-box">{success}</div>}

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className={errorField === "missing" && !form.username ? "error-input" : ""}
      />

      <input
        name="firstname"
        value={form.firstname}
        onChange={handleChange}
        placeholder="First Name"
      />

      <input
        name="lastname"
        value={form.lastname}
        onChange={handleChange}
        placeholder="Last Name"
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className={errorField === "missing" && !form.email ? "error-input" : ""}
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className={errorField === "missing" && !form.password ? "error-input" : ""}
      />

      <button type="submit">Register</button>
    </form>
  );
}
