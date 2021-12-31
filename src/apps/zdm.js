import {findAndClickIt, clickControl, backward, getNumberFromSelector, output, MAX, sibling, scrollU, scrollD, nextSibling, log, handleDualCase} from '../util';
import {createApp} from '../app';

let app = createApp('张大妈', 'com.smzdm.client.android', () => text('首页').exists() && text('我的').exists(), undefined, () => {
  let el = idEndsWith('_close').findOne(MAX)
  if (el) clickControl(el)
  let el2 = idEndsWith('_cancel').findOne(MAX)
  if (el2) clickControl(el2)
});
app.add('点击我的', (next) => {
  findAndClickIt(idEndsWith('tab_usercenter'));
  next();
}).add('点击签到', (next) => {
  let el = idEndsWith('tv_login_sign').findOne(MAX);
  if (el) {
    clickControl(el);
    backward();
    sleep(1000);
    if (!idEndsWith('tv_login_sign').exists()) {
      backward();
      sleep(1000);
    }
  }
  next();
}).add('完成', (next) => {
  output('张大妈签到完成');
  next();
});

export default app;
