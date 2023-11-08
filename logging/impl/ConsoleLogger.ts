import AppLogger from "../AppLogger";

export default class extends AppLogger {
    tag: string

    constructor(tag: string) {
        super()
        this.tag = tag
    }

    info(msg?: any, ...trace: any[]): void {
        console.info(`INFO: [${this.tag}] `, msg, ...trace)
    }
    debug(msg?: any, ...trace: any[]): void {
        console.debug(`DEBUG: [${this.tag}] `, msg, ...trace)
    }
    warn(msg?: any, ...trace: any[]): void {
        console.warn(`WARN: [${this.tag}] `, msg, ...trace)
    }
    error(msg?: any, ...trace: any[]): void {
        console.error(`ERROR: [${this.tag}] `, msg, ...trace)
    }
}