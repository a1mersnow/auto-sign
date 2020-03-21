
/**
 * ====================== events ================================
 */
type availableKeys = 'volume_up' | 'volume_down' | 'home' | 'back' | 'menu'
type availableActions = 'ACTION_UP' | 'ACTION_DOWN'
type EventListener = (...args: any[]) => void
interface EventEmitter {
  defaultMaxListeners: number
  setMaxListeners(n: number): void
  getMaxListeners(): number
  addListener(eventName: string, listener: EventListener): void
  emit(eventName: string, ...args: any[]): boolean
  eventNames(): string[]
  listenerCount(eventName: string): number
  listeners(eventName: string): EventListener[]
  on(eventName: string, listener: EventListener): EventEmitter
  once(eventName: string, listener: EventListener): EventEmitter
  prependListener(eventName: string, listener: EventListener): EventEmitter
  prependOnceListener(eventName: string, listener: EventListener): EventEmitter
  removeAllListeners(eventName?: string): EventEmitter
  removeListener(eventName: string, listener: EventListener): EventEmitter
}
type KeyEvent = {
  [key in availableActions]: number
} & {
  KEYCODE_HOME: number
  KEYCODE_BACK: number
  KEYCODE_MENU: number
  KEYCODE_VOLUME_UP: number
  KEYCODE_VOLUME_DOWN: number
  getAction(): number
  getKeyCode(): number
  getEventTime(): number
  getDownTime(): number
  keyCodeToString(keyCode: number): string
}
declare const keys: Record<availableKeys, number>

interface Notification {
  /** 通知数量 */
  number: number;
  when: number;
  getPackageName(): string;
  getTitle(): string;
  getText(): string;
  click(): void;
  delete(): void;
}

interface Toast {
  getText(): string
  getPackageName(): string
}

declare namespace events {
  function emitter(thread?: Thread): EventEmitter
  /** 启用按键监听 */
  function observeKey(): void
  function onKeyDown(keyName: availableKeys, listener: (e: KeyEvent) => void): void
  function onceKeyDown(keyName: availableKeys, listener: (e: KeyEvent) => void): void
  function onKeyUp(keyName: availableKeys, listener: (e: KeyEvent) => void): void
  function onceKeyUp(keyName: availableKeys, listener: (e: KeyEvent) => void): void
  function removeAllKeyDownListeners(keyName: availableKeys): void
  /** 当脚本退出时，会自动解除所有按键屏蔽 */
  function setKeyInterceptionEnabled(key: string, enabled: boolean): void
  function setKeyInterceptionEnabled(enabled: boolean): void
  function on(event: 'key' | 'key_down' | 'key_up', callback: (keyCode: number, event: KeyEvent) => void): void
  function on(event: 'exit', callback: () => void): void
  function on(event: 'toast', callback: (t: Toast) => void): void
  function on(event: 'notification', callback: (n: Notification) => void): void
  /** 启用通知监听 */
  function observeNotification(): void
  function onNotification(callback: (n: Notification) => void): void
  /** 启动toast监听 */
  function observeToast(): void
  let broadcast: EventEmitter
}
