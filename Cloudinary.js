import clodinary from "cloudinary"
import dotenv from "dotenv"
dotenv.config()

const cloudinaryV2 = clodinary.v2

cloudinaryV2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});
export default cloudinaryV2;