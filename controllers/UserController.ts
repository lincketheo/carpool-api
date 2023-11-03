import express from 'express'
const router = express.Router()

router.post("/", (req, res) => {
    res.status(200).json({ message: "TODO" })
})

router.get("/:userId", (req, res) => {
    res.status(200).json({ message: "TODO" })
})

export default router