import mongoose from 'mongoose'
const {Schema} = mongoose
const adviceSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    advice: {
        type: String
    }
})

export default mongoose.model("InterviewAdvice", adviceSchema)