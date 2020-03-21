declare namespace console {
  /** 显示控制台 */
  function show(): void

  /** 隐藏控制台 */
  function hide(): void

  /** 清空控制台 */
  function clear(): void

  function log(...args: string[]): void

  /** 灰色字体的log */
  function verbose(...args: string[]): void

  /** 绿色字体的log */
  function info(...args: string[]): void

  /** 蓝色字体的log */
  function warn(...args: string[]): void

  /** 红色字体的log */
  function error(...args: string[]): void

  function assert(value: any, message: string): void | never

  function time(label: string): void
  function timeEnd(label: string): void

  /** 带有调用栈信息的log */
  function trace(...args: string[]): void

  /** 将输入值eval之后返回 */
  function input(...args: string[]): any

  function rawInput(...args: string[]): string

  function setSize(w: number, h: number): void

  function setPosition(x: number, y: number): void

  interface globalLogConfig {
    file?: string;
    maxFileSize?: number; // 字节
    rootLevel?: 'ALL' | 'OFF' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
    maxBackupSize: number; // 默认5
    filePattern?: string; // 日志写入格式
  }
  function setGlobalLogConfig(config: globalLogConfig): void

  /** 相当于log(text) */
  function print(text: string): void
}

declare const log: typeof console.log
