import {findAndClickIt, clickControl, log, backward, getNumberFromSelector, MAX} from '../util';
import {createApp} from '../app';

let app = createApp('京东金融', 'com.jd.jrapp', 'com.jd.jrapp.bm.mainbox.main.MainActivity');
let hasClickIndex = false
app.add('关闭可能的弹窗', (next) => {
  let el = idEndsWith('popup_close').findOne(MAX)
  if (el) clickControl(el)
  next('点击每日签到')
}).add('点击首页', (next) => {
  hasClickIndex = true
  let el = className('android.widget.ImageView').idEndsWith('iv_first_icon').findOne(MAX);
  if (el == null) el = className('android.widget.RelativeLayout').idEndsWith('firstLayout').findOne(MAX);
  if (el) clickControl(el);
  next();
}).add('点击每日签到', (next) => {
  let el = text('签到').findOne(MAX)
  if (el) {
    clickControl(el)
    next()
  } else {
    let mel = text('每日签到').findOne(MAX)
    if (mel) {
      clickControl(mel)
      next()
    } else {
      if (!hasClickIndex) {
        next('点击首页')
      } else {
        throw new Error('未找到每日签到入口')
      }
    }
  }
}).add('点击签到按钮', (next) => {
  findAndClickIt(textMatches(/^(.*已连续签到?\d+天.*|.*签到领钢镚.*)$/));
  next();
});

export default app;
