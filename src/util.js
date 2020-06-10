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
  var myDate = new Date();
  ui.run(() => {
    var newText = w.WZ.getText() + '\n' + ('0' + myDate.getHours()).slice(-2) + "时" + ('0' + myDate.getMinutes()).slice(-2) + "分" + ('0' + myDate.getSeconds()).slice(-2) + "秒：" + message
    var newArr = newText.split('\n').filter(function (x) {return x}).slice(-8)
    w.WZ.setText(newArr.join('\n'));
    return true;
  });
}

var w = floaty.rawWindow(
  `<vertical bg="#80000000">
    <text text="─ 当前脚本运行日志 ─" textSize="15" color="#FFFFFF" textStyle="bold" gravity="center" margin="0 0 0 5"/>
    <ScrollView>
      <text id="WZ" text="" textSize="15" color="#FFFFFF" marginLeft="10" marginBottom="10"  gravity="left"/>
    </ScrollView>
  </vertical>`
);
var logHeight = 700
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
  sibling,
  clickControl,
  inputPasswordByGestrueOfCon
}
