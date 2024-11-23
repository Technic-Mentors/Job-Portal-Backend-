import express from "express"
import Blogs from "../Modules/Blogs.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();

router.post(
  "/createpost",
  errorHandling(async (req, res) => {
    const { title, content, category, slug, meta } = req.body;

    const checkTitle = await Blogs.findOne({ title })
    if (checkTitle) return res.status(400).json({ message: "Title already exists" })
    const post = await Blogs.create({
      title,
      content,
      category,
      slug,
      meta
    });
    res.json({ post });
  })
);

router.get("/getallposts", errorHandling(async (req, res) => {
  const allposts = await Blogs.find({});
  res.json(allposts);
}));

router.get("/getpost/:slug", errorHandling(async (req, res) => {
  const post = await Blogs.findOne({ slug: req.params.slug });
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
}));

router.get("/getposts/:id", errorHandling(async (req, res) => {
  const posts = await Blogs.findById(req.params.id);
  res.json(posts);
}));

router.delete("/delposts/:id", errorHandling(async (req, res) => {
  const posts = await Blogs.findByIdAndDelete(req.params.id);
  if (!posts) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json({ message: "Post deleted successfully" });
}));

router.put("/editposts/:id", errorHandling(async (req, res) => {
  const { title, category, content, slug } = req.body;
  const newPosts = {};
  if (title) {
    newPosts.title = title;
  }
  if (category) {
    newPosts.category = category;
  }
  if (content) {
    newPosts.content = content;
  }
  if (slug) {
    newPosts.slug = slug;
  } 
 
  let posts = await Blogs.findById(req.params.id);
  if (!posts) {
    res.status(404).send({ message: "Posts not find" });
  } 
  posts = await Blogs.findByIdAndUpdate(
    req.params.id,
    { $set: newPosts },
    { new: true }
  );
  res.json(posts);
}));

router.get("/blogCount", errorHandling(async (req, res) => {
  const postCount = await Blogs.countDocuments({})
  res.json(postCount)
}))

export default router;
