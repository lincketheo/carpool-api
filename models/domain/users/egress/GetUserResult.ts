import User from "./User";

export enum GetUserResultStatus {
    NotFound,
    Failed,
    Found,
}

export interface GetUserResult {
    status: GetUserResultStatus,
    user?: User,
}