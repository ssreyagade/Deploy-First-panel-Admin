import "../styles/style.css";

function Navbar({ userName = "Admin" }) {
  const companyName = "FashionHub";

  return (
    <nav className="navbar">
      {/* Left Spacer */}
      <div className="nav-spacer"></div>

      {/* Center Title */}
      <div className="nav-center">
        <h1>{companyName} Admin</h1>
      </div>

      {/* Right User */}
      <div className="nav-user">
        <span className="username">Hello, {userName}</span>
        <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
      </div>
    </nav>
  );
}

export default Navbar;
