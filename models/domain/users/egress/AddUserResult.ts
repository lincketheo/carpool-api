import User from "../../database/users/User";

export enum AddUserResultStatus {
    Succeeded,
    Failed
}

export interface AddUserReult {
    status: AddUserResultStatus,
    user?: User,
}