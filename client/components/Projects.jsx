
import { useEffect, useState } from "react";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/projects")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load projects");
                }
                return response.json();
            })
            .then((data) => setProjects(data))
            .catch(() => setError("Could not load projects from MongoDB."));
    }, []);

    return (
        <div className="page">
            <h1>Projects</h1>

            {error && <p>{error}</p>}

            {projects.map((project, index) => (
                <div key={project._id}>
                    <h2>Project {index + 1}: {project.title}</h2>

                    {project.image && (
                        <img
                            src={project.image}
                            alt={project.title}
                            style={{ width: "400px" }}
                        />
                    )}

                    <p>{project.description}</p>

                    <p>
                        <strong>My Role:</strong> {project.role}
                    </p>

                    <p>
                        <strong>Outcome:</strong> {project.outcome}
                    </p>
                </div>
            ))}
        </div>
    );
}
