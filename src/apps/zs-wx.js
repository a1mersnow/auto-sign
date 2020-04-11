import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling} from '../util';
import {createApp} from '../app';

let app = createApp('招行微信', 'com.tencent.mm', () => {
  return className('android.widget.TextView').text('微信').exists() && className('android.widget.TextView').text('通讯录').exists();
});
app.add('点击通讯录', (next) => {
  findAndClickIt(text('通讯录'));
  next();
}).add('点击公众号', (next) => {
  findAndClickIt(text('公众号'));
  next();
}).add('点击搜索', (next) => {
  let el = className('android.support.v7.widget.LinearLayoutCompat').findOne(MAX);
  if (el == null) throw new Error();
  let search = el.child(0);
  if (search == null) throw new Error();
  clickControl(search);
  next();
}).add('输入招商银行信用卡', (next) => {
  let el = text('搜索').findOne(MAX);
  if (!el) throw new Error();
  el.setText('招商银行信用卡');
  next();
}).add('点击搜索结果中的招商银行信用卡', (next) => {
  findAndClickIt(text('招商银行信用卡').className('android.widget.TextView'));
  next();
}).add('点击右下角', (next) => {
  click(device.width - 30, device.height - 30);
  next();
}).add('点击签到领积分', (next) => {
  findAndClickIt(className('android.widget.TextView').textMatches(/.*签到领积分.*/));
  next();
}).add('点击签到按钮', (next) => {
  findAndClickIt(text('签到按钮图片'));
  next();
});

export default app;
