import "../styles/style.css";

function Navbar({ userName = "Admin", companyName = "MyCompany" }) {
  return (
    <nav className="navbar">
      {/* Company */}
      <div className="navbar-logo">{companyName} Admin</div>

      {/* User */}
      <div className="navbar-user">
        <span className="navbar-text">Hello, {userName}</span>

        <div className="navbar-avatar">{userName.charAt(0).toUpperCase()}</div>
      </div>
    </nav>
  );
}

export default Navbar;
