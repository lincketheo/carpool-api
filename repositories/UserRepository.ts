import DatabaseUser from "./models/users/DatabaseUser";

export default abstract class UserRepository {
    abstract countUsersByName(name: string): Promise<number>
    abstract addUserByName(name: string): Promise<DatabaseUser>
    abstract getUserByName(name: string): Promise<DatabaseUser | null>
}