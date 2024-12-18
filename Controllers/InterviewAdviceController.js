import express from 'express'
import errorHandling from '../Middlewares/ErrorHandling.js'
import IniterviewAdvice from '../Modules/IniterviewAdvice.js'
const router = express.Router()

router.post("/addAdvice", errorHandling(async (req, res) =>{
    const {name, email, advice} = req.body
    if(!name || !email || !advice) return res.status(400).json({message: "Fields with * are required"})
        const checkEmail = await IniterviewAdvice.findOne({email})
    if(checkEmail) return res.status(400).json({message: "Email already exists!"})

        const newAdvice = await IniterviewAdvice.create({name, email, advice})
        res.json(newAdvice)
}))

router.get("/allAdvices", errorHandling(async (req, res) => {
    const allAdvices = await IniterviewAdvice.find()
    res.json(allAdvices)
}))

router.get("/getAdvicesId/:id", errorHandling(async (req, res) => {
    const adviceById = await IniterviewAdvice.findById(req.params.id)
    if (!adviceById) return res.status(400).json({message:"No advice Found!"})
        res.json(adviceById)
}))

router.delete("/delAdviceById/:id", errorHandling(async (req, res) => {
    const delAdviceById = await IniterviewAdvice.findByIdAndDelete(req.params.id)
    if (!delAdviceById) return res.status(400).json({message:"No advice Found!"})
        res.json({message: "Advice deleted successfully!"})
}))

export default router; 