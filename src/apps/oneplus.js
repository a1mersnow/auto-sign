import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX} from '../util';
import {createApp} from '../app';

let app = createApp('一加社区', 'com.oneplus.bbs', 'com.oneplus.bbs.ui.activity.CommunityActivity');
app.add('点击今日签到', (next) => {
  findAndClickIt(idEndsWith('menu_check_in'));
  next();
}).add('点击第一个表情', (next) => {
  let stickersContainer = idEndsWith('gl_check_in').findOnce();
  if (stickersContainer == null) {
    return next();
  }
  let sticker = stickersContainer.child(0);
  if (sticker == null) {
    throw new Error('第一个表情不存在？')
  }
  clickControl(sticker);
  next();
}).add('转盘', (next) => {
  backward();
  findAndClickIt(idEndsWith('menu_lottery'));

  let remains = getNumberFromSelector(idEndsWith('tv_remain_times'));
  let oil = getNumberFromSelector(idEndsWith('tv_my_jia_you'));
  while (remains > 0 && oil > 9) {
    let go = idEndsWith('btn_draw_lottery').findOne(MAX);
    if (go == null) throw new Error();
    clickControl(go);
    sleep(3500 + Math.random() * 1000);
    backward();
    remains = getNumberFromSelector(idEndsWith('tv_remain_times'));
    oil = getNumberFromSelector(idEndsWith('tv_my_jia_you'));
  }
  next();
}).add('输出当前分数', (next) => {
  console.info('一加社区签到成功, 当前加油：' + getNumberFromSelector(idEndsWith('tv_my_jia_you')));
  next();
});
export default app;
