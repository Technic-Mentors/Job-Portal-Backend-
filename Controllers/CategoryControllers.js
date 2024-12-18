import express from "express"
import errorHandling from "../Middlewares/ErrorHandling.js";
import Category from "../Modules/Category.js";
import upload from "../Middlewares/ImageFilter.js";
import cloudinaryV2 from "../Cloudinary.js";

const router = express.Router()

router.use((err, req, res, next) => {
    console.error(err.stack);
    next(err)
});
 
router.post("/addcategory", upload.single("image"), errorHandling(async (req, res) => {
    const { category } = req.body;
    const previousCategory = await Category.find()
    const categories = previousCategory.map((data) => {
        return data.category.toLowerCase()
    })
    if (categories.includes(category.toLowerCase())) {
        return res.status(400).json({ message: "Category already exists" })
    }
    let CatImage;

    if (req.file) {
        const uploadCatImage = await cloudinaryV2.uploader.upload(req.file.path);
        CatImage = uploadCatImage.secure_url;
    }

    const newCategory = await Category.create({
        category, image: CatImage
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

router.get("/getCategoryById/:id", errorHandling(async (req, res) => {
    const Getcategory = await Category.findById(req.params.id);
    if (!Getcategory) {
        return res.status(404).json({ message: "Dont find Category" });
    }
    res.json(Getcategory);
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

    let cat = await Category.findById(req.params.id);
    if (!cat) {
        res.status(404).json("Category not found");
    }

    cat = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: newCat },
        { new: true }
    );
    res.json(cat);
}));

// {del}
router.delete("/delcategory/:id", errorHandling(async (req, res) => {
    const allCategories = await Category.findByIdAndDelete(req.params.id);
    if (!allCategories) {
        res.status(400).json({ message: "Category does not exist!" })
    }
    res.json({ message: "Category deleted successfully" });
}));

router.get("/courseCatCount", errorHandling(async (req, res) => {
    const courseCatCount = await Category.countDocuments({})
    res.json(courseCatCount)
}))

export default router;