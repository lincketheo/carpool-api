import { Database } from "sqlite3";
import { AddUserReult } from "../../../models/domain/users/AddUserResult";
import User from "../../../models/domain/users/User";
import UserRepository from "../../UserRepository";

export default class extends UserRepository {
    db: Database

    constructor(db: Database) {
        super()
        this.db = db
    }

    addUser(user: User): AddUserReult {
        let ret: AddUserReult

        this.db.serialize(() => {
            const stmt = this.db.prepare('INSERT INTO users VALUES (?)')
            stmt.run(user.name)
            stmt.finalize()
        })
    }
}