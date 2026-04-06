import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/style.css";

function Sidebar({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Employees", path: "/employees" },
    { name: "Inventory", path: "/inventory" },
    { name: "Orders", path: "/orders" },
    { name: "Invoice", path: "/invoice" },
    { name: "Logout", path: "/logout" },
  ];

  return (
    <div className="sidebar-container">
      {/* MOBILE BUTTON */}
      <button className="menu-btn" onClick={() => setOpen(true)}>
        Menu
      </button>

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h1 className="sidebar-title">Admin Panel</h1>

        <ul className="sidebar-links">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setOpen(false)}
                className={
                  location.pathname === link.path ? "active-link" : "link"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">© 2026 Fashion Hub</div>
      </aside>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* CONTENT */}
      <div className="sidebar-content">{children}</div>
    </div>
  );
}

export default Sidebar;
