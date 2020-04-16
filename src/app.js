import {launchPackage, backToHome} from './util';

/**
 * @typedef Application
 * @property {(name: string, fn: (next: Function, tools: {backHome: Function}) => void) => Application} add
 * @property {Function} run
 * @property {Function} reset
 * @property {(x: Application | null) => void} after
 * @property {() => string} getName
 */

// 存储失败任务，等待重新运行，但是只重新运行一次
/** @type {Application[]} */
let failedTasks = []
let firstRoundFlag = false

/**
 * @param {string} appName
 * @param {string} packageName
 * @param {(() => boolean) | string} homePageCondition
 * @param {(() => boolean) | void} quitCondition
 * @param {boolean | void} clickCenter
 * @returns {Application}
 */
function createApp(appName, packageName, homePageCondition, quitCondition, clickCenter) {
  if (typeof clickCenter === 'undefined') clickCenter = true;
  /** @type {[string, Function][]} */
  let steps = [];
  let index = 0;
  /** @type {Application | null} */
  let after

  function init() {
    try {
      log('【' + appName + '】初始化...')
      launchPackage(packageName, homePageCondition, quitCondition, /** @type {boolean} */(clickCenter));
      backToHome(homePageCondition);
      log('【' + appName + '】初始化成功');
      return true;
    } catch (e) {
      log('【' + appName + '】初始化失败：' + e.message);
      return false;
    }
  }

  /**
   * 清理
   * @param {boolean=} noBack 是否不执行返回操作
   */
  function clear(noBack) {
    index = steps.length;
    if (!noBack) backToHome(homePageCondition);
    log('【' + appName + '】清理完成');
    if (after) {
      after.run();
    } else {
      log('脚本运行完毕');
    }
  }

  /**
   *
   * @param {string=} action
   */
  function next(action) {
    // 每步执行之前停1.5s
    sleep(1500);
    if (action === 'clear') {
      return clear();
    }
    if (action) {
      for (let i = 0; i < steps.length; i++) {
        if (steps[i][0] === action) {
          index = i
        }
      }
    }
    if (index < steps.length) {
      try {
        steps[index++][1](
          next,
          {
            backHome() {
              backToHome(homePageCondition);
            }
          }
        );
      } catch (e) {
        if (firstRoundFlag && app) failedTasks.push(app);
        console.error(steps[index - 1][0] + ' 失败' + (e.message ? '：' + e.message : ''));
        clear();
      }
    } else {
      clear();
    }
  }

  /** @type {Application} */
  let app = {
    /**
     * @param {string} name
     * @param {(next: Function, tools: {backHome: Function}) => void} fn
     */
    add(name, fn) {
      steps.push([name, fn]);
      return this;
    },
    run() {
      let success = init();
      if (success) {
        next();
      } else {
        clear(true);
      }
    },
    after(app) {
      after = app;
      return this;
    },
    reset() {
      index = 0;
    },
    getName () {
      return appName
    }
  }
  return app
}

/**
 * @returns {boolean}
 */
function isFirstRound() {
  return firstRoundFlag;
}

/**
 * @param {boolean} flag
 */
function setFirstRound(flag) {
  firstRoundFlag = flag;
}

export {
  createApp,
  isFirstRound,
  setFirstRound,
  failedTasks
}
