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
  ];

  return (
    <div className="layout">
      {/* MENU BUTTON */}
      <button className="menu-btn" onClick={() => setOpen(true)}>
        ☰
      </button>

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h1 className="sidebar-title">Admin Panel</h1>

        {/* ✅ ADD CLASS HERE */}
        <ul className="sidebar-links">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setOpen(false)}
                className={
                  location.pathname === link.path
                    ? "active-link" // ✅ FIXED
                    : "link" // ✅ FIXED
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* CONTENT */}
      <div className="content">{children}</div>
    </div>
  );
}

export default Sidebar;
