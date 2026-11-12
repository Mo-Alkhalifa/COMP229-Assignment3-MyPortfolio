
import { useEffect, useState } from "react";

const API = "http://localhost:3000/api/contacts";

const emptyForm = {
    firstname: "",
    lastname: "",
    contactNumber: "",
    email: "",
    message: ""
};

export default function ManageContacts() {
    const [contacts, setContacts] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadContacts = async () => {
        setError("");
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(API, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Could not load contacts");
            }

            const data = await response.json();
            setContacts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadContacts();
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
            const token = localStorage.getItem("token");
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
                throw new Error("Could not save contact");
            }

            setSuccess(editingId
                ? "Contact updated successfully!"
                : "Contact created successfully!");

            setForm(emptyForm);
            setEditingId(null);
            await loadContacts();

        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (contact) => {
        const values = {};

        Object.keys(emptyForm).forEach((field) => {
            values[field] = contact[field] || "";
        });

        setForm(values);
        setEditingId(contact._id);
        setError("");
        setSuccess("");
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this contact?")) return;

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
                throw new Error("Could not delete contact");
            }

            setSuccess("Contact deleted successfully!");
            await loadContacts();

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Manage Contacts</h2>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}

            <h3>{editingId ? "Edit Contact" : "Add Contact"}</h3>

            <form onSubmit={handleSubmit}>
                {Object.keys(emptyForm).map((field) => (
                    <div key={field}>
                        <label htmlFor={`contact-${field}`}>{field}:</label>
                        <br />

                        {field === "message" ? (
                            <textarea
                                id={`contact-${field}`}
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                                rows="4"
                            />
                        ) : (
                            <input
                                id={`contact-${field}`}
                                type={field === "email" ? "email" : "text"}
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                                required={["firstname", "lastname", "email"].includes(field)}
                            />
                        )}
                    </div>
                ))}

                <button type="submit" disabled={saving}>
                    {saving
                        ? "Saving..."
                        : editingId
                            ? "Update Contact"
                            : "Add Contact"}
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

            <h3>Existing Contacts</h3>

            {loading && <p>Loading contacts...</p>}

            {!loading && contacts.length === 0 && (
                <p>No contacts found.</p>
            )}

            {contacts.map((contact) => (
                <div key={contact._id}>
                    <h4>{contact.firstname} {contact.lastname}</h4>
                    <p>Email: {contact.email}</p>
                    <p>Phone: {contact.contactNumber}</p>
                    <p>Message: {contact.message}</p>

                    <button onClick={() => handleEdit(contact)}>
                        Edit
                    </button>

                    <button onClick={() => handleDelete(contact._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
