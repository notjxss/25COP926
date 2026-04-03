import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explore</Link></li>
        <li><Link to="/profile">Account</Link></li>
        <li><Link to="/parents">Parents</Link></li>
      </ul>
      <p>2026 F226279 Coursework</p>
    </footer>
  );
}