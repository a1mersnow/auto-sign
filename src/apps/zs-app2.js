import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, log} from '../util';
import {createApp} from '../app';

let app = createApp('招商银行App', 'cmb.pb', () => text('首页').exists && text('理财').exists() && text('我的').exists());
app.add('点击我的', (next) => {
  findAndClickIt(className('android.widget.TextView').text('我的'));
  next();
}).add('判断登录状态', (next) => {
  if (text('账户总览').exists()) {
    next('点击积分');
  } else {
    backward();
    next();
  }
}).add('判断登录方式', (next) => {
  if (idEndsWith('vGestureContentView').exists()) {
    next();
  } else {
    let t = className('android.widget.TextView').text('点击进行指纹解锁').findOne(MAX);
    if (t == null) return next();
    let m = className('android.widget.TextView').text('更多').findOne(MAX);
    if (m == null) throw new Error('没有找到更多');
    clickControl(m);
    let b = className('android.widget.TextView').text('手势登录').findOne(MAX);
    if (b == null) throw new Error('未找到手势登录方式');
    clickControl(b);
    next();
  }
}).add('滑动输入密码', (next) => {
  // 点击同意政策
  let circle = className('android.widget.CheckBox').findOne(1500);
  if (circle) {
    clickControl(circle, true);
  }
  let c = idEndsWith('vGestureContentView').findOne(MAX);
  if (c == null) throw new Error('未找到包含块');
  let points = c.find(className('android.widget.ImageView'));
  if (points.length === 0) throw new Error('未找到密码输入区');
  /** @type {string} */
  let password = storages.create('password').get('password');
  if (!password) throw new Error('未曾输入过密码');
  // @ts-ignore
  gesture.apply(null, [password.length * 500].concat(
    // @ts-ignore
    password.split('').map((number) => {
      let el = points[+number - 1];
      let bs = el.bounds();
      return [bs.centerX(), bs.centerY()];
    })
  ));
  next();
}).add('点击积分', (next) => {
  let el = idEndsWith('score_view').findOne(MAX)
  if (!el) throw new Error()
  clickControl(el, true);
  sleep(1000);
  next();
}).add('点击签到', (next) => {
  findAndClickIt(idEndsWith('function0'));
  next();
}).add('点击签到领积分', (next) => {
  let t1 = className('android.view.View').text('签到领积分').findOne(MAX);
  let t2 = className('android.widget.Button').text('今日已签到').findOne(MAX);
  if (!t1 && !t2) throw new Error('A');
  if (t1) {
    let p = t1.parent();
    if (!p) throw new Error('B');
    clickControl(p);
  }
  backward();
  next();
}).add('答题', (next) => {
  let answer = storages.create('zs-q').get('zsyh') && storages.create('zs-q').get('zsyh').split('-')
  if (!answer) {
    log('没找到答案')
    return next();
  }
  let entry = descStartsWith("index','003003','','003','1','JFSY002'").findOne(MAX)
  if (entry) {
    clickControl(entry, true)
    sleep(3000)

    while (handleCase()) {
      sleep(1000)
    }
  }
  next();

  function handleCase () {
    let tomo = text('请明日再来').findOnce()
    if (tomo) {
      return false
    }
    let succ = text('查看积分').findOnce()
    if (succ) {
      return false
    }
    let daily = textContains('每日答题').findOnce()
    if (daily) {
      clickControl(daily, true)
      return true
    } else {
      let index = storages.create('zs-q').get('index') || 0
      storages.create('zs-q').put('index', index + 1)
      let a = answer[index]
      let op = textMatches(a + '.').findOnce()
      if (op) {
        clickControl(op, true)
        return true
      } else {
        return false
      }
    }
  }
});

export default app;
