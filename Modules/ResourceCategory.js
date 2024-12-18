import mongoose from "mongoose";
const { Schema } = mongoose;

const resourceCategorySchema = new Schema({
    category: {
        type: String,
        required: true,
    }
});

export default mongoose.model("resourceCategory", resourceCategorySchema);
