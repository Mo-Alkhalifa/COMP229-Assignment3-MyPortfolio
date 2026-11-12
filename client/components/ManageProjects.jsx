
import { useEffect, useState } from "react";

const API = "http://localhost:3000/api/projects";

const emptyForm = {
    title: "",
    firstname: "Mohammad",
    lastname: "Alkhalifa",
    email: "admin@example.com",
    description: "",
    image: "",
    role: "",
    outcome: ""
};

export default function ManageProjects() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const token = localStorage.getItem("token");

    const loadProjects = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) throw new Error("Could not load projects");

            const data = await response.json();
            setProjects(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            const url = editingId ? `${API}/${editingId}` : API;
            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error("Could not save project");
            }

            setSuccess(editingId
                ? "Project updated successfully!"
                : "Project created successfully!");

            setForm(emptyForm);
            setEditingId(null);
            await loadProjects();

        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (project) => {
        const values = {};
        Object.keys(emptyForm).forEach((field) => {
            values[field] = project[field] || "";
        });

        setForm(values);
        setEditingId(project._id);
        setError("");
        setSuccess("");
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this project?")) return;

        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${API}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Could not delete project");
            }

            setSuccess("Project deleted successfully!");
            await loadProjects();

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Manage Projects</h2>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}

            <h3>{editingId ? "Edit Project" : "Add Project"}</h3>

            <form onSubmit={handleSubmit}>
                {Object.keys(emptyForm).map((field) => (
                    <div key={field}>
                        <label>{field}:</label>
                        <br />
                        <input
                            type="text"
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            required={["title", "firstname", "lastname", "email"].includes(field)}
                        />
                    </div>
                ))}

                <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setForm(emptyForm);
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <h3>Existing Projects</h3>

            {loading && <p>Loading projects...</p>}

            {!loading && projects.length === 0 && (
                <p>No projects found.</p>
            )}

            {projects.map((project) => (
                <div key={project._id}>
                    <h4>{project.title}</h4>
                    <button onClick={() => handleEdit(project)}>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(project._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
                  