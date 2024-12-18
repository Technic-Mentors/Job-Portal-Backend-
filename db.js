import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const mongoDbUrl = process.env.mongoDb_Url;
const mongoDbConnection = () => {
    try {
        mongoose.connect(mongoDbUrl)
        console.log("Successfully connected with mongodb");
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

export default mongoDbConnection;