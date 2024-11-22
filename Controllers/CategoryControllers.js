import express from "express"

import errorHandling from "../Middlewares/ErrorHandling.js";

import Category from "../Modules/Category.js";

const router = express.Router()

router.use((err, req, res, next) => {
    console.error(err.stack);
    next(err)
});

router.post("/addcategory", errorHandling(async (req, res) => {
    const { category } = req.body;
    const previousCategory = await Category.find()
    const categories = previousCategory.map((data) => {
        return data.category.toLowerCase()
    })
    if (categories.includes(category.toLowerCase())) {
        return res.status(400).json({ message: "This category already added" })
    }
    const newCategory = await Category.create({
        category
    });

    res.status(200).json(newCategory);
}));

// {get}
router.get("/getcategory", errorHandling(async (req, res) => {
    const allCategories = await Category.find();
    res.json(allCategories);
}));

router.get("/getOnlyCategory", errorHandling(async (req, res) => {
    const allCategory = await Category.find({}, "category")
    res.send(allCategory)
}))

// {del}
router.delete("/delcategory/:id", errorHandling(async (req, res) => {
    const allCategories = await Category.findByIdAndDelete(req.params.id);
    if (!allCategories) {
        res.status(400).json({ message: "category not exists" })
    }
    res.json({ message: "successfully deleted categories" });
}));

router.get("/courseCatCount", errorHandling(async (req, res) => {
    const courseCatCount = await Category.countDocuments({})
    res.json(courseCatCount)
}))

export default router;