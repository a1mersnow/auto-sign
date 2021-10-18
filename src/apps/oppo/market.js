import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU} from '../../util';
import {createApp} from '../../app';

let app = createApp('OPPO商城', 'com.oppo.store', () => {
  return text('首页').exists() && text('我的').exists();
}, undefined);
app.add('点击我的', (next) => {
  findAndClickIt(text('我的'))
  next()
}).add('点击签到入口', (next) => {
  let el = text('签到').findOne(MAX)
  if (el) {
    clickControl(el)
  }
  next()
}).add('点击立即签到', (next) => {
  let el = text('立即签到').findOne(MAX)
  if (el) {
    clickControl(el)
    sleep(2000)
  }
  next()
})

export default app;
