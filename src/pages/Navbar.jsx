import "../styles/style.css";

function Navbar({ userName = "Admin", setOpen }) {
  const companyName = "FashionHub";

  return (
    <nav className="navbar">
      {/* ✅ MENU BUTTON (ADD HERE) */}
      <button
        className="menu-btn"
        onClick={() => {
          console.log("MENU CLICKED");
          setOpen(true);
        }}
      >
        ☰
      </button>

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
