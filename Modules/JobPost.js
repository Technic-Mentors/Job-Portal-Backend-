import mongoose from "mongoose"

const { Schema } = mongoose

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    industry: {


        type: String
    },
    image: {
        type: String
    },
    companyName: {
        type: String
    },
    jobType: {
        type: String,
        required: true
    },
    jobLocaType: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    salary: {
        type: String
    }
})

export default mongoose.model("JobPost", jobSchema)