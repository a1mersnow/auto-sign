import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling} from '../util';
import {createApp} from '../app';

let app = createApp('招行支付宝', 'com.eg.android.AlipayGphone', 'com.eg.android.AlipayGphone.AlipayLogin', () => idEndsWith('registerAccount').text('注册账号').exists(), undefined, () => {
  const el = text('稍后再说').findOne(MAX)
  if (el != null) clickControl(el)
});
app.add('点击搜索', (next) => {
  findAndClickIt(idEndsWith('search_bg'))
  next()
}).add('输入招商银行信用卡', (next) => {
  let el = idEndsWith('search_input_box').className('android.widget.EditText').findOne(MAX);
  if (el == null) throw new Error('没有找到输入框');
  el.setText('招商银行信用卡');
  next();
}).add('点击搜索结果中的招行信用卡', (next) => {
  findAndClickIt(className('android.widget.TextView').text('招商银行信用卡'))
  next()
}).add('选择招商银行信用卡', (next) => {
  findAndClickIt(className('android.widget.TextView').clickable(false).text('招商银行信用卡'))
  next()
}).add('同意并继续', (next) => {
  const el = text('同意并继续').findOne(1000)
  if (el) {
    clickControl(el)
    next()
  } else {
    next('点击右下角')
  }
}).add('关注', (next) => {
  findAndClickIt(text('关注生活号'))
  next()
}).add('拒绝定位', (next) => {
  findAndClickIt(text('拒绝'))
  next()
}).add('点击右下角', (next) => {
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
