

/**
 * ==================== 设备 ==========================
 * 此模块的部分函数，例如调整音量，需要"修改系统设置"的权限
 */

declare namespace device {
  let width: number
  let height: number
  /** 修订版本号 */
  let buildId: string
  /** 主板型号 */
  let broad: string
  /** 厂商 */
  let brand: string
  /** 工业设计名称 */
  let device: string
  /** 设备型号 */
  let model: string
  /** 产品名称 */
  let product: string
  /** bootloader版本 */
  let bootloader: string
  /** 设备硬件名称 */
  let hardware: string
  /** 构建唯一标识 */
  let fingerprint: string
  /** 硬件序列号 */
  let serial: string
  /** 安卓api版本 */
  let sdkInt: number
  /** git hash */
  let incremental: string
  /** android version */
  let release: string
  /** The base OS build the product is based on */
  let baseOS: string
  /** 安全补丁程序级别 */
  let securityPatch: string
  /** 发行代号 */
  let codename: string
  function getIMEI(): string
  /** Android ID为一个用16进制字符串表示的64位整数，在设备第一次使用时随机生成，之后不会更改，除非恢复出厂设置 */
  function getAndroidId(): string
  /** wifi下才能获取 */
  function getMacAddress(): string | null
  /** 当前手动亮度 0-255 */
  function getBrightness(): number
  /** 返回当前亮度模式，0为手动亮度，1为自动亮度 */
  function getBrightnessMode(): 0 | 1
  function setBrightness(b: number): void
  function setBrightnessMode(mode: 0 | 1): void
  /** 媒体音量 */
  function getMusicVolume(): number
  /** 通知音量 */
  function getNotificationVolume(): number
  /** 闹钟音量 */
  function getAlarmVolume(): number
  /** 媒体最大音量 */
  function getMusicMaxVolume(): number
  /** 通知最大音量 */
  function getNotificationiMaxVolume(): number
  /** 闹钟最大音量 */
  function getAlarmMaxVolume(): number
  function setMusicVolume(volume: number): void
  function setNotificationVolume(volume: number): void
  function setAlarmVolume(volume: number): void
  /** 当前电量 */
  function getBattery(): number
  function isCharging(): boolean
  /** 全部内存：字节 */
  function getTotalMem(): number
  /** 可用内存：字节 */
  function getAvailMem(): number
  /** 屏幕是否是亮的 */
  function isScreenOn(): boolean
  /** 点亮屏幕 */
  function wakeUp(): void
  /** 如果屏幕没有点亮就点亮 */
  function wakeUpIfNeeded(): void

  /**
   *
   * @param timeout 不传常亮
   */
  function keepScreenOn(timeout?: number): void

  /** 允许屏幕变暗 */
  function keepScreenDim(timeout?: number): void

  /** 取消设备保持唤醒 */
  function cancelKeepingAwake(): void

  /** 震动 */
  function vibrate(millis: number): void

  /** 取消震动 */
  function cancelVibration(): void
}
