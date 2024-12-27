import express from "express";
import jobCountry from "../Modules/JobCountry.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();
import upload from "../Middlewares/ImageFilter.js";
import cloudinaryV2 from "../Cloudinary.js";

router.post(
    "/addCountry", upload.single("image"),
    errorHandling(
        async (req, res) => {
            const { country } = req.body;
            if (!country) return res.status(400).json({ message: "Please fill country field" })
            if (!req.file) return res.status(400).json({ message: "Please add country image" })
            const existingCountry = await jobCountry.findOne({
                country: { $regex: `^${country}$`, $options: "i" }
            });

            if (existingCountry) {
                return res.status(400).json({ message: "country already exists" });
            }

            let ConImage;

            if (req.file) {
                const uploadConImage = await cloudinaryV2.uploader.upload(req.file.path);
                ConImage = uploadConImage.secure_url;
            }

            const newcountry = await jobCountry.create({ country, image: ConImage });
            res.status(201).json(newcountry);
        }
    )
);

router.get("/getCountries", errorHandling(async (req, res) => {
    const Getcountry = await jobCountry.find({});
    res.json(Getcountry);
}));

router.get("/getCountry/:id", errorHandling(async (req, res) => {
    const Getcountry = await jobCountry.findById(req.params.id);
    if (!Getcountry) {
        return res.status(404).json({ message: "Dont find country" });
    }
    res.json(Getcountry);
}));

router.delete("/delCountry/:id", upload.single("image"), errorHandling(async (req, res) => {
    const Getcountry = await jobCountry.findByIdAndDelete(req.params.id);
    if (!Getcountry) {
        return res.status(404).json({ message: "Dont find country" });
    }
    res.json({ message: "country deleted successfully" });
}));

router.put("/editCountry/:id",upload.single("image"), errorHandling(async (req, res) => {
    const { country } = req.body;
    const newCon = {};
    if (country) {
        newCon.country = country;
    }

    if (req.file) {
        const uploadConImage = await cloudinaryV2.uploader.upload(req.file.path);
        newCon.image = uploadConImage.secure_url;
    }

    let con = await jobCountry.findById(req.params.id);
    if (!con) {
        res.status(404).json("country not found");
    }

    con = await jobCountry.findByIdAndUpdate(
        req.params.id,
        { $set: newCon },
        { new: true }
    );
    res.json(con);
}));

router.get("/jobCountryCount", errorHandling(async (req, res) => {
    const countryCount = await jobCountry.countDocuments({})
    res.json(countryCount)
}))

export default router;
