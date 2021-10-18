import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling} from '../util';
import {createApp} from '../app';

let app = createApp('云闪付', 'com.unionpay', () => {
  return text('首页').exists() && text('我的').exists();
}, undefined, () => {
  let el = text('稍候再说').findOne(MAX)
  if (el) {
    clickControl(el, true)
  }
});
app.add('点击我的', (next) => {
  findAndClickIt(text('我的'));
  next();
}).add('点击签到入口', next => {
  let el = idEndsWith('iv_sign_in_down').findOne(MAX)
  if (el == null) {
    el = idEndsWith('iv_sign_in').findOnce()
  }
  if (!el) throw new Error()
  clickControl(el)
  sleep(2000)
  next()
}).add('点击立即签到', next => {
  findAndClickIt(textMatches(/^立即签到$|^邀请好友签到$/))
  next()
})

export default app;
