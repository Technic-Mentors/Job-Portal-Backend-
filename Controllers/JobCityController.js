import express from "express";
import jobCity from "../Modules/JobCity.js";
import errorHandling from "../Middlewares/ErrorHandling.js"
const router = express.Router();

router.post(
    "/addCity",
    errorHandling(
        async (req, res) => {
            const { city, countryId } = req.body;
            if (!city) return res.status(400).json({ message: "Please fill city field" })
            if (!countryId) return res.status(400).json({ message: "Please select country" })
            const existingcity = await jobCity.findOne({
                city: { $regex: `^${city}$`, $options: "i" }
            });

            if (existingcity) {
                return res.status(400).json({ message: "city already exists" });
            }

            const newcity = await jobCity.create({ city, countryId });
            res.status(201).json(newcity);
        }
    )
);

router.get("/getCities", errorHandling(async (req, res) => {
    const Getcity = await jobCity.find({}).populate("countryId", "country image");
    res.json(Getcity);
}));

router.get("/getCity/:id", errorHandling(async (req, res) => {
    const Getcity = await jobCity.findById(req.params.id).populate("countryId", "country image");
    if (!Getcity) {
        return res.status(404).json({ message: "Dont find city" });
    }
    res.json(Getcity);
}));

router.delete("/delCity/:id", errorHandling(async (req, res) => {
    const Getcity = await jobCity.findByIdAndDelete(req.params.id);
    if (!Getcity) {
        return res.status(404).json({ message: "Dont find city" });
    }
    res.json({ message: "city deleted successfully" });
}));

router.put("/editCity/:id", errorHandling(async (req, res) => {
    const { city, countryId } = req.body;
    const newCity = {};
    if (city) {
        newCity.city = city;
    }
    if (countryId) {
        newCity.countryId = countryId;
    }

    let con = await jobCity.findById(req.params.id);
    if (!con) {
        res.status(404).json("city not found");
    }

    con = await jobCity.findByIdAndUpdate(
        req.params.id,
        { $set: newCity },
        { new: true }
    );
    res.json(con);
}));

router.get("/jobCityCount", errorHandling(async (req, res) => {
    const cityCount = await jobCity.countDocuments({})
    res.json(cityCount)
}))

export default router;
