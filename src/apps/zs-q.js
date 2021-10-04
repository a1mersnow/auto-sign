import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, log} from '../util';
import {createApp} from '../app';

let app = createApp('招财积分猫', 'com.tencent.mm', () => {
  return className('android.widget.TextView').text('微信').exists() && className('android.widget.TextView').text('通讯录').exists();
}, undefined, false);
app.add('点击发现', (next) => {
  findAndClickIt(text('发现'));
  next();
}).add('点击搜索', (next) => {
  let el = desc('搜索').findOne(MAX);
  if (el == null) throw new Error();
  clickControl(el, true);
  next();
}).add('输入招财积分猫', (next) => {
  let el = text('搜索').findOne(1000);
  if (!el) el = text('搜索小程序').findOne(MAX);
  if (!el) throw new Error();
  el.setText('招财积分猫');
  next();
}).add('点击搜索结果中的招财积分猫', (next) => {
  findAndClickIt(text('招财积分猫').className('android.widget.TextView'));
  next();
}).add('等广告', (next) => {
  sleep(8000);
  storages.remove('zs-q');
  next();
}).add('获取招商银行每日答题的答案', (next) => {
  let t = textMatches(/^.*\d{1,2}\.\d{1,2}\s*?每日答题.*$/).findOne(MAX);
  if (t) {
    let c = t.parent()
    if (c) {
      let a = c.findOne(textMatches(/^.*答案：[A-Z-]+.*$/))
      if (a) {
        let answer = a.text();
        let m = /^.*答案：([A-Z-]+).*$/.exec(answer);
        let mm = m && m[1];
        if (mm) {
          storages.create('zs-q').put('zsyh', mm);
          log('招商银行答案：' + mm);
        }
      }
    }
  }
  next()
}).add('获取掌上生活每日答题的答案', (next) => {
  let tab = text('掌上答案').findOne(MAX);
  if (tab == null) throw new Error('掌上生活tab未找到')
  clickControl(tab);
  sleep(500);
  let t = textMatches(/^.*\d{1,2}\.\d{1,2}\s*?每日答题.*$/).find();
  if (t.length) {
    let c = t[1].parent()
    if (c) {
      let a = c.findOne(textMatches(/^.*答案：[A-Z-]+.*$/))
      if (a) {
        let answer = a.text();
        let m = /^.*答案：([A-Z-]+).*$/.exec(answer);
        let mm = m && m[1];
        if (mm) {
          storages.create('zs-q').put('zssh', mm);
          log('掌上生活答案：' + mm);
        }
      }
    }
  }
  next()
});

export default app;
