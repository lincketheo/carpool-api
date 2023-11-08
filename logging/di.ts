import AppLogger from "./AppLogger";
import AppLoggerFactory from "./AppLoggerFactory";
import ConsoleLogger from "./impl/ConsoleLogger";

export const loggerFactory = new class extends AppLoggerFactory {
    getLoggerByString(tag: string): AppLogger {
        return new ConsoleLogger(tag)
    }
}