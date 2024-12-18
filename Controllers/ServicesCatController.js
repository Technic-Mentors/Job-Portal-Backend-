import express from "express";
import ServicesCat from "../Modules/ServicesCat.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();

router.post(
    "/serviceCategory",
    errorHandling(
        async (req, res) => {
            const { category } = req.body;
            if (!category) return res.status(400).json({ message: "Please fill category field" })
            const existingCategory = await ServicesCat.findOne({
                category: { $regex: `^${category}$`, $options: "i" }
            }); 

            if (existingCategory) {
                return res.status(400).json({ message: "Category already exists" });
            }

            const newCategory = await ServicesCat.create({ category });
            res.status(201).json(newCategory);
        }
    )
);

router.get("/getServiceCategories", errorHandling(async (req, res) => {
    const GetServiceCategory = await ServicesCat.find({});
    res.json(GetServiceCategory);
}));

router.get("/getServiceCategory/:id", errorHandling(async (req, res) => {
    const GetServiceCategory = await ServicesCat.findById(req.params.id);
    if (!GetServiceCategory) {
        return res.status(404).json({ message: "Category not found" });
    }
    res.json(GetServiceCategory);
}));

router.delete("/delServiceCategory/:id", errorHandling(async (req, res) => {
    const GetServiceCategory = await ServicesCat.findByIdAndDelete(req.params.id);
    if (!GetServiceCategory) {
        return res.status(404).json({ message: "Dont find Category" });
    }
    res.json({ message: "Category deleted successfully" });
}));

router.put("/editServiceCategory/:id", errorHandling(async (req, res) => {
    const { category } = req.body;
    const newCat = {};
    if (category) {
        newCat.category = category;
    }

    let cat = await ServicesCat.findById(req.params.id);
    if (!cat) {
        res.status(404).json("Category not found");
    }

    cat = await ServicesCat.findByIdAndUpdate(
        req.params.id,
        { $set: newCat },
        { new: true }
    );
    res.json(cat);
}));

router.get("/serviceCategoryCount", errorHandling(async (req, res) => {
    const categoryCount = await ServicesCat.countDocuments({})
    res.json(categoryCount)
}))

export default router;
