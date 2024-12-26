import mongoose from "mongoose";
const { Schema } = mongoose;

const employmentSchema = new Schema({
    companyName: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
});

const educationSchema = new Schema({
    institutionName: String,
    degree: String,
    startDate: Date,
    endDate: Date,
    fieldOfStudy: String,
    description: String,
});

const resumeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    number: {
        type: String,
    },
    profession: String,
    image: String,
    totalWorkExp: String,
    resumeHeadline: String,
    description: String,
    employmentDetails: [employmentSchema],
    educationDetails: [educationSchema],
    skills: [String],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
