import ManageQualifications from "./ManageQualifications";
import ManageProjects from "./ManageProjects";
import ManageContacts from "./ManageContacts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/signin", { replace: true });
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/users", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    navigate("/", { replace: true });
                    return;
                }

                setAuthorized(true);
            } catch {
                navigate("/", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, [navigate]);

    if (loading) {
        return <div className="page"><p>Checking administrator access...</p></div>;
    }

    if (!authorized) {
        return null;
    }

    return (
        <div className="page">
            <ManageProjects />
            <ManageQualifications />
            <ManageContacts />
            <h1>Administrator Dashboard</h1>
            <p>Administrator access verified successfully.</p>
            <p>Project, qualification, and contact management will be added here.</p>
        </div>
    );
}
