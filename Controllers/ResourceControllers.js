import express from "express"
import Resource from "../Modules/Resource.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();

router.post(
    "/createResource",
    errorHandling(async (req, res) => {
        const { title, content, category, slug, meta } = req.body;

        const checkTitle = await Resource.findOne({ title })
        if (checkTitle) return res.status(400).json({ message: "Title already exists" })
        const post = await Resource.create({
            title,
            content,
            category,
            slug,
            meta
        });
        res.json({ post });
    })
);

router.get("/getAllResources", errorHandling(async (req, res) => {
    const allResources = await Resource.find({});
    res.json(allResources);
}));

router.get("/getResource/:slug", errorHandling(async (req, res) => {
    const post = await Resource.findOne({ slug: req.params.slug });
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
}));

router.get("/getResourceById/:id", errorHandling(async (req, res) => {
    const Resources = await Resource.findById(req.params.id);
    res.json(Resources);
}));

router.delete("/delResource/:id", errorHandling(async (req, res) => {
    const Resources = await Resource.findByIdAndDelete(req.params.id);
    if (!Resources) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
}));

router.put("/editResource/:id", errorHandling(async (req, res) => {
    const { title, category, content, slug } = req.body;
    const newResources = {};
    if (title) {
        newResources.title = title;
    }
    if (category) {
        newResources.category = category;
    }
    if (content) {
        newResources.content = content;
    }
    if (slug) {
        newResources.slug = slug;
    }

    let Resources = await Resource.findById(req.params.id);
    if (!Resources) {
        res.status(404).send({ message: "Resources not find" });
    }
    Resources = await Resource.findByIdAndUpdate(
        req.params.id,
        { $set: newResources },
        { new: true }
    );
    res.json(Resources);
}));

router.get("/blogCount", errorHandling(async (req, res) => {
    const postCount = await Resource.countDocuments({})
    res.json(postCount)
}))

export default router;
