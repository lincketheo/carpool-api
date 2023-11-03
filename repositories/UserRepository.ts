import { AddUserReult } from "../../models/domain/users/AddUserResult";
import User from "../../models/domain/users/User";

export default abstract class {
    abstract addUser(user: User): AddUserReult
}