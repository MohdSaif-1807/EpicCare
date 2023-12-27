import mongoose from "mongoose";
import prescriptionSchema from "./Prescription.js";
import vaccinationSchema from "./Vaccinations.js";
import diagnosisSchema from "./Diagnosis.js";
const medicalRecordSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: undefined
    },
    prescriptions: [
        {
            type: prescriptionSchema,
            default: prescriptionSchema
        }
    ],
    diagnosis: [
        {
            type: diagnosisSchema,
            default: [diagnosisSchema]
        }
    ],
    vaccinations: [
        {
            type: vaccinationSchema,
            default: vaccinationSchema
        }
    ]
})
//const medical_records = new mongoose.model("medical_records", medicalRecordSchema);
export default medicalRecordSchema;