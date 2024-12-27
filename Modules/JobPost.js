import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema({
    title: {
        type: String
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job Country"
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job City"
    },
    email: {
        type: String
    },
    whatsApp: {
        type: String
    },
    description: {
        type: String
    },
    requirements: {
        type: String
    },
    perks: {
        type: String
    },
    industryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job Industry"
    },
    jobImage: {
        type: String
    },
    countryImage: {
        type: String
    },
    companyName: {
        type: String
    },
    jobType: {
        type: String
    },
    jobLocaType: {
        type: String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job Category"
    },
    salary: {
        type: String
    },
    aboutCompany: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model("JobPost", jobSchema);
