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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* use asynch to allow login function to pause without blocking any of the site */
  const handleSubmit = async (e) => {
    /* stop form from refreshing page on submit */
    e.preventDefault();


    /* send login request to server with form data, if successful store user and redirect to profile page, otherwise show error message */
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      /* send form data as JSON */
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    /* format response as JSON */
    const data = await res.json();

    /* if flask returns 400/401, show error, otherwise user is logged in and redirected */
    if (res.ok) {
      login(data.firstname);   // store first name
      navigate("/profile");    // redirect to account page
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="sign-in">
      <h2>Sign In</h2>

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
      />

      <button type="submit">Sign In</button>
    </form>
  );
}