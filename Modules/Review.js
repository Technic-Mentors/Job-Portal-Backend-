import mongoose from "mongoose"
const { Schema } = mongoose

const reviewSchema = new Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    designation: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String
    },
    status: {
        type: String
    },
    companyName: {
        type: String
    },
    message: {
        type: String
    }
})

export default mongoose.model("Review", reviewSchema)