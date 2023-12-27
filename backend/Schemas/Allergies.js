import mongoose from "mongoose";
const allergiesSchema = new mongoose.Schema({
    substance: {
        type: String,
        default: undefined
    },
    reactions: {
        type: String,
        default: undefined
    }
})
export default allergiesSchema;