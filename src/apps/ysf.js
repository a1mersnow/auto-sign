import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling} from '../util';
import {createApp} from '../app';

let app = createApp('云闪付', 'com.unionpay', () => {
  return text('首 页').exists() && text('我 的').exists();
}, undefined, false, () => {
  let el = text('稍候再说').findOne(MAX)
  if (el) {
    clickControl(el, true)
  }
});
app.add('点击我的', (next) => {
  findAndClickIt(text('我 的'));
  next();
}).add('点击签到入口', next => {
  findAndClickIt(idEndsWith('iv_sign_in'))
  sleep(2000)
  next()
}).add('点击立即签到', next => {
  findAndClickIt(textMatches(/^立即签到$|^今日已签到$/))
  next()
})

export default app;
