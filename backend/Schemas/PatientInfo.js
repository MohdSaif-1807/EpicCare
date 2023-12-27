import mongoose from "mongoose";
import patientContactSchema from "./PatientContact.js";
const patientInfoSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    contact: {
        type: patientContactSchema
    }
})
const PatientInfo = new mongoose.model("PatientInfo", patientInfoSchema);
export default PatientInfo;