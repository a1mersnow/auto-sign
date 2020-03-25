let {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling} = require('./util');
let {createApp} = require('./app');

let app = createApp('京东购物', 'com.jingdong.app.mall', 'com.jingdong.app.mall.MainFrameActivity');
app.add('点击我的', (next) => {
  findAndClickIt(className('android.view.View').desc('我的'));
  next();
}).add('点击京豆', (next) => {
  findAndClickIt(text('京豆'));
  next();
}).add('点击去签到领京豆', (next) => {
  let t = textMatches(/^(去签到领京豆|已签到)$/).findOne(MAX);
  if (t == null) throw new Error();
  let p = t.parent();
  if (p == null) throw new Error();
  clickControl(p);
  next();
}).add('点击签到领京豆', (next) => {
  findAndClickIt(textMatches(/^(签到领京豆|已连续签到)$/));
  next();
}).add('返回京豆页面', (next) => {
  backward();
  next();
}).add('点击双签', (next) => {
  findAndClickIt(text('双签领豆'));
  next();
}).add('点击立即领取', (next) => {
  let el = text('立即领取').findOne(MAX);
  if (el) {
    clickControl(el);
    next('查看京豆数量');
  } else {
    backward();
    findAndClickIt(text('双签领豆'));
    next();
  }
}).add('点击`完成双签领取`', (next) => {
  let el = text('完成双签领取').findOne(MAX);
  if (el) {
    clickControl(el);
    next('查看京豆数量');
  } else {
    next();
  }
}).add('点击`拆开有惊喜！天天送京豆`右边的按钮', (next) => {
  let combo = () => {
    let t = text('拆开有惊喜！天天送京豆').findOne(MAX);
    if (t == null) throw new Error('文字未找到');
    let btn = sibling(t, 2);
    if (btn == null) throw new Error('按钮未找到');
    clickControl(btn);
  }
  combo();
  backward();
  findAndClickIt(text('双签领豆'));
  combo();
  next();
}).add('查看京豆数量', (next, tools) => {
  tools.backHome();
  findAndClickIt(className('android.view.View').desc('我的'));
  let t = text('京豆').findOne(MAX);
  if (t == null) throw new Error('没找到京豆二字');
  let n = sibling(t, 0);
  if (n == null) throw new Error('京豆上方没有数量');
  console.info('京豆数量：' + n.text());
  next();
});

module.exports = app;
