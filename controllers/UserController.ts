import express from 'express'
import { AddUserResultStatus } from '../models/domain/users/egress/AddUserResult'
import { provideUserService } from '../services/di'
const router = express.Router()

const userService = provideUserService()

router.post("/", (req, res) => {
    const result = userService.addUser({ name: req.body.name })
    switch (result.status) {
        case AddUserResultStatus.Failed: res.status(500).json("woops")
        case AddUserResultStatus.Succeeded: res.status(500).json(result.user!!)
    }
})

router.get("/:userId", (req, res) => {
    res.status(200).json({ message: "TODO" })
})

export default router