import mongoose from "mongoose";
const { Schema } = mongoose

const jobCitySchema = new Schema({
    city: String,
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job Country"
    }
}, { timestamps: true })

export default mongoose.model("job City", jobCitySchema)