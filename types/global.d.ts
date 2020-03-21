/**
 * =========================== 全局变量函数 ================================
 */

/**
 * 暂停运行一段时间
 * @param n 毫秒
 */
declare function sleep (n: number): void

/** 最近一次监测到的正在运行的应用包名 */
declare function currentPackage (): string

/** 最近一次监测到的正在运行的activity */
declare function currentActivity (): string

/** 设置剪贴板 */
declare function setClip (text: string): void

/** 获取剪贴板 */
declare function getClip (): string

declare function toast (message: string): void

/** toast + log */
declare function toastLog (message: string): void

/**
 * 阻塞直到activity出现
 * @param activity
 * @param period 轮询间隔
 */
declare function waitForActivity(activity: string, period: number): void

/**
 * 阻塞直到应用出现
 * @param package
 * @param period 轮询间隔
 */
declare function waitForPackage(package: string, period: number): void

declare function exit (): never

/** 随机整数 */
declare function random (min: number, max: number): number
/** [0, 1)随机浮点数 */
declare function random (): number

/**
 * 安卓系统达不到指定版本抛异常
 * @param api android api级别
 */
declare function requiresApi (api: number): void | never

/** autojs达不到指定版本抛异常 */
declare function requiresAutojsVersion (version: string | number): void | never

type Permission = 'access_fine_location' | 'record_audio'
declare namespace runtime {
  /** 动态申请安卓权限 */
  function requestPermissions (permissions: Permission[]): void

  /**
   * 加载目标jar文件，加载成功后就可以使用该jar的类
   * // 加载jsoup.jar
   * runtime.loadJar("./jsoup.jar");
   * // 使用jsoup解析html
   * importClass(org.jsoup.Jsoup);
   * log(Jsoup.parse(files.read("./test.html")));
   */
  function loadJar(path: string): void

  /** 加载目标dex文件，加载成功后就可以使用该dex的类 */
  function loadDex(path: string): void
}

declare const context: any
