let {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling} = require('../util');
let {createApp} = require('../app');

let app = createApp('招行支付宝', 'com.eg.android.AlipayGphone', 'com.eg.android.AlipayGphone.AlipayLogin', () => idEndsWith('registerAccount').text('注册账号').exists());
app.add('点击朋友', (next) => {
  findAndClickIt(text('朋友'));
  next();
}).add('点击生活号', (next) => {
  findAndClickIt(text('生活号'));
  next();
}).add('点击已关注', (next) => {
  findAndClickIt(text('已关注'));
  next();
}).add('点击搜索', (next) => {
  findAndClickIt(desc('搜索生活号'));
  next();
}).add('输入招商银行信用卡', (next) => {
  let el = text('搜索生活号').className('android.widget.EditText').findOne(MAX);
  if (el == null) throw new Error();
  el.setText('招商银行信用');
  next();
}).add('点击已关注', (next) => {
  let el = text('已关注').findOne(MAX);
  if (el == null) throw new Error('请先关注招商银行信用卡生活号');
  clickControl(el);
  next();
}).add('点击积分·福利', (next) => {
  findAndClickIt(text('积分·福利'));
  next();
}).add('点击打卡领积分', (next) => {
  findAndClickIt(text('打卡领积分'));
  next();
});

module.exports = app;
