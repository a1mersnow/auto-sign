import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU} from '../../util';
import {createApp} from '../../app';

let app = createApp('OPPO游戏中心', 'com.nearme.gamecenter', () => {
  return text('首页').exists() && text('我的').exists();
}, undefined);
app.add('点击我的', (next) => {
  findAndClickIt(text('我的'))
  next()
}).add('点击签到', (next) => {
  let el = textContains('签到').findOne(MAX)
  if (el) {
    clickControl(el)
    findAndClickIt(idEndsWith('close'))
    sleep(2000)
  }
  next()
})

export default app;
