import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    uploadCv: {
        type: String
    },
    role: {
        type: String
    },
    userImage: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema)