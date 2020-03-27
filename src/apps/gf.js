import {findAndClickIt, clickControl, inputPasswordByGestrueOfCon, backward, getNumberFromSelector, MAX, sibling} from '../util';
import {createApp} from '../app';

let app = createApp('发现精彩', 'com.cs_credit_bank', 'com.mapass.example.activity.MainActivity_');
app.add('点击我的', (next) => {
  findAndClickIt(idEndsWith('ll_me'));
  next();
}).add('点击签到', (next) => {
  findAndClickIt(idEndsWith('sign_tip'));
  sleep(1500);
  next();
}).add('判断登录状态', (next) => {
  let signBtn = className('android.view.View').text('签到').clickable().findOnce();
  if (signBtn) {
    clickControl(signBtn);
    next('clear');
  } else {
    next();
  }
}).add('判断登录方式', (next) => {
  let t = className('android.widget.TextView').text('请验证已有指纹').findOnce();
  if (t == null) return next();
  findAndClickIt(className('android.widget.Button').text('取消'));
  findAndClickIt(className('android.widget.TextView').text('手势登录'));
  next();
}).add('滑动输入密码', (next) => {
  let c = idEndsWith('gesture_container').findOne(MAX);
  if (c == null) throw new Error('未找到包含块');
  let ic = c.find(className('android.view.ViewGroup'));
  if (ic == null) throw new Error('未找到内部包含块');
  let points = ic.find(className('android.view.View'));
  if (points.length === 0) throw new Error('未找到密码输入区');
  /** @type {string} */
  let password = storages.create('password').get('password');
  if (!password) throw new Error('未曾输入过密码');
  inputPasswordByGestrueOfCon(points, password);
  next();
}).add('点击签到', (next) => {
  findAndClickIt(className('android.view.View').text('签到').clickable());
  next();
}).add('签到成功', (next) => {
  console.info('广发签到成功');
  next();
});

export default app;
