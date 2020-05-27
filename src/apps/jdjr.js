import {findAndClickIt, clickControl, log, backward, getNumberFromSelector, MAX} from '../util';
import {createApp} from '../app';

let app = createApp('京东金融', 'com.jd.jrapp', 'com.jd.jrapp.bm.mainbox.main.MainActivity');
app.add('点击首页', (next) => {
  let el = className('android.widget.ImageView').idEndsWith('iv_first_icon').findOne(MAX);
  if (el == null) el = className('android.widget.RelativeLayout').idEndsWith('firstLayout').findOne(MAX);
  if (el) clickControl(el);
  next();
}).add('点击每日签到', (next) => {
  let el = className('android.widget.TextView').text('签到').findOne(MAX)
  if (el == null) el = className('android.widget.TextView').text('每日签到').findOne(MAX)
  if (el) {
    clickControl(el)
  } else {
    let el = idEndsWith('banner_view_pager').findOne(MAX)
    if (el == null) throw new Error('banner_view_pager not found')
    let c = el.child(0)
    if (c == null) throw new Error('recyclerview not found')
    let i = c.child(4)
    if (i == null) throw new Error('menu item not found')
    clickControl(i)
  }
  next();
}).add('点击签到按钮', (next) => {
  findAndClickIt(textMatches(/^(.*已连续签到\d+天.*|.*签到领钢镚.*)$/));
  next();
});

export default app;
