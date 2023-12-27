import mongoose from 'mongoose';
const vaccinationSchema = new mongoose.Schema({
    name: {
        type: String,
        default: undefined
    },
    date: {
        type: Date,
        default: undefined
    }
})
export default vaccinationSchema;