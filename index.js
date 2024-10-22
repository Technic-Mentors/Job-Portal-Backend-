import express from "express";
import mongoDbConnection from "./db.js";
import userControllers from "./Controllers/userControllers.js"
import jobController from "./Controllers/JobController.js"

import cors from "cors"
mongoDbConnection()
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/user", userControllers)
app.use("/api/jobPost", jobController)

app.listen(8000, () => {
    console.log("App listing at http://localhost:8000");
})