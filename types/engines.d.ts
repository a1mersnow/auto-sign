

/**
 * ====================== engines =============================
 */
interface paramScriptConfig {
  /** ms 默认0 */
  delay: number;
  /** 默认1 0为无限循环 */
  loopTimes: number;
  interval: number;
  /** 指定脚本运行的目录
   * 这些路径会用于require时寻找模块文件 */
  path: string | string[];
}
interface ScriptConfig {
  /** ms 默认0 */
  delay: number;
  /** 默认1 0为无限循环 */
  loopTimes: number;
  interval: number;
  /** 指定脚本运行的目录
   * 这些路径会用于require时寻找模块文件 */
  getPath(): string[];
}
interface ScriptExecution {
  getEngine(): ScriptEngine;
  getConfig(): ScriptConfig;
}
interface ScriptSource {

}
interface ScriptEngine {
  execArgv: any;
  forceStop(): void;
  cwd(): null | string;
  getSource(): ScriptSource;
  emit(eventName: string, ...args: any[]): void;
}
declare namespace engines {
  function execScript(name: string, script: string, config?: paramScriptConfig): ScriptExecution
  function execScriptFile(path: string, config?: paramScriptConfig): ScriptExecution
  /** 运行.auto录制文件 */
  function execAutoFile(path: string, config?: paramScriptConfig): ScriptExecution
  function stopAll(): void
  function stopAllAndToast(): void
  function myEngine(): ScriptEngine
  function all(): ScriptEngine[]
}
