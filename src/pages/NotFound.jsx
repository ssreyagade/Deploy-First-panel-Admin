import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>

      <h2 className="notfound-title">Page Not Found</h2>

      <p className="notfound-text">
        The page you are looking for does not exist.
      </p>

      <button onClick={() => navigate("/")} className="notfound-btn">
        Go to Dashboard
      </button>
    </div>
  );
}

export default NotFound;
