import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU} from '../../util';
import {createApp} from '../../app';

let app = createApp('OPPO音乐', 'com.heytap.music', () => {
  return text('音乐').exists() && text('我的').exists();
}, undefined);
app.add('点击我的', (next) => {
  findAndClickIt(text('我的'))
  next()
}).add('点击签到', (next) => {
  let el = text('签到').findOne(MAX)
  if (el) {
    clickControl(el)
    sleep(2000)
  }
  next()
})

export default app;
