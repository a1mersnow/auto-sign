import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU} from '../../util';
import {createApp} from '../../app';

let app = createApp('OPPO软件商店', 'com.heytap.market', () => {
  return text('首页').exists() && text('我的').exists();
}, undefined);
app.add('点击我的', (next) => {
  findAndClickIt(text('我的'))
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
