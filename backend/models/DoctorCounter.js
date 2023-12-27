import mongoose from "mongoose";
const doctorCounterSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 1
    },
    count: {
        type: Number,
        default: 99999
    }
})
const DoctorCounter = new mongoose.model("DoctorCounter", doctorCounterSchema);
export default DoctorCounter;