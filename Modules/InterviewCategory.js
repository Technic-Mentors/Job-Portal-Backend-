import mongoose from "mongoose";
const { Schema } = mongoose;

const interviewCategorySchema = new Schema({
    category: {
        type: String,
        required: true,
    }
});

export default mongoose.model("interviewCategory", interviewCategorySchema);
