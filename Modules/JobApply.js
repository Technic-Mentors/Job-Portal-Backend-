import mongoose from "mongoose"

const { Schema } = mongoose

const jobApplySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    resume: {
        type: String
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "JobPost"
    },
    currentSalary: {
        type: String
    },
    expectedSalary: {
        type: String
    },
    relocation: {
        type: String
    },
    status: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("JobApply", jobApplySchema) 