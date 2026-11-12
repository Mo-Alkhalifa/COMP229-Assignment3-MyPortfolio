
import { useEffect, useState } from "react";

export default function Education() {
    const [qualifications, setQualifications] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/qualifications")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load qualifications");
                }
                return response.json();
            })
            .then((data) => setQualifications(data))
            .catch(() => setError("Could not load education from MongoDB."));
    }, []);

    return (
        <div className="page">
            <h1>Education</h1>

            {error && <p>{error}</p>}

            {qualifications.map((qualification) => (
                <div key={qualification._id}>
                    <h2>{qualification.institution}</h2>

                    <p>{qualification.title}</p>
                    <p>{qualification.period}</p>
                    <p>{qualification.status}</p>

                    <p>{qualification.description}</p>

                    {qualification.areasOfStudy?.length > 0 && (
                        <>
                            <h3>Areas of Study</h3>
                            <ul>
                                {qualification.areasOfStudy.map((area, index) => (
                                    <li key={index}>{area}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
