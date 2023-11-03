import User from "../../domain/users/User";

export default interface DatabaseUser {
    id: number,
    name: string,
}

export function databaseUserToDomainUser(user: DatabaseUser): User {
    return { name: user.name }
}