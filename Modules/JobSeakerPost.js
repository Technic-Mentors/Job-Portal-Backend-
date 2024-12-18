import mongoose from "mongoose"

const { Schema } = mongoose

const jobSeakerSchema = new Schema({
    title: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },
    resume: {
        type: String
    },
    description: {
        type: String
    },
    repositry: {
        type: String
    },
    experience: {
        type: String
    },
    qualification: {
        type: String
    },
    industry: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
    }
}, { timestamps: true })

export default mongoose.model("Job Seaker Post", jobSeakerSchema)