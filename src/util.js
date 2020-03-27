// 最大搜索时间
const MAX = 3000;
exports.MAX = MAX;

/**
 *
 * @param {UiSelector} selector
 */
function getNumberFromSelector(selector) {
  let remainsEl = selector.findOne(MAX);
  if (remainsEl == null) throw new Error();
  let match = remainsEl.text().match(/\d+/);
  if (!match) throw new Error();
  return +match[0];
}

/**
 * @param {UiSelector} selector
 */
function findAndClickIt(selector) {
  let el = selector.findOne(MAX);
  if (el == null) throw new Error();
  clickControl(el);
}

/**
 * @param {String} packageName
 * @param {string | (() => boolean)} condition
 * @param {(() => boolean) | void} quitCondition
 */
function launchPackage (packageName, condition, quitCondition) {
  let resolvedCondition;
  if (typeof condition === 'string') {
    resolvedCondition = () => currentActivity() === condition;
  } else {
    resolvedCondition = condition;
  }
  let resolvedQuitCondition = quitCondition || (() => false)
  sleep(1000);
  let b = app.launchPackage(packageName);
  if (!b) throw new Error('app启动失败');
  // app双开处理
  let resolver = id('android:id/resolver_list').findOne(1000);
  if (resolver) {
    let apps = resolver.find(className('android.widget.LinearLayout').clickable());
    clickControl(apps[0]);
  }
  // app更新可能重新进入引导页
  let leap = text('跳过').findOnce();
  if (leap) {
    clickControl(leap);
    sleep(2000);
  }
  let index = 5;
  while (!resolvedQuitCondition() && !resolvedCondition() && index > 0) {
    sleep(1000);
    index--;
  }
  if (resolvedQuitCondition()) {
    throw new Error('该app未登录或不满足继续下去的条件');
  }
  // 点击中心，消除可能的弹窗
  click(device.width / 2, device.height / 2);
  sleep(1000);
  while (!resolvedCondition()) {
    backward();
  }
}


/**
 *
 * @param {string | (() => boolean)} condition
 * @param {number=} maxStep
 * @param {number=} step
 */
function backToHome(condition, maxStep, step) {
  if (maxStep == null) maxStep = 12;
  sleep(500);
  /** @type {() => boolean} */
  let resolvedCondition;
  if (typeof condition === 'string') {
    resolvedCondition = () => currentActivity() === condition;
  } else {
    resolvedCondition = condition;
  }
  if (resolvedCondition()) return;
  if (step === maxStep) return;
  if (step == null) step = 0
  backward();
  backToHome(resolvedCondition, maxStep, step + 1);
}

/**
 * @param {UiObject} x
 * @param {boolean=} flag
 */
function clickControl(x, flag) {
  if (!flag && x.click()) {
    sleep(1000);
    return;
  }
  let rect = x.bounds();
  while(!click(rect.centerX(), rect.centerY()));
  sleep(1000);
}

/**
 *
 * @param {UiObject} x
 * @param {number} i
 */
function sibling(x, i) {
  let p = x.parent()
  if (p) {
    return p.child(i)
  }
  return null
}

function backward() {
  sleep(500);
  back();
  sleep(500);
}

/**
 * @param  {string} x
 */
function log(x) {
  console.verbose(x)
}

/**
 *
 * @param {UiCollection} points
 * @param {string} password
 */
function inputPasswordByGestrueOfCon (points, password) {
  // @ts-ignore
  gesture.apply(null, [password.length * 500].concat(
    // @ts-ignore
    password.split('').map((number) => {
      let el = points[+number - 1];
      let bs = el.bounds();
      return [bs.centerX(), bs.centerY()];
    })
  ));
}

module.exports = {
  MAX,
  getNumberFromSelector,
  findAndClickIt,
  backToHome,
  launchPackage,
  backward,
  log,
  sibling,
  clickControl,
  inputPasswordByGestrueOfCon
}
