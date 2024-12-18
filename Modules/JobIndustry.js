import mongoose from "mongoose"
const { Schema } = mongoose

const jobIndSchema = new Schema({
    industry: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

export default mongoose.model("Job Industry", jobIndSchema)