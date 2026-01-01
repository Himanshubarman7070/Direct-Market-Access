import { NavLink, useLocation } from "react-router-dom";
import "./Home.css";
import { useState } from "react";

export default function Navbar({ search, setSearch }) {
  const [DisplaySearch, setDisplaySearch] = useState(true);
   let location = useLocation();
   const isHomeActive =
    location.pathname === "/" || location.pathname === "/home";

  return (
    <nav className="navbar">
      <div className="logo">Direct Market Access</div>

      <ul className="nav-links">
        <li>
          <NavLink to="home" end onClick={() => setDisplaySearch(true)} className={isHomeActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="chat" onClick={() => setDisplaySearch(false)}>
            Chat
          </NavLink>
        </li>
        <li>
          <NavLink to="orders" onClick={() => setDisplaySearch(false)}>
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="profile" onClick={() => setDisplaySearch(false)}>
            Profile
          </NavLink>
        </li>
      </ul>

      {DisplaySearch && (
        <div className="nav-actions">
          <input
            type="text"
            placeholder="Search crops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="cart-btn">Cart 🛒</button>
        </div>
      )}
    </nav>
  );
}
