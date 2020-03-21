
/**
 * =========================== app ================================
 */
declare namespace app {
  /** 当前软件版本号 */
  let versionCode: number;
  /** 当前软件版本名称 */
  let versionName: string;
  let autojs: {
    /** autojs版本号 */
    versionCode: number;
    /** autojs版本名称 */
    versionName: string;
  }
  function openAppSetting (packageName: string): void
  function launchApp (appName: string): boolean
  function launch (packageName: string): boolean
  /** 通过应用包名启动应用 */
  function launchPackage (packpageName: string): boolean
  /** 获取应用包名 */
  function getPackageName (appName: string): string | null
  /** 获取应用名称 */
  function getAppName (packageName: string): string | null
  /** 用其他应用查看文件 */
  function viewFile (path: string): void
  /** 用其他应用编辑文件 */
  function editFile (path: string): void
  /** 卸载应用 */
  function uninstall (packageName: string): void
  /** 用浏览器打开网站 */
  function openUrl (url: string): void

  interface emailOptions {
    email: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    text: string;
    /** 附件路径 */
    attachment: string
  }
  /** 发邮件 */
  function sendEmail (options: emailOptions): void
  /** 启动autojs的特定界面 */
  function startActivity (name: 'console' | 'settings'): void

  interface intentOptions {
    /** 意图要完成的动作 当以android.intent.action开头时可省略这个前缀（例如：VIEW） */
    action: string;
    /** 意图的mimetype */
    type: string;
    /** 意图的数据，是个uri（文件路径或url） */
    data: string;
    category: Array<any>;
    packageName: string;
    /** 目标activity或service等组件的名称 */
    className: string;
    extras: object;
    /** 例如：["activity_new_task", "grant_read_uri_permission"] */
    flags: string[];
    /** 是否以root权限启动发送该intent */
    root: boolean;
  }
  interface Intent {}
  function intent (options: intentOptions): Intent
  function startActivity (options: intentOptions | Intent): void
  /** 广播intent */
  function sendBroadcast(options: intentOptions | Intent): void
  /** 启动服务 */
  function sendService(options: intentOptions | Intent): void
  /** 触发autojs布局分析 */
  function sendBroadcast(name: 'inspect_layout_hierarchy' | 'inspect_layout_bounds'): void
  /** 构造一个intent，转换为对应的shell的intent命令的参数 */
  function intentToShell (options: intentOptions | Intent): any
  type Uri = any;
  /** 例如 file:///sdcard/1.txt */
  function parseUri (uri: string): Uri
  /** 例如 /sdcard/1.txt */
  function getUriForFile (path: string): Uri

}

/** 通过应用包名启动应用 */
declare const openAppSetting: typeof app.openAppSetting

/** 通过应用名称启动应用 */
declare const launchApp: typeof app.launchApp

/** 打开应用的设置详情页 */
declare const launch: typeof app.launch
