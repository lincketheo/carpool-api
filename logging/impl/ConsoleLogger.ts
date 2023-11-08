import { red, white, yellow } from "colors";
import AppLogger from "../AppLogger";

export default class extends AppLogger {
    tag: string

    constructor(tag: string) {
        super()
        this.tag = tag
    }

    info(msg?: any, ...trace: any[]): void {
        console.info(white(`INFO: [${this.tag}] ${msg}`), ...trace)
    }
    debug(msg?: any, ...trace: any[]): void {
        console.debug(yellow(`DEBUG: [${this.tag}] ${msg}`), ...trace)
    }
    warn(msg?: any, ...trace: any[]): void {
        console.warn(red(`%c WARN: [${this.tag}] ${msg}`), ...trace)
    }
    error(msg?: any, ...trace: any[]): void {
        console.error(red(`%c ERROR: [${this.tag}] ${msg}`), ...trace)
    }
}