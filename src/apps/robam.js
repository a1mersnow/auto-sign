import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU} from '../util';
import {createApp} from '../app';

let app = createApp('老板微信', 'com.tencent.mm', () => {
  return className('android.widget.TextView').text('微信').exists() && className('android.widget.TextView').text('通讯录').exists();
}, undefined);
app.add('点击通讯录', (next) => {
  findAndClickIt(text('通讯录'));
  next();
}).add('点击公众号', (next) => {
  findAndClickIt(text('公众号'));
  next();
}).add('点击搜索', (next) => {
  let el = desc('搜索').findOne(MAX);
  if (el == null) throw new Error();
  clickControl(el, true);
  next();
}).add('输入老板电器', (next) => {
  let el = text('搜索').findOne(1000);
  if (!el) el = text('搜索公众号').findOne(MAX);
  if (!el) throw new Error();
  el.setText('老板电器');
  next();
}).add('点击搜索结果中的老板电器', (next) => {
  findAndClickIt(text('老板电器').className('android.widget.TextView'));
  next();
}).add('点击右下角', (next) => {
  click(device.width - 70, device.height - 70);
  next();
}).add('点击会员中心', (next) => {
  findAndClickIt(className('android.widget.TextView').textMatches(/.*会员中心.*/));
  next();
}).add('点击签到有礼', (next) => {
  findAndClickIt(text('签到有礼'));
  next()
}).add('点击签到按钮', (next) => {
  click(device.width / 2, 450)
  click(device.width / 2, 475)
  click(device.width / 2, 500)
  click(device.width / 2, 520)
  click(device.width / 2, 550)
  sleep(3000)
  next();
});

export default app;
