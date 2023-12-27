import mongoose from "mongoose";
const patientCounterSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 1
    },
    count: {
        type: Number,
        default: 999
    }
})
const PatientCounter = new mongoose.model("PatientCounter", patientCounterSchema);
export default PatientCounter;