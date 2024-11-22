import express, { response } from "express"
import errorHandling from "../Middlewares/ErrorHandling.js"
import Review from "../Modules/Review.js"
const router = express.Router()

router.post("/addReview", errorHandling(async (req, res) => {
    const { name, email, role, companyName, message } = req.body
    if (!role || !message) return res.status(400).json({ errorMessage: "Fields with * are required" })
    const checkEmail = await Review.findOne({email})
    if(checkEmail) return res.status(400).json({errorMessage: "Review with this email already exists!"})

    const newReview = await Review.create({ name, email, role, companyName, message })
    res.json(newReview)
}))

router.get("/allReviews", errorHandling(async (req, res) => {
    const allReviews = await Review.find()
    res.json(allReviews)
}))

router.get("/getReviewById/:id", errorHandling(async (req, res) => {
    const reviewById = await Review.findById(req.params.id)
    if (!reviewById) return res.status(400).json({ message: "Review not found" })
    res.json(reviewById)
}))

router.delete("/delReviewById/:id", errorHandling(async (req, res) => {
    const delReviewById = await Review.findByIdAndDelete(req.params.id)
    if (!delReviewById) return res.status(400).json({ message: "Review not found" })
    res.json({ message: "Review successfully deleted" })
}))

export default router;