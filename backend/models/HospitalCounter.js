import mongoose from "mongoose";
const hospitalCounterSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 1
    },
    count: {
        type: Number,
        default: 9999
    }
})
const HospitalCounter = new mongoose.model("HospitalCounter", hospitalCounterSchema);
export default HospitalCounter;