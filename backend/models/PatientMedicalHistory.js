import mongoose from "mongoose";
import patientMedicalHistoryInfoSchema from "../Schemas/PatientMedicalHistoryInfo.js";
import medicalRecordSchema from "../Schemas/Medical_Records.js";
import allergiesSchema from "../Schemas/Allergies.js";
import surgerySchema from "../Schemas/Surgeries.js";
const patientMedicalSchema = new mongoose.Schema({
    lastUpdatedAt: {
        type: Date
    },
    profile_img: {
        id: {
            type: String
        },
        name: {
            type: String
        }
    },
    patient_details: {
        type: patientMedicalHistoryInfoSchema
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
        index: {
            sparse: true
        }
    },
    medical_records: [
        {
            type: medicalRecordSchema,
            default: medicalRecordSchema
        }
    ],
    allergies: [
        {
            type: allergiesSchema,
            default: allergiesSchema
        }
    ],
    surgeries: [
        {
            type: surgerySchema,
            default: surgerySchema
        }
    ]
})
const PatientMedicalHistory = new mongoose.model("PatientMedicalHistory", patientMedicalSchema);
export default PatientMedicalHistory;