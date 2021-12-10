import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU} from '../../util';
import {createApp} from '../../app';

let app = createApp('OPPO视频', 'com.heytap.yoli', () => {
  return text('影视').exists() && text('我的').exists();
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
}).add('点击签到第二层入口', (next) => {
  let el = textContains('去签到').findOne(MAX)
  if (el) {
    clickControl(el)
  }
  next()
}).add('点击签到', (next) => {
  let el = text('签到').findOne(MAX)
  if (el) {
    clickControl(el)
  }
  next()
})

export default app;
