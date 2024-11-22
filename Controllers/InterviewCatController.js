import express from "express";
import interviewCategry from "../Modules/InterviewCategory.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();

router.post(
    "/interviewCategory",
    errorHandling(
        async (req, res) => {
            const { category } = req.body;
            if (!category) return res.status(400).json({ message: "Please fill category field" })
            const existingCategory = await interviewCategry.findOne({
                category: { $regex: `^${category}$`, $options: "i" }
            }); 

            if (existingCategory) {
                return res.status(400).json({ message: "Category already exists" });
            }

            const newCategory = await interviewCategry.create({ category });
            res.status(201).json(newCategory);
        }
    )
);

router.get("/getInterviewcategories", errorHandling(async (req, res) => {
    const GetInterviewCategory = await interviewCategry.find({});
    res.json(GetInterviewCategory);
}));

router.get("/getInterviewCategory/:id", errorHandling(async (req, res) => {
    const GetInterviewCategory = await interviewCategry.findById(req.params.id);
    if (!GetInterviewCategory) {
        return res.status(404).json({ message: "Category not found" });
    }
    res.json(GetInterviewCategory);
}));

router.delete("/delInterviewCategory/:id", errorHandling(async (req, res) => {
    const GetInterviewCategory = await interviewCategry.findByIdAndDelete(req.params.id);
    if (!GetInterviewCategory) {
        return res.status(404).json({ message: "Dont find Category" });
    }
    res.json({ message: "Category deleted successfully" });
}));

router.put("/editInterviewCategory/:id", errorHandling(async (req, res) => {
    const { category } = req.body;
    const newCat = {};
    if (category) {
        newCat.category = category;
    }

    let cat = await interviewCategry.findById(req.params.id);
    if (!cat) {
        res.status(404).json("Category not found");
    }

    cat = await interviewCategry.findByIdAndUpdate(
        req.params.id,
        { $set: newCat },
        { new: true }
    );
    res.json(cat);
}));

router.get("/interviewCategoryCount", errorHandling(async (req, res) => {
    const categoryCount = await interviewCategry.countDocuments({})
    res.json(categoryCount)
}))

export default router;
