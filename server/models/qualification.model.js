import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema({

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
    institution: {
        type: String
    },
    period: {
        type: String
    },
    status: {
        type: String
    },
    areasOfStudy: {
        type: [String],
        default: []
    }
    
});

export default mongoose.model("Qualification", QualificationSchema);