import express from "express";
import resourceCategry from "../Modules/ResourceCategory.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();

router.post(
    "/category",
    errorHandling(
        async (req, res) => {
            const { category } = req.body;
            if (!category) return res.status(400).json({ message: "Please fill category field" })
            const existingCategory = await resourceCategry.findOne({
                category: { $regex: `^${category}$`, $options: "i" }
            }); 

            if (existingCategory) {
                return res.status(400).json({ message: "Category already exists" });
            }

            const newCategory = await resourceCategry.create({ category });
            res.status(201).json(newCategory);
        }
    )
);

router.get("/getcategories", errorHandling(async (req, res) => {
    const Getcategory = await resourceCategry.find({});
    res.json(Getcategory);
}));

router.get("/getcategory/:id", errorHandling(async (req, res) => {
    const Getcategory = await resourceCategry.findById(req.params.id);
    if (!Getcategory) {
        return res.status(404).json({ message: "Dont find Category" });
    }
    res.json(Getcategory);
}));

router.delete("/delcategory/:id", errorHandling(async (req, res) => {
    const Getcategory = await resourceCategry.findByIdAndDelete(req.params.id);
    if (!Getcategory) {
        return res.status(404).json({ message: "Dont find Category" });
    }
    res.json({ message: "Category deleted successfully" });
}));

router.put("/editcategory/:id", errorHandling(async (req, res) => {
    const { category } = req.body;
    const newCat = {};
    if (category) {
        newCat.category = category;
    }

    let cat = await resourceCategry.findById(req.params.id);
    if (!cat) {
        res.status(404).json("Category not found");
    }

    cat = await resourceCategry.findByIdAndUpdate(
        req.params.id,
        { $set: newCat },
        { new: true }
    );
    res.json(cat);
}));

router.get("/resourceCategoryCount", errorHandling(async (req, res) => {
    const categoryCount = await resourceCategry.countDocuments({})
    res.json(categoryCount)
}))

export default router;
