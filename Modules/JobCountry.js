import mongoose from "mongoose";
const { Schema } = mongoose

const jobCountrySchema = new Schema({
    country: String,
    image: String
}, { timestamps: true })

export default mongoose.model("job Country", jobCountrySchema)