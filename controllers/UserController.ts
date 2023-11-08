import express from 'express'
import { AddUserResultStatus } from '../services/models/users/AddUserResult'
import { provideUserService } from '../services/di'
import { randomString } from '../util/strings'
import { GetUserResultStatus } from '../services/models/users/GetUserResult'
import { loggerFactory } from '../logging/di'
const router = express.Router()

const userService = provideUserService()
const logger = loggerFactory.getLoggerByString("User Controller")

router.post("/", async (req, res) => {
    const name = randomString(10)
    logger.debug("Request to create user with name: ", name)
    const result = await userService.addUserByName(name)
    logger.debug("Result is: ", result)
    switch (result.status) {
        case AddUserResultStatus.Conflict: res.status(409).json("name already exists")
        case AddUserResultStatus.Succeeded: res.status(200).json(result.user!!)
    }
})

router.get("/:name", async (req, res) => {
    const name = req.params.name
    logger.debug("Request to get user with name: ", name)
    const result = await userService.getUserByName(name)
    logger.debug("Response is: ", result)
    switch (result.status) {
        case GetUserResultStatus.Success: res.status(200).json(result.user!!)
        case GetUserResultStatus.NotFound: res.status(404).send()
    }
})

export default router