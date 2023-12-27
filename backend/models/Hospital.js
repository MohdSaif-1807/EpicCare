import mongoose from "mongoose";
import hospitalLocationSchema from "../Schemas/HospitalLocation.js";
import doctorListSchema from "../Schemas/DoctorList.js";
const hospitalSchema = new mongoose.Schema({
    hospital_id: {
        type: Number
    },
    hospital_name: {
        type: String
    },
    hospital_registration_id: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    certifications: [
        {
            type: String
        }
    ],
    address: {
        type: hospitalLocationSchema
    },
    doctor_list: [
        {
            type: doctorListSchema
        }
    ]
})
const Hospital = new mongoose.model("Hospital", hospitalSchema);
export default Hospital;