
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Sign in failed");
            }

            if (!data.token) {
                throw new Error("No authentication token received");
            }

            localStorage.setItem("token", data.token);

            // Check administrator access using the protected API
            const adminResponse = await fetch("http://localhost:3000/api/users", {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (adminResponse.ok) {
                localStorage.setItem("role", "admin");
                navigate("/admin");
            } else if (adminResponse.status === 403) {
                localStorage.setItem("role", "user");
                navigate("/");
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                throw new Error("Could not verify account permissions");
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <h1>Sign In</h1>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br />

                <label>Password:</label>
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />

                <button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
