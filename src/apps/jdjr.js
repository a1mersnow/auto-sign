let {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX} = require('../util');
let {createApp} = require('../app');

let app = createApp('京东金融', 'com.jd.jrapp', 'com.jd.jrapp.bm.mainbox.main.MainActivity');
app.add('点击我的', (next) => {
  findAndClickIt(idEndsWith('firstLayout'));
  next();
}).add('点击每日签到', (next) => {
  findAndClickIt(text('每日签到'));
  next();
}).add('点击签到按钮', (next) => {
  findAndClickIt(textMatches(/^(已连续签到\d+天|签到领钢镚.*)$/));
  next();
});

module.exports = app;
