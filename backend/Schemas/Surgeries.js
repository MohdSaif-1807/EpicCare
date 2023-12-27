import mongoose from "mongoose";
const surgerySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: undefined
    },
    procedure: {
        type: String,
        default: undefined
    },
    doctor: {
        type: String,
        default: undefined
    },
    hospital: {
        type: String,
        default: undefined
    }
})
export default surgerySchema;