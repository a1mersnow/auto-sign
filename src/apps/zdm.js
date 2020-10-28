import {findAndClickIt, clickControl, backward, getNumberFromSelector, output, MAX, sibling, scrollU, scrollD, nextSibling, log} from '../util';
import {createApp} from '../app';

let app = createApp('张大妈', 'com.smzdm.client.android', () => text('首页').exists() && text('我的').exists(), undefined, undefined, () => {
  const el = idEndsWith('_close').findOne(MAX)
  if (el) clickControl(el)
});
app.add('点击我的', (next) => {
  findAndClickIt(idEndsWith('tab_usercenter'));
  next();
}).add('点击签到', (next) => {
  let el = idEndsWith('tv_login_sign').findOne(MAX);
  if (el) {
    clickControl(el);
    backward();
    sleep(1000);
    if (!idEndsWith('tv_login_sign').exists()) {
      backward();
      sleep(1000);
    }
  }
  next();
}).add('我的任务', (next) => {
  /**
   * 记录任务重试次数
   * @type {{[index: string]: number}}
   */
  let count = {};

  findAndClickIt(textMatches(/我的任务|任务活动/));
  sleep(500);
  roundDo()
  roundBonus()
  backward();
  next();

  function doShareTask () {
    sleep(2000);
    scrollD(500);
    sleep(2000);
    findAndClickIt(text('分享'));
    findAndClickIt(idEndsWith('tv_wx_session'));
    let yes = className('android.widget.Button').text('是').findOnce();
    if (yes) {
      clickControl(yes);
      sleep(2000);
    } else {
      let fileHelper = text('文件传输助手').findOnce()
      if (fileHelper) {
        clickControl(fileHelper)
        let shareBtn = text('分享').findOnce()
        if (shareBtn) {
          clickControl(shareBtn)
          let backBtn = text('返回什么值得买').findOnce()
          if (backBtn) {
            clickControl(backBtn)
            sleep(1000)
          }
        }
      } else {
        sleep(2000);
        backward();
      }
    }
    backward();
    sleep(2000);
  }

  /**
   *
   * @param {Boolean} longFlag
   */
  function doReadTask (longFlag) {
    if (longFlag) {
      sleep(2000);
      scrollU(500);
      sleep(2000);
      scrollU(500);
      sleep(2000);
      scrollU(500);
      sleep(2000);
      scrollU(500);
      sleep(2000);
      scrollU(500);
      sleep(2000);
      scrollD(500);
      sleep(1000);
      scrollD(500);
      sleep(1000);
    } else {
      sleep(2000);
      scrollU(500);
      sleep(2000);
    }
    let close = desc('Navigate up').findOnce()
    let back = idEndsWith('iv_back').findOnce()
    if (close) {
      clickControl(close);
    } else if (back) {
      clickControl(back)
    } else {
      backward();
    }
    sleep(2000);
  }

  /**
   *
   * @param {number} i
   * @param {(x: number) => UiObject} getTask
   */
  function handleTask (i, getTask) {
    let title = /** @type {UiObject} */(getTask(i).findOne(idEndsWith('tv_title'))).text()
    let btn
    if (/发布|晒|达人推荐|关注|爆料任务|原创|创作|邀请|幸运屋|完善|栏目/.test(title)) return
    while ((btn = getTask(i).findOne(text('去完成'))) && (count[title] || 0) < 7) {
      clickControl(btn)
      let desc = /** @type {UiObject} */(idEndsWith('tv_desc').findOne(MAX)).text()
      let longFlag = /10S/i.test(desc)
      findAndClickIt(idMatches(/.*(btn_go|bt_go).*/));
      if (/分享/.test(desc)) {
        doShareTask()
      } else {
        // 一律按照长阅读处理
        doReadTask(true)
      }
      count[title] = (count[title] || 0) + 1
    }
  }

  function roundDo () {
    // @ts-ignore
    let tasks = () => idEndsWith('rc_list').findOne(MAX).children()
    for (let i = 0; i < tasks().length; ++i) {
      // @ts-ignore
      let getTask = x => /** @type {UiObject} */(idEndsWith('rc_list').findOnce()).children().get(x)
      handleTask(i, getTask)
    }
  }

  function roundBonus () {
    let container = idEndsWith('rc_list').findOne(MAX)
    if (!container) throw new Error('未找到任务列表')
    let btn
    while ((btn = text('领奖励').findOne(1500))) {
      clickControl(btn)
      findAndClickIt(idMatches(/.*(btn_go|bt_go).*/))
      sleep(1500)
      let el = text('我的任务').findOne(1500)
      if (el == null) {
        try {
          findAndClickIt(desc('Navigate up'))
        } catch (e) {
          // nothing
        }
      }
    }
  }
}).add('我的礼包', (next) => {
  findAndClickIt(text('我的礼包'));
  let listItem = getNextBag();
  while (listItem) {
    let no = listItem.findOne(textEndsWith('未达成'));
    if (no == null) {
      clickControl(listItem);
      let flag = textStartsWith('领取失败').findOnce()
      findAndClickIt(className('android.view.View').textMatches(/^(.*确定.*|.*我知道了.*)$/));
      if (flag) break
      sleep(1000);
      listItem = getNextBag();
    } else {
      break;
    }
  }
  findAndClickIt(desc('Navigate up'));
  next();

  function getNextBag() {
    let t = text('活动礼包').findOne(MAX);
    if (t == null) t = text('待领取礼包').findOne(MAX);
    if (t == null) return null;
    let p = t.parent();
    if (p == null) return null;
    return nextSibling(p)
  }
}).add('完成', (next) => {
  output('张大妈签到完成');
  next();
});

export default app;
