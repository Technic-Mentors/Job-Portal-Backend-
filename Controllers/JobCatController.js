import express from "express";
import jobCategry from "../Modules/JobCategory.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();
import upload from "../Middlewares/ImageFilter.js";
import cloudinaryV2 from "../Cloudinary.js";

router.post(
    "/category", upload.single("image"),
    errorHandling(
        async (req, res) => {
            const { category } = req.body;
            if (!category) return res.status(400).json({ message: "Please fill category field" })
            const existingCategory = await jobCategry.findOne({
                category: { $regex: `^${category}$`, $options: "i" }
            });

            if (existingCategory) {
                return res.status(400).json({ message: "Category already exists" });
            }

            let CatImage;

            if (req.file) {
                const uploadCatImage = await cloudinaryV2.uploader.upload(req.file.path);
                CatImage = uploadCatImage.secure_url;
            }

            const newCategory = await jobCategry.create({ category, image: CatImage });
            res.status(201).json(newCategory);
        }
    )
);


router.get("/getcategories", errorHandling(async (req, res) => {
    const Getcategory = await jobCategry.find({});
    res.json(Getcategory);
}));

router.get("/getcategory/:id", errorHandling(async (req, res) => {
    const Getcategory = await jobCategry.findById(req.params.id);
    if (!Getcategory) {
        return res.status(404).json({ message: "Dont find Category" });
    }
    res.json(Getcategory);
}));

router.delete("/delcategory/:id", errorHandling(async (req, res) => {
    const Getcategory = await jobCategry.findByIdAndDelete(req.params.id);
    if (!Getcategory) {
        return res.status(404).json({ message: "Dont find Category" });
    }
    res.json({ message: "Category deleted successfully" });
}));

router.put("/editcategory/:id", upload.single("image"), errorHandling(async (req, res) => {
    const { category } = req.body;
    const newCat = {};
    if (category) {
        newCat.category = category;
    }
    if (req.file) {
        const uploadIndImage = await cloudinaryV2.uploader.upload(req.file.path);
        newCat.image = uploadIndImage.secure_url;
    }

    let cat = await jobCategry.findById(req.params.id);
    if (!cat) {
        res.status(404).json("Category not found");
    }

    cat = await jobCategry.findByIdAndUpdate(
        req.params.id,
        { $set: newCat },
        { new: true }
    );
    res.json(cat);
}));

router.get("/resourceCategoryCount", errorHandling(async (req, res) => {
    const categoryCount = await jobCategry.countDocuments({})
    res.json(categoryCount)
}))

export default router;
