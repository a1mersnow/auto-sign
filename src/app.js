import {launchPackage, backToHome, log, error} from './util';

/**
 * @typedef Application
 * @property {(name: string, fn: (next: Function, tools: {backHome: Function}) => void) => Application} add
 * @property {Function} run
 * @property {Function} reset
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
 * @param {(() => any) | void} closePopup
 * @param {(() => any) | void} goThruGuide
 * @returns {Application}
 */
function createApp(appName, packageName, homePageCondition, quitCondition, closePopup, goThruGuide) {
  /** @type {[string, Function][]} */
  let steps = [];
  let index = 0;

  function init() {
    try {
      log('【' + appName + '】初始化...')
      launchPackage(packageName, homePageCondition, quitCondition, closePopup, goThruGuide);
      backToHome(homePageCondition);
      log('【' + appName + '】初始化成功');
      return 'goon';
    } catch (e) {
      if (e instanceof Error) {
        error('【' + appName + '】初始化失败：' + e.message);
        if (e.message === 'app启动失败') return 'skip'
      }
      return 'retry';
    }
  }

  /**
   * 清理
   * @param {boolean=} noBack 是否不执行返回操作
   */
  function clear(noBack) {
    index = steps.length;
    let clearFlag = true;
    if (!noBack) {
      try {
        backToHome(homePageCondition);
      } catch (e) {
        // do nothing, just ignore
        clearFlag = false;
      }
    }
    log('【' + appName + '】' + (clearFlag ? '清理完成' : '清理未完成'));
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
        log('【' + appName + '】' + steps[index][0])
        steps[index++][1](
          next,
          {
            backHome() {
              backToHome(homePageCondition);
            }
          }
        );
      } catch (e) {
        if (e instanceof Error) {
          error('【' + appName + '】' + steps[index - 1][0] + ' 失败' + (e.message ? '：' + e.message : ''));
        }
        if (isFirstRound() && app) failedTasks.push(app);
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
      let result = init();
      if (result === 'goon') {
        next();
      } else if (result === 'retry') {
        if (isFirstRound()) {
          failedTasks.push(app);
        }
        clear(true);
      } else if (result === 'skip') {
        clear(true);
      }
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
