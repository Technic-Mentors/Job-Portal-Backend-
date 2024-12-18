import express from "express";
import mongoDbConnection from "./db.js";
import userControllers from "./Controllers/userControllers.js"
import jobController from "./Controllers/JobController.js"
import jobApplyController from "./Controllers/JobApplyController.js"
import courseController from "./Controllers/CourseControllers.js"
import categoryController from "./Controllers/CategoryControllers.js"
import blogController from "./Controllers/BlogControllers.js"
import blogCategoryController from "./Controllers/BlogCategoryController.js"
import resumeControllers from "./Controllers/ResumeControllers.js";
import reviewControllers from "./Controllers/ReviewControllers.js";
import interviewControllers from "./Controllers/InterviewAdviceController.js";
import jobSeakerControllers from "./Controllers/JobSeakerController.js";
import resourceControllers from "./Controllers/ResourceControllers.js";
import resourceCategoryControllers from "./Controllers/ResourceCategoryController.js";
import jobCatControllers from "./Controllers/JobCatController.js";
import jobIndControllers from "./Controllers/JobIndustryController.js";
import InterviewController from './Controllers/InterviewController.js'
import InterviewCatController from './Controllers/InterviewCatController.js'
import ServicesController from './Controllers/ServicesController.js'
import ServicesCatController from './Controllers/ServicesCatController.js'

import cors from "cors"
mongoDbConnection()
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/user", userControllers)
app.use("/api/jobPost", jobController)
app.use("/api/apply", jobApplyController)
app.use("/api/course", courseController)
app.use("/api/category", categoryController)
app.use("/api/blog", blogController)
app.use("/api/blogCat", blogCategoryController)
app.use("/api/resource", resourceControllers)
app.use("/api/resourceCat", resourceCategoryControllers)
app.use("/api/resume", resumeControllers)
app.use("/api/review", reviewControllers)
app.use("/api/advice", interviewControllers)
app.use("/api/jobSeaker", jobSeakerControllers)
app.use("/api/jobCat", jobCatControllers)
app.use("/api/jobInd", jobIndControllers)
app.use("/api/interview", InterviewController)
app.use("/api/interviewCat", InterviewCatController)
app.use("/api/service", ServicesController)
app.use("/api/serviceCat", ServicesCatController)

app.listen(8000, () => {
    console.log("App listing at http://localhost:8000");
})
