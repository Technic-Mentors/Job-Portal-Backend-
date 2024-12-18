import express from "express"
import Services from "../Modules/Services.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();

router.post(
    "/createService",
    errorHandling(async (req, res) => {
        const { title, content, category, slug, meta } = req.body;

        const checkTitle = await Services.findOne({ title })
        if (checkTitle) return res.status(400).json({ message: "Title already exists" })
        const post = await Services.create({
            title,
            content,
            category,
            slug,
            meta
        });
        res.json({ post });
    })
);

router.get("/getAllServices", errorHandling(async (req, res) => {
    const allServices = await Services.find({});
    res.json(allServices);
}));

router.get("/getService/:slug", errorHandling(async (req, res) => {
    const post = await Services.findOne({ slug: req.params.slug });
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
}));

router.get("/getServiceById/:id", errorHandling(async (req, res) => {
    const Service = await Services.findById(req.params.id);
    res.json(Service);
}));

router.delete("/delService/:id", errorHandling(async (req, res) => {
    const Service = await Services.findByIdAndDelete(req.params.id);
    if (!Service) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
}));

router.put("/editService/:id", errorHandling(async (req, res) => {
    const { title, category, content, slug } = req.body;
    const newServices = {};
    if (title) {
        newServices.title = title;
    }
    if (category) {
        newServices.category = category;
    }
    if (content) {
        newServices.content = content;
    }
    if (slug) {
        newServices.slug = slug;
    }

    let Service = await Services.findById(req.params.id);
    if (!Service) {
        res.status(404).send({ message: "Resources not find" });
    }
    Service = await Services.findByIdAndUpdate(
        req.params.id,
        { $set: newServices },
        { new: true }
    );
    res.json(Interviews);
}));

router.get("/blogCount", errorHandling(async (req, res) => {
    const postCount = await Services.countDocuments({})
    res.json(postCount)
}))

export default router;
