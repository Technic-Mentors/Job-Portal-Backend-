import mongoose from "mongoose"
const { Schema } = mongoose

const jobIndSchema = new Schema({
    industry: {
        type: String,
        required: true
    }
})

export default mongoose.model("Job Industry", jobIndSchema)