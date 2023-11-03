import { AddUserResultStatus, AddUserReult } from "../models/domain/users/egress/AddUserResult";
import { GetUserResult, GetUserResultStatus } from "../models/domain/users/egress/GetUserResult";
import User from "../models/domain/users/User";
import UserRepository from "../repositories/UserRepository";

export default class UserService {
    userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    addUser(user: User): AddUserReult {
        return { status: AddUserResultStatus.Failed }
    }

    getUserByName(name: string): GetUserResult {
        return { status: GetUserResultStatus.Failed }
    }
}