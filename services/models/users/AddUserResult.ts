import DatabaseUser from "../../../repositories/models/users/DatabaseUser";

export enum AddUserResultStatus {
    Succeeded,
    Conflict,
}

export interface AddUserResult {
    status: AddUserResultStatus,
    user?: DatabaseUser,
}