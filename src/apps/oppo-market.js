import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollU, handleDualCase, scrollD, log} from '../util';
import {createApp} from '../app';

let app = createApp('OPPO商城', 'com.oppo.store', () => {
  return text('首页').exists() && text('我的').exists();
}, undefined, () => {
  let close = idEndsWith('close').findOne(1000);
  if (close) {
    clickControl(close)
  }
  let close2 = idEndsWith('dialog_delete').findOnce()
  if (close2) {
    clickControl(close2)
  }
});
app.add('点击我的', (next) => {
  findAndClickIt(text('我的'))
  next()
}).add('点击签到入口', (next) => {
  let el = text('签到').findOne(MAX)
  if (el) {
    clickControl(el)
  } else {
    let el2 = text('已签').findOnce()
    if (el2) {
      clickControl(el2)
    }
  }
  next()
}).add('点击立即签到', (next) => {
  let el = text('立即签到').findOne(MAX)
  if (el) {
    clickControl(el)
    sleep(1000)
    let close = idEndsWith('close').findOnce()
    if (close) {
      clickControl(close, true)
    }
    sleep(1000)
  }
  next()
}).add('浏览商品', (next) => {
  backward()

  scrollDown()
  sleep(1000)
  scrollDown()
  sleep(1000)
  scrollDown()
  sleep(1000)

  for (let i = 0; i < 12; i++) {
    log('浏览次数：' + (i + 1))
    let list = idEndsWith('content_list').findOne(MAX)
    if (!list) throw new Error('content list not found')
    let child = list.child(i % 4)
    if (!child) throw new Error('content not found')
    clickControl(child)
    sleep(1000)
    while (true) {
      backward()
      sleep(1000)
      if (idEndsWith('iv_setting').findOnce()) {
        break;
      }
    }
    sleep(1000)
    if (i % 4 === 3) {
      scrollU(500, undefined, 1000)
      sleep(1000)
      scrollU(500, undefined, 1000)
      sleep(1000)
      scrollU(500, undefined, 1000)
      sleep(1000)
      scrollU(500, undefined, 1000)
      sleep(1000)
      scrollU(500, undefined, 1000)
      sleep(1000)
      scrollU(500, undefined, 1000)
    }
  }

  for (let i = 0; i < 20; i++) {
    scrollD(500)
    sleep(300)
  }

  scrollUp()
  sleep(1000)
  scrollUp()
  sleep(1000)
  scrollUp()
  sleep(1000)

  re_enter()

  let el = text('浏览商品').findOne(MAX)
  if (el) {
    let p = el.parent()
    if (p) {
      let btn = p.findOne(text('领取'))
      if (btn) {
        clickControl(btn)
        sleep(1000)
        backward()
        re_enter()
      }
    }
  }

  function re_enter () {
    let entry = text('已签').findOne(MAX)
    if (!entry) throw new Error('未找到入口')
    clickControl(entry)
  }

  next()
}).add('分享商品', (next) => {
  let el = text('分享商品到微信').findOne(MAX)
  if (el) {
    let process = sibling(el, 3)
    if (process) {
      let t = process.text();
      let count = +t.split('/')[0];
      let total = +t.split('/')[1];
      let remain = total - count;

      log('剩余' + remain + '次');

      let btn = sibling(el, 4)
      let btnText = btn ? btn.text() : '';
      if (btn && btnText !== '已完成') {
        clickControl(btn)
        if (btnText === '领取') return next()
        sleep(2000)
        for (let i = 0; i < remain; i++) {
          click(device.width / 4, device.height / 3 * 2)
          sleep(1000)
          let share = idEndsWith('btn_share_referer').findOne(MAX)
          if (share) {
            clickControl(share)
            findAndClickIt(text('微信'))
            handleDualCase()
            backward()
            sleep(1000)
            backward()
          }
        }
        backward()
        sleep(2000)

        let el = text('分享商品到微信').findOne(MAX)
        if (el) {
          let p = el.parent();
          if (p) {
            let btn = p.findOne(text('领取'));
            if (btn) {
              clickControl(btn)
            }
          }
        }
      }
    }
  }
  next()
})

export default app;
