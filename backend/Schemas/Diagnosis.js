import mongoose from "mongoose";
const diagnosisSchema = new mongoose.Schema({
    hospital_or_diagnosis_center_name: {
        type: String,
        default: "undefined"
    },
    diagnosis_reports_images: [
        {
            type: String
        }
    ],
    report_result: {
        type: String,
        default: "undefined"
    }
})
export default diagnosisSchema;