declare namespace threads {
  function start(action: Function): Thread
  function shutDownAll(): void
  function currentThread(): Thread
  function disposable(): Disposable
  function atomic(initialValue?: number): AtomicLong
  // 新建一个可重入锁
  function lock(): ReentrantLock
}

declare function sync(func: Function): Function

interface Thread {
  setTimeout: typeof setTimeout
  setInterval: typeof setInterval
  setImmediate: typeof setImmediate
  clearTimeout: typeof clearTimeout
  clearInterval: typeof clearInterval
  clearImmediate: typeof clearImmediate
  interrupt(): void
  /** 等待线程结束 */
  join(timeout?: number): void
  isAlive(): boolean
  /** 等待线程开始 */
  waitFor(): void
}

interface Disposable {
  setAndNotify(x: any): void
  blockedGet(): any
}

interface AtomicLong {
  getAndIncrement(): any
}

interface ReentrantLock {
  lock(): void
  unlock(): void
  newCondition(): Condition
}

interface Condition {
  signal(): void
  await(): void
}
