import "../styles/style.css";

function Navbar({ userName = "Shreya", companyName = "Fashion Hub", setOpen }) {
  return (
    <nav className="navbar">
      {/* MENU BUTTON (MOBILE) */}
      <button className="menu-btn" onClick={() => setOpen(true)}>
        ☰
      </button>

      {/* Company */}
      <div className="navbar-logo">{companyName}</div>

      {/* User */}
      <div className="navbar-user">
        <span className="navbar-text">Hello, {userName}</span>
        <div className="navbar-avatar">{userName.charAt(0).toUpperCase()}</div>
      </div>
    </nav>
  );
}

export default Navbar;
