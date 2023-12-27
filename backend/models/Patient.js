import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    profilePicture: {
        id: {
            type: String
        },
        name: {
            type: String
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;