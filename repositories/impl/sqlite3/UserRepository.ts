import { Database } from "sqlite3";
import { loggerFactory } from "../../../logging/di";
import DatabaseError from "../../errors/DatabaseError";
import DatabaseUser from "../../models/users/DatabaseUser";
import { rawToInt as rawToNumber } from "../../transforms/Primative";
import { rawToDBUser } from "../../transforms/UserTransform";
import UserRepository from "../../UserRepository";

export default class extends UserRepository {
    db: Database

    constructor(db: Database) {
        super()
        this.db = db
    }

    countUsersByName(name: string): Promise<number> {
        const sql = "SELECT COUNT(*) AS count FROM users WHERE name = (?)"
        const params = [name]

        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all(sql, params, (err, rows) => {
                    if (err) {
                        reject(new DatabaseError("Couldn't count users by name", err))
                    } else {
                        if (rows.length == 1) {
                            const row = rows[0]
                            resolve(rawToNumber(rows[0], "count"))
                        } else {
                            reject(new DatabaseError(`Expected 1 and only 1 row in count users by name but got ${rows.length}- this is a bug`))
                        }
                    }
                })
            })
        })
    }

    addUserByName(name: string): Promise<DatabaseUser> {
        const sql = "INSERT INTO users (name) VALUES (?) RETURNING *"
        const params = [name]

        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all(sql, params, (err, rows) => {
                    if (err) {
                        reject(new DatabaseError("Couldn't add new user", err))
                    } else {
                        if (rows.length == 1) {
                            const row = rows[0]
                            resolve(rawToDBUser(rows[0]))
                        } else {
                            reject(new DatabaseError(`Expected 1 and only 1 row in insert user by name but got ${rows.length}- this is a bug`))
                        }
                    }
                })
            })
        })
    }

    getUserByName(name: string): Promise<DatabaseUser | null> {
        const sql = "SELECT * FROM users WHERE name = (?)"
        const params = [name]

        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all(sql, params, (err, rows) => {
                    if (err) {
                        reject(new DatabaseError("Couldn't get user", err))
                    } else {
                        if (rows.length == 0) {
                            resolve(null)
                        }
                        if (rows.length == 1) {
                            const row = rows[0]
                            resolve(rawToDBUser(rows[0]))
                        } else {
                            reject(new DatabaseError(`Expected 1 and or 0 in row in get user by name but got ${rows.length}- this is a bug`))
                        }
                    }
                })
            })
        })
    }
}
