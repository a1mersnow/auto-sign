// 最大搜索时间
const MAX = 5000;

/**
 *
 * @param {UiSelector} selector
 */
function getNumberFromSelector(selector) {
  let remainsEl = selector.findOne(MAX / 2);
  sleep(100);
  if (remainsEl == null) remainsEl = selector.findOne(MAX / 2);
  if (remainsEl == null) throw new Error('Error from getNumberFromSelector: no el found');
  let match = remainsEl.text().match(/\d+/);
  if (!match) throw new Error('Error from getNumberFromSelector: no number found');
  return +match[0];
}

/**
 * @param {UiSelector} selector
 */
function findAndClickIt(selector) {
  let el = selector.findOne(MAX / 2);
  sleep(100);
  if (el == null) el = selector.findOne(MAX / 2);
  if (el == null) throw new Error();
  clickControl(el);
}

/**
 * @param {String} packageName
 * @param {string | (() => boolean)} condition
 * @param {(() => boolean) | void} quitCondition
 * @param {boolean} clickCenter
 */
function launchPackage (packageName, condition, quitCondition, clickCenter) {
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
  if (clickCenter) {
    click(device.width / 2, device.height / 2);
    sleep(1000);
    if (!resolvedCondition()) {
      backward();
    }
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
  if (step == null) step = 0
  sleep(500);
  /** @type {() => boolean} */
  let resolvedCondition;
  if (typeof condition === 'string') {
    resolvedCondition = () => currentActivity() === condition;
  } else {
    resolvedCondition = condition;
  }
  if (resolvedCondition()) return;
  if (step >= maxStep) throw new Error('超过最大返回次数限制，`回到首页`操作未能完成');
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
 * @param  {string} message
 */
function log(message) {
  console.verbose(message)
  logToFloaty(message, 'info')
}

/**
 * @param {string} message
 */
function error (message) {
  console.error(message)
  logToFloaty(message, 'error')
}

/**
 * @param {string} message
 * @param {string} type
 */
function logToFloaty (message, type) {
  var now = new Date();
  var time = ('0' + now.getHours()).slice(-2) + "时" + ('0' + now.getMinutes()).slice(-2) + "分" + ('0' + now.getSeconds()).slice(-2) + "秒"
  message = time + message
  ui.run(() => {
    var el = getEmpty(w)
    if (el) {
      // @ts-ignore
      el.setTextColor(({
        // @ts-ignore
        'error': android.graphics.Color.RED,
        // @ts-ignore
        'info': android.graphics.Color.WHITE
      })[type])
      el.setText(message)
    } else {
      for (var i = 0; i < 9; i++) {
        w['WZ' + i].setTextColor(w['WZ' + (i + 1)].getCurrentTextColor())
        w['WZ' + i].setText(w['WZ' + (i + 1)].getText())
      }
      // @ts-ignore
      w.WZ9.setTextColor(({
        // @ts-ignore
        'error': android.graphics.Color.RED,
        // @ts-ignore
        'info': android.graphics.Color.WHITE
      })[type])
      w.WZ9.setText(message)
    }
    return true;
  });
}

/**
 * @param {*} w
 */
function getEmpty (w) {
  for (var i = 0; i < 10; i++) {
    if (!w['WZ' + i].getText()) {
      return w['WZ' + i]
    }
  }
  return null
}

var w = floaty.rawWindow(
  `<vertical bg="#ec0014" alpha="0.8" paddingBottom="15">
    <text text="─ 当前脚本运行日志 ─" textSize="15" color="#FFFFFF" textStyle="bold" gravity="center" margin="0 0 0 5"/>
    <text id="WZ0" textSize="13" color="#FFFFFF" marginLeft="10" marginBottom="0"  gravity="left"/>
    <text id="WZ1" textSize="13" color="#FFFFFF" marginLeft="10" marginBottom="0"  gravity="left"/>
    <text id="WZ2" textSize="13" color="#FFFFFF" marginLeft="10" marginBottom="0"  gravity="left"/>
    <text id="WZ3" textSize="13" color="#FFFFFF" marginLeft="10" marginBottom="0"  gravity="left"/>
    <text id="WZ4" textSize="13" color="#FFFFFF" marginLeft="10" marginBottom="0"  gravity="left"/>
    <text id="WZ5" textSize="13" color="#FFFFFF" marginLeft="10" marginBottom="0"  gravity="left"/>
    <text id="WZ6" textSize="13" color="#FFFFFF" marginLeft="10" marginBottom="0"  gravity="left"/>
    <text id="WZ7" textSize="13" color="#FFFFFF" marginLeft="10" marginBottom="0"  gravity="left"/>
    <text id="WZ8" textSize="13" color="#FFFFFF" marginLeft="10" marginBottom="0"  gravity="left"/>
    <text id="WZ9" textSize="13" color="#FFFFFF" marginLeft="10" marginBottom="0"  gravity="left"/>
  </vertical>`
);
// @ts-ignore
console.warn(android.graphics.Color.RED)
var logHeight = 760
w.setSize(device.width, logHeight);
w.setTouchable(false);
w.setPosition(0, device.height - logHeight);

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

function clickClose() {
  let closeAd = idMatches(/.*[Cc]lose.*/).findOnce();
  let index = 0
  while (closeAd && index < 3) {
    clickControl(closeAd);
    index++;
    sleep(1000);
    closeAd = idMatches(/.*[Cc]lose.*/).findOnce();
  }
}

export {
  clickClose,
  MAX,
  getNumberFromSelector,
  findAndClickIt,
  backToHome,
  launchPackage,
  backward,
  log,
  error,
  sibling,
  clickControl,
  inputPasswordByGestrueOfCon
}
