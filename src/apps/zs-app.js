import {findAndClickIt, clickControl, backward, output, getNumberFromSelector, MAX, sibling, scrollL, log} from '../util';
import {createApp} from '../app';

let app = createApp('掌上生活App', 'com.cmbchina.ccd.pluto.cmbActivity', () => {
  return text('我的').exists() && text('金融').exists();
}, undefined, () => {
  let el = idEndsWith('tv_cancel').findOnce()
  if (el) clickControl(el)
}, () => {
  const el = idEndsWith('rg_content').findOne(1000)
  if (el) {
    swipe(device.width - 100, device.height / 2, 100, device.height / 2, 300)
    sleep(500)
    swipe(device.width - 100, device.height / 2, 100, device.height / 2, 300)
    sleep(500)
    swipe(device.width - 100, device.height / 2, 100, device.height / 2, 300)
    sleep(500)
  }
});
app.add('关闭升级提示', next => {
  const el = text('暂不体验').findOne(1000)
  if (el) clickControl(el, true)
  next()
}).add('关闭可能的弹窗', next => {
  const el = idEndsWith('_close').findOne(1000)
  if (el) clickControl(el)
  next()
}).add('点击我的', (next) => {
  findAndClickIt(text('我的'));
  next();
}).add('关闭升级提示', next => {
  const el = text('暂不体验').findOne(1000)
  if (el) clickControl(el, true)
  next()
}).add('关闭可能的弹窗', next => {
  const el = idEndsWith('_close').findOne(1000)
  if (el) clickControl(el)
  next()
}).add('点击签到按钮', (next) => {
  let t = text('资料管理').findOne(MAX);
  if (t == null) throw new Error();
  let c = t.parent();
  if (c == null) throw new Error();
  let x = sibling(c, 2);
  if (x == null) throw new Error();
  clickControl(x);
  sleep(5000);
  next();
}).add('判断登陆状态', (next) => {
  if (text('每日签到').exists()) {
    next('点击签到按钮');
  } else {
    next();
  }
}).add('判断有没有指纹', (next) => {
  if (text('忘记手势密码').exists() || text('更多').exists()) {
    next('输入图案密码');
  } else {
    next();
  }
}).add('点击取消和切换登陆方式', (next) => {
  findAndClickIt(text('取消'));
  findAndClickIt(text('切换登录方式'));
  next();
}).add('输入图案密码', (next) => {
  let password = storages.create('password').get('password');
  if (!password) throw new Error('未曾输入过密码');
  let t = className('android.view.View').depth(8).findOnce();
  if (!t) {
    let all = className('android.view.View').depth(7).find();
    if (all.length) {
      t = all[1]
    }
  }

  if (!t) throw new Error('no input area')

  inputPassword(t, password);
  next();
}).add('点击签到按钮', (next) => {
  sleep(5000)
  let signBtn = text("签到").findOne(MAX);
  if (signBtn) {
    clickControl(signBtn, true);
  }
  sleep(300);
  backward();
  sleep(1000);
  next();
}).add('答题', next => {
  /** @type string */
  let answer = storages.create('zs-q').get('zssh')
  if (!answer) {
    log('没找到答案')
    return next();
  }
  let t = text('积分').findOne(MAX);
  if (t) {
    clickControl(t, true)
    sleep(2000)
    if (clickQAEntry()) {
      log('等20s...')
      sleep(20000)
      click(device.width / 2, device.height / 3)
      let box = className('android.webkit.WebView').text('积分答题').findOne(1000);
      if (!box) return
      let fix = box.bounds().top
      sleep(1000)
      checkIt(answer)
      click(device.width / 2, device.height - 30)
      sleep(1000)
      confirmCheck(fix)
    }
  }
  next();
}).add('输出积分', (next, tools) => {
  tools.backHome()
  let t = text('积分').findOne(MAX);
  if (t == null) throw new Error('积分二字未找到');
  let score = sibling(t, 0);
  if (score == null) throw new Error('积分数字未找到');
  sleep(1000);
  output('招行积分：' + score.text());
  next();
});

/**
 * @param {UiObject} c
 * @param {string} password
 */
function inputPassword(c, password) {
  let rect = c.bounds();
  let points = password.split('').map((number) => getPoint(rect, +number))
  // @ts-ignore
  gesture.apply(null, [password.length * 500].concat(points));
}

/**
 * @param {Rect} rect
 * @param {number} number
 * @returns {[number, number]}
 */
function getPoint(rect, number) {
  let xunit = rect.width() / 6;
  let yunit = rect.height() / 6;
  let yc = Math.floor((number - 1) / 3);
  let xc = (number - 1) % 3;
  let left = rect.left;
  if (rect.width() > rect.height()) {
    let d = rect.width() - rect.height();
    left += d / 2;
  }
  return [
    left + ((2 * xc) + 1) * xunit,
    rect.top + ((2 * yc) + 1) * yunit
  ]
}

function clickQAEntry () {
  try {
    let c = idEndsWith('mall_sec_page_recommend_top_scrolling_view').findOne(2000)
    // @ts-ignore
    let el = c.child(6).child(0).child(1)
    if (el) clickControl(el, true)
    return !!el
  } catch (e) {
    return false
  }
}

/**
 * @param {string} answer
 */
 function checkIt (answer) {
  /** @type {{[index: string]: number}} */
  let map = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
  }
  let index = map[answer]
  let capture = images.captureScreen()

  let firstPoint = images.findColorEquals(capture, '#1070e9', 0, 0, device.width, device.height * 3 / 4);
  if (!firstPoint) return
  let secondPoint = images.findColorEquals(capture, '#1070e9', 0, firstPoint.y + 115 / 1080 * device.width, device.width, device.width * 122 / 1080)
  if (!secondPoint) return
  let thirdPoint = images.findColorEquals(capture, '#1070e9', 0, secondPoint.y + 115 / 1080 * device.width, device.width, device.width * 122 / 1080)
  if (!thirdPoint) return
  let fourthPoint = images.findColorEquals(capture, '#1070e9', 0, thirdPoint.y + 115 / 1080 * device.width, device.width, device.width * 122 / 1080)
  if (!fourthPoint) return
  let options = [firstPoint, secondPoint, thirdPoint, fourthPoint];
  let answerPoint = options[index]
  click(answerPoint.x, answerPoint.y);
  sleep(1000)
}

/**
 * @param { number } fix
 */
function confirmCheck (fix) {
  click(device.width * 3 / 4, fix + 0.588 * (device.height - fix));
  sleep(1000)
}

export default app;
