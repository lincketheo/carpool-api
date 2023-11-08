import { AddUserResultStatus, AddUserResult } from "./models/users/AddUserResult";
import UserRepository from "../repositories/UserRepository";
import { loggerFactory } from "../logging/di";
import { GetUserResult, GetUserResultStatus } from "./models/users/GetUserResult";

export default class UserService {
    private userRepository: UserRepository
    private logger = loggerFactory.getLoggerByInstance(this)

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async addUserByName(name: string): Promise<AddUserResult> {
        const numUsers = await this.userRepository.countUsersByName(name)
        if (numUsers > 0) {
            return { status: AddUserResultStatus.Conflict }
        }
        const dbUser = await this.userRepository.addUserByName(name)
        return { status: AddUserResultStatus.Succeeded, user: dbUser }
    }

    async getUserByName(name: string): Promise<GetUserResult> {
        const user = await this.userRepository.getUserByName(name)
        if (user === null) {
            return { status: GetUserResultStatus.NotFound }
        } else {
            return { status: GetUserResultStatus.Success, user: user }
        }
    }
}