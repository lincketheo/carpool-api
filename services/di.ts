import provideDatabase from "../plugins/sqlite"
import UserRepository from "../repositories/impl/sqlite3/UserRepository"
import UserService from "./UserService"

export function provideUserService() {
    return new UserService(new UserRepository(provideDatabase()))
}