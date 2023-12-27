import mongoose from "mongoose";
const doctorListSchema = new mongoose.Schema({
    doctor_id: {
        type: Number
    },
    doctor_name: {
        type: String
    },
    specialization: [
        {
            type: String
        }
    ]
});
export default doctorListSchema;