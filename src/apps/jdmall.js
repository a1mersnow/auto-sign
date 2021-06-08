import {findAndClickIt, clickControl, backward, output, getNumberFromSelector, MAX, sibling, log, scrollU} from '../util';
import {createApp} from '../app';

let app = createApp('京东购物', 'com.jingdong.app.mall', 'com.jingdong.app.mall.MainFrameActivity');
app.add('点击我的', (next) => {
  findAndClickIt(className('android.view.View').desc('我的'));
  next();
}).add('点击京豆', (next) => {
  findAndClickIt(text('京豆'));
  next();
}).add('点击去签到领京豆', (next) => {
  let t = textMatches(/^(去签到领京豆|已签到)$/).findOne(MAX);
  if (t == null) throw new Error();
  let p = t.parent();
  if (p == null) throw new Error();
  clickControl(p);
  next();
}).add('点击签到领京豆', (next) => {
  let el = textMatches(/^(签到领京豆|.*已连续签到.*|.*已连签.*)$/).findOne(MAX)
  if (el == null) throw new Error('“签到领京豆”或“已连续签到”按钮不存在')
  clickControl(el, true);
  next();
}).add('回到游戏页面', (next) => {
  backward();
  let t = textMatches(/^(去签到领京豆|已签到)$/).findOne(MAX);
  if (t) {
    let p = t.parent();
    if (p) {
      clickControl(p);
    }
  }
  next();
}).add('抽京豆', (next) => {
  while (true) {
    let el = findEntry(-2)
    if (el) {
      clickControl(el, true)
      let ref = text('我的奖品').findOne(MAX)
      // @ts-ignore
      let numEl = ref.parent().parent().parent().child(4)
      if (numEl) {
        let match = /今日还可以抽\s*([0-9]+)\s*次哦/.exec(numEl.text())
        if (match && match[1] && +match[1] > 0) {
          let el = text('我的奖品').findOne(MAX)
          // @ts-ignore
          let p = el.parent().parent().parent().child(3)
          if (p) {
            clickControl(p, true)
            sleep(2000)
            backward()
          }
        } else {
          backward()
          log('次数不够了')
          break
        }
      } else {
        backward()
        log('没有获取到次数信息')
        break
      }
    } else {
      break
    }
  }
  next()
}).add('摇京豆', (next) => {
  let el = findEntry(-1);
  if (el) {
    clickControl(el, true);
    sleep(8000);

    click(device.width / 2, device.height * 8 / 9);
    findAndClickIt(text('Close'));

    openTasks()

    doTasks();

    let t
    while ((t = textMatches(/^.*摇一摇\s*?有惊喜.*$/).findOnce())) {
      clickControl(t, true)
      sleep(1000)
      findAndClickIt(text('Close'))
      sleep(300)
    }

    closePage()
  }

  function doTasks () {
    let el = text('浏览活动').findOnce()
    if (el) {
      scrollU(300, device.height * 3 / 4, 300)
      sleep(300)
      scrollU(300, device.height * 3 / 4, 300)
      sleep(300)
      scrollU(300, device.height * 3 / 4, 300)
      sleep(300)
      scrollU(300, device.height * 3 / 4, 300)
      sleep(300)
      scrollU(300, device.height * 3 / 4, 300)
      let t
      while ((t = text('浏览').findOnce())) {
        t.click()
        sleep(2000)
        backward()
        sleep(1000)
      }
      let c = text('Close').findOnce()
      if (c) clickControl(c, true)
    }
  }

  function openTasks () {
    // @ts-ignore
    let root = text('天天买爆品').findOne(MAX).parent()
    if (root) {
      let z = root.child(1)
      if (z) {
        clickControl(z, true)
        sleep(1000)
      }
    }
  }

  function closePage () {
    let el = desc('关闭页面').findOnce()
    if (el == null) el = desc('返回').findOnce()
    if (el) clickControl(el)
  }

  next();
}).add('点击双签', (next) => {
  let el = findEntry(-5)
  if (!el)  throw new Error()
  clickControl(el, true)
  next();
}).add('点击立即领取', (next) => {
  let el = text('立即领取').findOne(MAX);
  if (el) {
    clickControl(el);
    next('查看京豆数量');
  } else {
    backward();
    let el = findEntry(-5)
    if (!el)  throw new Error()
    clickControl(el, true)
    next();
  }
}).add('点击`完成双签领取`', (next) => {
  let el = text('完成双签领取').findOne(MAX);
  if (el) {
    clickControl(el);
    next('查看京豆数量');
  } else {
    next();
  }
}).add('点击`拆开有惊喜！天天送京豆`右边的按钮', (next) => {
  let combo = () => {
    let t = text('拆开有惊喜！天天送京豆').findOne(MAX);
    if (t == null) throw new Error('文字未找到');
    let btn = sibling(t, 2);
    if (btn == null) throw new Error('按钮未找到');
    clickControl(btn);
  }
  combo();
  backward();
  let el = findEntry(-5) || text('双签领豆').findOne(MAX)
  if (!el)  throw new Error()
  clickControl(el, true)
  combo();
  next();
}).add('查看京豆数量', (next, tools) => {
  tools.backHome();
  findAndClickIt(className('android.view.View').desc('我的'));
  let t = text('京豆').findOne(MAX);
  if (t == null) throw new Error('没找到京豆二字');
  let n = sibling(t, 0);
  if (n == null) throw new Error('京豆上方没有数量');
  output('京豆数量：' + n.text());
  next();
});

/**
 *
 * @param {number} childIndex
 */
function findEntry (childIndex) {
  let el = textMatches(/^(签到领京豆|.*已连续签到.*|.*已连签.*)$/).findOne(MAX);
  if (el == null) throw new Error('“签到领京豆”或“已连续签到”按钮不存在，无法继续找到入口');
  // @ts-ignore
  let c = el.parent().parent().parent().parent();
  if (!c) throw new Error('未找到容器');
  let len = c.childCount();
  let i = len + childIndex;
  return c.child(i);
}

export default app;
