import mongoose from "mongoose"
const { Schema } = mongoose

const cateSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

export default mongoose.model("Category", cateSchema)  