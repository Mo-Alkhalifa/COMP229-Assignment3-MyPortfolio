import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: "Title is required"
    },
    firstname: {
        type: String,
        required: "First name is required"
    },
    lastname: {
        type: String,
        required: "Last name is required"
    },
    email: {
        type: String,
        required: "Email is required"
    },
    completion: {
        type: Date
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    role: {
        type: String
    },
    outcome: {
        type: String
    }

});

export default mongoose.model("Project", ProjectSchema);




