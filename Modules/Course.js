
import mongoose from "mongoose"
const { Schema } = mongoose

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    learning: {
        type: String
    },
    content: {
        type: String
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    image: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },

    moduleName1: {
        type: String
    },
    moduleName2: {
        type: String
    },
    instructorName: {
        type: String
    },
    days: {
        type: String
    },
    timeSlot: {
        type: String
    }
})

export default mongoose.model("Course", courseSchema);
