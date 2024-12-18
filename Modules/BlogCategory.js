import mongoose from "mongoose";
const { Schema } = mongoose;

const blogCategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  }
});

export default mongoose.model("blogCategory", blogCategorySchema);
