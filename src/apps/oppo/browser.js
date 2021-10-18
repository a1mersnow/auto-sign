import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU} from '../../util';
import {createApp} from '../../app';

let app = createApp('OPPO浏览器', 'com.heytap.browser', () => {
  return text('首页').exists() && text('我的').exists();
}, undefined, () => {
  let t = textContains('轻触并按住即可').findOne(1000);
  if (t) {
    backward()
  }
  let msg = textContains('开启消息通知').findOne(1000);
  if (msg) {
    backward()
  }
});
app.add('点击我的', (next) => {
  findAndClickIt(text('我的'))
  next()
}).add('取消放置桌面提醒和开启消息通知提醒', (next) => {
  let t = textContains('轻触并按住即可').findOne(1000);
  if (t) {
    backward()
  }
  let msg = textContains('开启消息通知').findOne(1000);
  if (msg) {
    backward()
  }
  next()
}).add('点击签到', (next) => {
  findAndClickIt(idEndsWith('check_in_button'))
  sleep(3000)
  next()
})

export default app;
