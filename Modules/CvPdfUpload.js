import mongoose from "mongoose"
const { Schema } = mongoose

const cvPdfSchema = new Schema({
    profession: String,
    cv: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model("cv pdf", cvPdfSchema)