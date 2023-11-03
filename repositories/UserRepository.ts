import DatabaseUser from "../models/database/users/DatabaseUser";
import { AddUserReult } from "../models/domain/users/egress/AddUserResult";
import { CreateNewUserRequest } from "../models/domain/users/ingress/CreateNewUserRequest";
import User from "../models/domain/users/User";

export default abstract class UserRepository {
    abstract addUser(request: CreateNewUserRequest): DatabaseUser 
}