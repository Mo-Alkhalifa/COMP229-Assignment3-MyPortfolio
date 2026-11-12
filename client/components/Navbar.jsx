
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const signedIn = Boolean(token);

    const handleSignout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/signin");
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <img
                    src="/logo.jpg"
                    alt="Mohammad Logo"
                    style={{ width: "80px" }}
                />
            </Link>

            <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
            <Link to="/about" style={{ marginRight: "15px" }}>About Me</Link>
            <Link to="/projects" style={{ marginRight: "15px" }}>Projects</Link>
            <Link to="/education" style={{ marginRight: "15px" }}>Education</Link>
            <Link to="/services" style={{ marginRight: "15px" }}>Services</Link>
            <Link to="/contact" style={{ marginRight: "15px" }}>Contact Me</Link>

            {!signedIn && (
                <>
                    <Link to="/signin" style={{ marginRight: "15px" }}>
                        Sign In
                    </Link>
                    <Link to="/signup" style={{ marginRight: "15px" }}>
                        Sign Up
                    </Link>
                </>
            )}

            {signedIn && role === "admin" && (
                <Link to="/admin" style={{ marginRight: "15px" }}>
                    Admin
                </Link>
            )}

            {signedIn && (
                <button type="button" onClick={handleSignout}>
                    Sign Out
                </button>
            )}
        </nav>
    );
}
