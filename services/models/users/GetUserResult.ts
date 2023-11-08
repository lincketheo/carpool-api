import DatabaseUser from "../../../repositories/models/users/DatabaseUser";

export enum GetUserResultStatus {
    NotFound,
    Success,
}

export interface GetUserResult {
    status: GetUserResultStatus,
    user?: DatabaseUser,
}