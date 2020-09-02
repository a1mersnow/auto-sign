import {findAndClickIt, clickControl, backward, output, getNumberFromSelector, MAX, sibling, scrollL} from '../util';
import {createApp} from '../app';

let app = createApp('掌上生活App', 'com.cmbchina.ccd.pluto.cmbActivity', () => {
  return text('我的').exists() && text('金融').exists();
}, undefined, undefined, () => {
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
app.add('点击我的', (next) => {
  findAndClickIt(text('我的'));
  next();
}).add('关闭可能的弹窗', next => {
  const el = idEndsWith('_close').findOne(MAX)
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
  if (text('忘记手势密码').exists()) {
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
  let welcom = className('android.widget.TextView').text('欢迎回来').findOne(MAX);
  if (welcom == null) throw new Error('A');
  let p = welcom.parent();
  if (p == null) throw new Error('B');
  let c = sibling(p, 4);
  if (c == null) throw new Error('C');
  let t = c.child(0);
  if (t == null) throw new Error('D');
  inputPassword(t, password);
  next();
}).add('点击签到按钮', (next) => {
  let t = className('android.view.View').text('活动规则').findOne(MAX * 2);
  if (t == null) throw new Error('活动规则控件未找到');
  let signBtn = sibling(t, 1);
  if (signBtn == null) throw new Error('签到按钮未找到');
  clickControl(signBtn, true);
  sleep(300);
  clickControl(signBtn, true);
  backward();
  next();
}).add('输出积分', (next) => {
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

export default app;
