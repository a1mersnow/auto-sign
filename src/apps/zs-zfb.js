import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling} from '../util';
import {createApp} from '../app';

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
}).add('点击搜索结果中的招行信用卡', (next) => {
  let el = text('已关注').findOne(MAX);
  if (el == null) throw new Error('请先关注招商银行信用卡生活号');
  clickControl(el);
  next();
}).add('点击积分·福利', (next) => {
  click(device.width - 70, device.height - 70);
  next();
}).add('点击签到领积分', (next) => {
  let el = textMatches(/.*签到领积分.*/).findOne(MAX);
  if (el == null) throw new Error('签到领积分按钮未找到')
  clickControl(el, true);
  next();
}).add('确认授权', (next) => {
  let el = className('android.widget.Button').text('确认授权').findOne(MAX);
  if (el) {
    clickControl(el);
  }
  next();
}).add('点击签到按钮', (next) => {
  findAndClickIt(text('签到按钮图片'));
  next();
});

export default app;
