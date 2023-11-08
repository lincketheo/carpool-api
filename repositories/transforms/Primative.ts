import { loggerFactory } from "../../logging/di"
import DatabaseError from "../errors/DatabaseError"

export function rawToInt(data: unknown, key: string): number {
    loggerFactory.getLoggerByString("Data To Int").debug(`Parsing ${JSON.stringify(data)} to number`)
    if (typeof data === 'object' && key in (data as any)) {
        return (data as any)[key]
    }
    throw new DatabaseError(`Couldn't parse raw: [${data}] into a number`)
}