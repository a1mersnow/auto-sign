import {findAndClickIt, clickControl, backward, output, getNumberFromSelector, MAX, sibling, log} from '../util';
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
  let el = textMatches(/^(签到领京豆|.*已连续签到.*)$/).findOne(MAX)
  if (el == null) throw new Error('“签到领京豆”或“已连续签到”按钮不存在')
  clickControl(el, true);
  next();
}).add('返回京豆页面', (next) => {
  backward();
  next();
}).add('横向滑动', (next) => {
  let el = className('android.widget.HorizontalScrollView').findOnce()
  if (el) {
    el.scrollRight()
  } else {
    log('未找到横向滑动容器')
  }
  next()
}).add('抽京豆', (next) => {
  while (true) {
    let el = text('抽京豆').findOne(MAX)
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
  let el = text('摇京豆').findOne(MAX)
  if (el) {
    clickControl(el, true)
    // 摇一摇
    /** @type {UiObject | null} */
    let hit = text('摇一摇 有惊喜').findOne(MAX)
    if (hit) clickControl(hit)
    findAndClickIt(desc('返回'))
  }

  next()

  function hasRemain () {
    let full = textMatches(/已达上限/).findOnce()
    if (full) return false
    let el = textMatches(/已完成[0-9]\/[0-9]/).findOne(MAX)
    if (el) {
      let m = /已完成([0-9])\/([0-9])/.exec(el.text())
      if (m) {
        return m[1] < m[2]
      }
    }
  }

}).add('点击双签', (next) => {
  findAndClickIt(text('双签领豆'), undefined, true);
  next();
}).add('点击立即领取', (next) => {
  let el = text('立即领取').findOne(MAX);
  if (el) {
    clickControl(el);
    next('查看京豆数量');
  } else {
    backward();
    findAndClickIt(text('双签领豆'), undefined, true);
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
  findAndClickIt(text('双签领豆'), undefined, true);
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

export default app;
