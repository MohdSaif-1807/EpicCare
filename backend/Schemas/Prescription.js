import mongoose from "mongoose";
const prescriptionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: "01-01-2009"
    },
    doctor: {
        type: String,
        default: "undefined"
    },
    diagnosis_reports_images: [
        {
            id: {
                type: String
            },
            name: {
                type: String
            }
        }
    ],
    dosage: {
        type: String,
        default: "undefined"
    },
    frequency: {
        type: String,
        default: "undefined"
    },
    notes: {
        type: String,
        default: "undefined"
    }
});
export default prescriptionSchema;