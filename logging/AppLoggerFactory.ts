import AppLogger from "./AppLogger";

export default abstract class {
    abstract getLoggerByString(tag: string): AppLogger

    getLoggerByInstance(instance: any): AppLogger {
        return this.getLoggerByString(instance.constructor.name)
    }
}