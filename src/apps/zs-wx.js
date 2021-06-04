import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling} from '../util';
import {createApp} from '../app';

let app = createApp('招行微信', 'com.tencent.mm', () => {
  return className('android.widget.TextView').text('微信').exists() && className('android.widget.TextView').text('通讯录').exists();
}, undefined, false);
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
}).add('输入招商银行信用卡', (next) => {
  let el = text('搜索').findOne(1000);
  if (!el) el = text('搜索公众号').findOne(MAX);
  if (!el) throw new Error();
  el.setText('招商银行信用卡');
  next();
}).add('点击搜索结果中的招商银行信用卡', (next) => {
  findAndClickIt(text('招商银行信用卡').className('android.widget.TextView'));
  next();
}).add('点击右下角', (next) => {
  click(device.width - 70, device.height - 70);
  next();
}).add('点击签到领积分', (next) => {
  findAndClickIt(className('android.widget.TextView').textMatches(/.*签到领积分.*/));
  next();
}).add('点击签到按钮', (next) => {
  let el = text('签到背景图').findOne(MAX)
  if (!el) {
    throw new Error('未找到背景图')
  }
  let btnwrapper = sibling(el, 4)
  if (!btnwrapper) {
    throw new Error('未找到按钮块')
  }
  let btn = btnwrapper.child(0)
  if (!btn) {
    throw new Error('未找到按钮')
  }
  clickControl(btn, true)
  next();
});

export default app;
