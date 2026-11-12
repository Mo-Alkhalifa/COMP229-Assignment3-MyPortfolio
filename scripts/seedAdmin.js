import "dotenv/config";
import mongoose from "mongoose";
import User from "../server/models/user.model.js";

const seedAdmin = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!mongoUri || !email || !password) {

            throw new Error("Missing administrator configuration in .env");
        }

        await mongoose.connect(mongoUri);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("Administrator email already exists.");
            return;
        }

        await User.create({
            name: "Administrator",
            email: email,
            password: password,
            role: "admin"
        });

        console.log("Administrator created successfully!");
    }   catch (err) {
        console.error("Error creating administrator:", err.message);
        process.exitCode = 1;
    }   finally {
        await mongoose.disconnect();
    }
};

seedAdmin();