import mongoose from "mongoose"
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },

  category: {
    type: String
  },
  slug: {
    type: String
  },
  meta: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("blogs", postSchema);
