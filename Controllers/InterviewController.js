import express from "express"
import Interview from "../Modules/Interview.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();

router.post(
    "/createInterview",
    errorHandling(async (req, res) => {
        const { title, content, category, slug, meta } = req.body;

        const checkTitle = await Interview.findOne({ title })
        if (checkTitle) return res.status(400).json({ message: "Title already exists" })
        const post = await Interview.create({
            title,
            content,
            category,
            slug,
            meta
        });
        res.json({ post });
    })
);

router.get("/getAllInterviews", errorHandling(async (req, res) => {
    const allInterviews = await Interview.find({});
    res.json(allInterviews);
}));

router.get("/getInterview/:slug", errorHandling(async (req, res) => {
    const post = await Interview.findOne({ slug: req.params.slug });
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
}));

router.get("/getInterviewById/:id", errorHandling(async (req, res) => {
    const Interviews = await Interview.findById(req.params.id);
    res.json(Interviews);
}));

router.delete("/delInterview/:id", errorHandling(async (req, res) => {
    const Interviews = await Interview.findByIdAndDelete(req.params.id);
    if (!Interviews) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
}));

router.put("/editInterview/:id", errorHandling(async (req, res) => {
    const { title, category, content, slug } = req.body;
    const newInterviews = {};
    if (title) {
        newInterviews.title = title;
    }
    if (category) {
        newInterviews.category = category;
    }
    if (content) {
        newInterviews.content = content;
    }
    if (slug) {
        newInterviews.slug = slug;
    }

    let Interviews = await Interview.findById(req.params.id);
    if (!Interviews) {
        res.status(404).send({ message: "Resources not find" });
    }
    Interviews = await Interview.findByIdAndUpdate(
        req.params.id,
        { $set: newInterviews },
        { new: true }
    );
    res.json(Interviews);
}));

router.get("/blogCount", errorHandling(async (req, res) => {
    const postCount = await Interview.countDocuments({})
    res.json(postCount)
}))

export default router;
