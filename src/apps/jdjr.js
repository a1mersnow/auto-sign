import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX} from '../util';
import {createApp} from '../app';

let app = createApp('京东金融', 'com.jd.jrapp', 'com.jd.jrapp.bm.mainbox.main.MainActivity');
app.add('点击首页', (next) => {
  let el = idEndsWith('iv_first_icon').findOne(MAX);
  if (el == null) el = idEndsWith('firstLayout').findOne(MAX);
  if (el) clickControl(el);
  next();
}).add('点击每日签到', (next) => {
  findAndClickIt(text('每日签到'));
  next();
}).add('点击签到按钮', (next) => {
  findAndClickIt(textMatches(/^(.*已连续签到\d+天.*|.*签到领钢镚.*)$/));
  next();
});

export default app;
