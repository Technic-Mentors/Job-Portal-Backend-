import mongoose from "mongoose"
const { Schema } = mongoose

const jobCatSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

export default mongoose.model("Job Category", jobCatSchema)