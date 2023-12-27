import mongoose from "mongoose";
const hospitalLocationSchema = new mongoose.Schema({
    residence_no: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
})
export default hospitalLocationSchema;