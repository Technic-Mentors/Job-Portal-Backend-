import express from "express";
import jobIndustry from "../Modules/JobIndustry.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();

router.post(
    "/industry",
    errorHandling(
        async (req, res) => {
            const { industry } = req.body;
            if (!industry) return res.status(400).json({ message: "Please fill industry field" })
            const existingindustry = await jobIndustry.findOne({
                industry: { $regex: `^${industry}$`, $options: "i" }
            });

            if (existingindustry) {
                return res.status(400).json({ message: "industry already exists" });
            }

            const newindustry = await jobIndustry.create({ industry });
            res.status(201).json(newindustry);
        }
    )
);


router.get("/getIndustries", errorHandling(async (req, res) => {
    const Getindustry = await jobIndustry.find({});
    res.json(Getindustry);
}));

router.get("/getIndustry/:id", errorHandling(async (req, res) => {
    const Getindustry = await jobIndustry.findById(req.params.id);
    if (!Getindustry) {
        return res.status(404).json({ message: "Dont find industry" });
    }
    res.json(Getindustry);
}));

router.delete("/delIndustry/:id", errorHandling(async (req, res) => {
    const Getindustry = await jobIndustry.findByIdAndDelete(req.params.id);
    if (!Getindustry) {
        return res.status(404).json({ message: "Dont find industry" });
    }
    res.json({ message: "industry deleted successfully" });
}));

router.put("/editIndustry/:id", errorHandling(async (req, res) => {
    const { industry } = req.body;
    const newCat = {};
    if (industry) {
        newCat.industry = industry;
    }

    let cat = await jobIndustry.findById(req.params.id);
    if (!cat) {
        res.status(404).json("industry not found");
    }

    cat = await jobIndustry.findByIdAndUpdate(
        req.params.id,
        { $set: newCat },
        { new: true }
    );
    res.json(cat);
}));

router.get("/resourceIndustryCount", errorHandling(async (req, res) => {
    const industryCount = await jobIndustry.countDocuments({})
    res.json(industryCount)
}))

export default router;
