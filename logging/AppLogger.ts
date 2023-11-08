export default abstract class {
    abstract info(msg?: any, ...trace: any[]): void
    abstract debug(msg?: any, ...trace: any[]): void
    abstract warn(msg?: any, ...trace: any[]): void
    abstract error(msg?: any, ...trace: any[]): void
}