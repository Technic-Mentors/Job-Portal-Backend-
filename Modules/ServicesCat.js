import mongoose from "mongoose";
const { Schema } = mongoose;

const servicesCatSchema = new Schema({
    category: {
        type: String,
        required: true,
    }
});

export default mongoose.model("servicesCategory", servicesCatSchema);
