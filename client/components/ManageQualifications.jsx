
import { useEffect, useState } from "react";

const API = "http://localhost:3000/api/qualifications";

const emptyForm = {
    title: "",
    firstname: "Mohammad",
    lastname: "Alkhalifa",
    email: "admin@example.com",
    description: "",
    institution: "",
    period: "",
    status: "",
    areasOfStudy: ""
};

export default function ManageQualifications() {
    const [qualifications, setQualifications] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadQualifications = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) throw new Error("Could not load qualifications");

            const data = await response.json();
            setQualifications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQualifications();
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

        const token = localStorage.getItem("token");

        const data = {
            ...form,
            areasOfStudy: form.areasOfStudy
                .split(",")
                .map((area) => area.trim())
                .filter(Boolean)
        };

        try {
            const url = editingId ? `${API}/${editingId}` : API;
            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Could not save qualification");
            }

            setSuccess(editingId
                ? "Qualification updated successfully!"
                : "Qualification created successfully!");

            setForm(emptyForm);
            setEditingId(null);
            await loadQualifications();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (qualification) => {
        const values = { ...emptyForm };

        Object.keys(emptyForm).forEach((field) => {
            if (field === "areasOfStudy") {
                values[field] = (qualification.areasOfStudy || []).join(", ");
            } else {
                values[field] = qualification[field] || "";
            }
        });

        setForm(values);
        setEditingId(qualification._id);
        setError("");
        setSuccess("");
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this qualification?")) return;

        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Could not delete qualification");
            }

            setSuccess("Qualification deleted successfully!");
            await loadQualifications();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Manage Qualifications</h2>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}

            <h3>{editingId ? "Edit Qualification" : "Add Qualification"}</h3>

            <form onSubmit={handleSubmit}>
                {Object.keys(emptyForm).map((field) => (
                    <div key={field}>
                        <label htmlFor={`qualification-${field}`}>{field}:</label>
                        <br />
                        <input
                            id={`qualification-${field}`}
                            type="text"
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            required={["title", "firstname", "lastname", "email"].includes(field)}
                        />
                    </div>
                ))}

                <button type="submit" disabled={saving}>
                    {saving
                        ? "Saving..."
                        : editingId
                            ? "Update Qualification"
                            : "Add Qualification"}
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

            <h3>Existing Qualifications</h3>

            {loading && <p>Loading qualifications...</p>}

            {!loading && qualifications.length === 0 && (
                <p>No qualifications found.</p>
            )}

            {qualifications.map((qualification) => (
                <div key={qualification._id}>
                    <h4>{qualification.title}</h4>
                    <button onClick={() => handleEdit(qualification)}>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(qualification._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
