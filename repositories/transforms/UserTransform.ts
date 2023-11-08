import DatabaseError from "../errors/DatabaseError";
import DatabaseUser from "../models/users/DatabaseUser";

export function rawToDBUser(data: unknown): DatabaseUser {
    if (typeof data === 'object' && data !== null) {
        if ('name' in (data as any) && typeof (data as any)['name'] === 'string') {
            return data as DatabaseUser
        }
    }
    throw new DatabaseError(`Couldn't parse raw: [${data}] into a Repository model`)
}