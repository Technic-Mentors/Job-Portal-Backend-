import express from "express"
import cloudinary from "../Cloudinary.js"

import errorHandling from "../Middlewares/ErrorHandling.js"
import upload from "../Middlewares/ImageFilter.js"

import Course from "../Modules/Course.js"
import Category from "../Modules/Category.js"

const router = express.Router()

router.use((err, req, res, next) => {
    console.error(err.stack);
    next(err)
});

// add course
router.post("/addcourse", upload.single("image"), errorHandling(async (req, res) => {

    const { title, duration, level, description, categoryId, learning, content, userId, moduleName1, moduleName2, instructorName, days, email, contact, timeSlot } = req.body;

    const [checkCategory, CourseTitle] = await Promise.all([
        Category.findById(categoryId),
        Course.findOne({ title })
    ])

    if (!checkCategory) return res.status(400).json({ message: "category is not present" })

    if (CourseTitle) return res.status(400).json({ message: "Course with this title already exists" })

    let img_url;
    if (req.file) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        img_url = upload.secure_url
    }

    const newCourse = await Course.create({
        title, duration, level, description, image: img_url, categoryId, learning, content, userId, moduleName1, moduleName2, instructorName, email, contact, days, timeSlot
    });

    res.json(newCourse);

}));

// {get courses}
router.get("/getAllCourses", errorHandling(async (req, res) => {
    const allCourses = await Course.find().populate("categoryId", "category image")
    res.status(200).json(allCourses);
}))

// {check by id}
router.get("/checkCourse/:id", errorHandling(async (req, res) => {
    const courseId = await Course.find({ userId: req.params.id })
    if (!courseId) {
        res.status(400).json({ message: "course not exists" })
    }
    const categoryId = courseId.map((id) => {
        return id.categoryId.toString()
    })
    const categoryy = await Category.find({ _id: categoryId })
    res.json({ courseId, categoryy })
}))

// {get by id}
router.get("/getcourse/:id", errorHandling(async (req, res) => {
    const courseId = await Course.findById(req.params.id)
    if (!courseId) {
        res.status(400).json({ message: "course not exists" })
    }
    const categoryId = courseId.categoryId.toString()
    const categoryy = await Category.findById(categoryId)
    res.json({ courseId, categoryy })
}))

// {get by title}
router.get("/getcorse/:title", errorHandling(async (req, res) => {
    const courseTitle = await Course.findOne({ title: req.params.title })

    if (!courseTitle) {
        res.status(400).json({ message: "course not exists" })
    }
    const courseId = courseTitle.categoryId.toString()
    const categoryy = await Category.findById(courseId)
    res.json({ courseTitle, categoryy })
}))

// {update}
router.put("/updatecourse/:id", upload.single("image"), errorHandling(async (req, res) => {
    const { title, duration, level, description, categoryId, learning, content, days, email, contact, timeSlot, moduleName1, moduleName2, instructorName } = req.body

    const newCourse = ({})
    if (title) newCourse.title = title
    if (days) newCourse.days = days
    if (timeSlot) newCourse.timeSlot = timeSlot
    if (moduleName1) newCourse.moduleName1 = moduleName1
    if (moduleName2) newCourse.moduleName2 = moduleName2
    if (instructorName) newCourse.instructorName = instructorName
    if (duration) newCourse.duration = duration
    if (level) newCourse.level = level
    if (description) newCourse.description = description
    if (categoryId) newCourse.categoryId = categoryId
    if (learning) newCourse.learning = learning
    if (content) newCourse.content = content
    if (email) newCourse.email = email
    if (contact) newCourse.contact = contact

    if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
        newCourse.image = uploadResult.secure_url;
    }

    let courseId = await Course.findById(req.params.id)
    if (!courseId) return res.status(400).json({ message: "Course Doesn't Exist" })

    courseId = await Course.findByIdAndUpdate(req.params.id, { $set: newCourse }, { new: true })
    res.json(courseId)
}))

// {delete}
router.delete("/deletecourse/:id", errorHandling(async (req, res) => {
    const courseId = await Course.findByIdAndDelete(req.params.id)
    if (!courseId) {
        res.status(400).json({ message: "Course Doesn't Exist" })
    }
    res.json({ message: "course deleted successfully" })
}))

router.get("/countCourse", errorHandling(async (req, res) => {
    const countCourse = await Course.countDocuments()
    res.json(countCourse)
}))

export default router;