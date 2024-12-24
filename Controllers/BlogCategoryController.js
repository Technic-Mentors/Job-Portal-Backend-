import express from "express";
import blogCategry from "../Modules/BlogCategory.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();

router.post(
  "/category",
  errorHandling(
    async (req, res) => {
      const { category } = req.body;
      const Allategory = await blogCategry.create({
        category,
      });
      res.json(Allategory);
    }
  )
);

router.get("/getcategory", errorHandling(async (req, res) => {
  const Getcategory = await blogCategry.find({});
  res.json(Getcategory);
}));

router.get("/getcategory/:id", errorHandling(async (req, res) => {
  const Getcategory = await blogCategry.findById(req.params.id);
  if (!Getcategory) {
    return res.status(404).json({ message: "Dont find Category" });
  }
  res.json(Getcategory);
  
}));

router.delete("/delcategory/:id", errorHandling(async (req, res) => {
  const Getcategory = await blogCategry.findByIdAndDelete(req.params.id);
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

  let cat = await blogCategry.findById(req.params.id);
  if (!cat) {
    res.status(404).json("Category not found");
  }

  cat = await blogCategry.findByIdAndUpdate(
    req.params.id,
    { $set: newCat },
    { new: true }
  );
  res.json(cat);
}));

router.get("/blogCategoryCount", errorHandling(async (req, res) => {
  const categoryCount = await blogCategry.countDocuments({})
  res.json(categoryCount)
}))

export default router;
