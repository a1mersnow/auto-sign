interface setTimeoutId {}
interface setIntervalId {}
interface setImmediateId {}
declare function setTimeout(callback: Function, delay?: number, ...args: any[]): setTimeoutId
declare function setInterval(callback: Function, delay?: number, ...args: any[]): setIntervalId
declare function setImmediate(callback: Function, ...args: any[]): setImmediateId
declare function clearTimeout(id: setTimeoutId): void
declare function clearInterval(id: setIntervalId): void
declare function clearImmediate(id: setImmediateId): void
