import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  const [errorField, setErrorField] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
    setErrorField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
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
        setSuccess("Account created!"); 
        setError("");

        // redirect after 1 second
        setTimeout(() => navigate("/profile"), 1000);

      } else {
        setError(data.error || "Registration failed.");
        setSuccess("");
        setErrorField("server");
      }

    } catch (err) {
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
