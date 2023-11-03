import { Database } from "sqlite3";

let db: Database

function provideInitialDb() {
    const db = new Database(":memory:")
    db.serialize(() => {
        db.run("CREATE TABLE users (name TEXT)")
    })
    db.close()
    return db
}

export default function provideDatabase() {
    if (!db) {
        db = provideInitialDb()
    }
    return db
}