import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU} from '../../util';
import {createApp} from '../../app';

let app = createApp('我的OPPO', 'com.oppo.usercenter', () => {
  return text('首页').exists() && text('我的').exists();
}, undefined);
app.add('点击首页', (next) => {
  findAndClickIt(text('首页'))
  next()
}).add('点击签到', (next) => {
  let el = text('签到').findOne(MAX)
  if (el) {
    clickControl(el)
    findAndClickIt(idEndsWith('close'))
  }
  next()
})

export default app;
