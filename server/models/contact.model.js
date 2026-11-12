
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: "First name is required"
  },
  lastname: {
    type: String,
    trim: true,
    required: "Last name is required"
  },
  contactNumber: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required"
  },
  message: {
    type: String,
    trim: true
  }
});

export default mongoose.model("Contact", ContactSchema);
