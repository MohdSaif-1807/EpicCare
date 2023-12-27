import mongoose from "mongoose";
const patientContactSchema = new mongoose.Schema({
    address: {
        type: String,
        default: "undefined"
    },
    phoneNumber: {
        type: String,
        default: "undefined"
    },
    email: {
        type: String
    },

})
export default patientContactSchema;