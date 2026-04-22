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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/backend/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
        alert("Account created!");
        navigate("/profile");
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="register">
      <h2>Create an Account</h2>

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
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
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <button type="submit">Register</button>
    </form>
  );
}