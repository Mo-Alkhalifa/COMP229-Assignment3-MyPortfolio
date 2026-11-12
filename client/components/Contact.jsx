
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:3000/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    contactNumber: contactNumber,
                    email: email,
                    message: message
                })
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setSuccess("Your message was sent successfully!");

            setFirstName("");
            setLastName("");
            setContactNumber("");
            setEmail("");
            setMessage("");

        } catch (err) {
            setError("Could not send your message. Please try again.");
        }
    };

    return (
        <div className="page">
            <h1>Contact Me</h1>

            <p>
                Feel free to contact me if you would like to discuss a project, opportunity, or collaboration.
            </p>

            <p>
                <strong>Email:</strong> malkhal3@my.centennialcollege.ca
            </p>

            {success && <p>{success}</p>}
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <br />
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <br />

                <label>Last Name:</label>
                <br />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />

                <br />

                <label>Contact Number:</label>
                <br />
                <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />

                <br />

                <label>Email:</label>
                <br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br />

                <label>Message:</label>
                <br />
                <textarea
                    rows="5"
                    cols="30"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
