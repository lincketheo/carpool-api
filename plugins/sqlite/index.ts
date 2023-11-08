import { Database, OPEN_READWRITE } from "sqlite3";
import DatabaseError from "../../repositories/errors/DatabaseError";

let db: Database

function provideInitialDb() {
    const db = new Database("./carpool.db", (err) => {
        if (err) {
            throw new DatabaseError("Couldn't create database", err)
        }
    })

    db.exec(`
    create table if not exists users (
        name text not null
    );
    `, (err) => {
        if (err) {
            throw new DatabaseError("Couldn't create tables", err)
        }
    })

    return db
}

export default function provideDatabase() {
    if (!db) {
        db = provideInitialDb()
    }
    return db
}