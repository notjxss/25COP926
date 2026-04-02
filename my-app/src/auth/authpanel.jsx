import LoginForm from "./loginform";
import RegisterForm from "./registerform";

export default function AuthPanel({ mode, setMode }) {
  if (mode === "login") {
    return <LoginForm onBack={() => setMode("none")} />;
  }

  if (mode === "register") {
    return <RegisterForm onBack={() => setMode("none")} />;
  }

  return null; // nothing visible
}