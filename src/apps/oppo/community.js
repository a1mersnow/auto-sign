import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU} from '../../util';
import {createApp} from '../../app';

let app = createApp('OPPO社区', 'com.oppo.community', () => {
  return text('首页').exists() && text('我的').exists();
}, undefined);
app.add('点击我的', (next) => {
  findAndClickIt(text('我的'))
  next()
}).add('点击签到入口', (next) => {
  findAndClickIt(idEndsWith('sign_cb'))
  next()
}).add('点击签到按钮', (next) => {
  findAndClickIt(idEndsWith('sign_btn'))
  sleep(3000)
  next()
})

export default app;
