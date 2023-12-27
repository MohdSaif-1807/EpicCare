import mongoose from "mongoose";
import hospitalClinicInfoSchema from "../Schemas/HospitalClinicInfo.js";
const doctorSchema = new mongoose.Schema({
    doctor_name: {
        type: String
    },
    doctor_id: {
        type: Number,
    },
    specialization: [
        {
            type: String
        }
    ],
    email: {
        type: String
    },
    password: {
        type: String
    },
    hospital_clinic_info: {
        type: hospitalClinicInfoSchema
    }
})
const Doctor = new mongoose.model("Doctor", doctorSchema);
export default Doctor;