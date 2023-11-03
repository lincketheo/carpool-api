import { Database } from "sqlite3";
import DatabaseUser from "../../../models/database/users/DatabaseUser";
import { AddUserReult } from "../../../models/domain/users/egress/AddUserResult";
import { CreateNewUserRequest } from "../../../models/domain/users/ingress/CreateNewUserRequest";
import User from "../../../models/domain/users/User";
import UserRepository from "../../UserRepository";

export default class extends UserRepository {
    db: Database

    constructor(db: Database) {
        super()
        this.db = db
    }

    addUser(request: CreateNewUserRequest): DatabaseUser {
        let ret: AddUserReult
        const sql = "INSERT INTO users (name) VALUES (?) RETURNING *"
        const params = [request.name]
        this.db.all(sql, params, (err, rows) => {
            if (rows.length == 1) {
                return { name: rows[0].name }
            } else {
                throw new Error("Couldn't insert user for unknown reasons")
            }
        })
    }
}