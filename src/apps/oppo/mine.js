import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU} from '../../util';
import {createApp} from '../../app';

let app = createApp('我的OPPO', 'com.oplus.vip', () => {
  return text('首页').exists() && text('我的').exists();
}, undefined);
app.add('点击首页', (next) => {
  findAndClickIt(text('首页'))
  next()
}).add('点击签到入口', (next) => {
  let el = textContains('签到').findOne(MAX)
  if (el) {
    clickControl(el)
  }
  next()
}).add('点击签到', (next) => {
  let el = text('签到').findOne(MAX)
  if (el) {
    clickControl(el)
    sleep(1500)
    let close = idEndsWith('close').findOnce()
    if (close) {
      clickControl(close)
      sleep(1000)
    }
  }
  next()
})

export default app;
