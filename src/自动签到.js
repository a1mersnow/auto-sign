/**
 * @author 橙子
 * @description 自动签到脚本
 * powered by autojs
 * 介绍：
 * 本脚本包含张大妈、招行、京东、一加社区四个系列的自动签到功能
 * 一加社区包含转盘功能
 * 招行有四个端：掌上生活 招商银行 微信公众号 支付宝生活号
 * 京东两个端：京东金融 京东（包含双签领取）
 *
 * 注意事项：
 * 招商银行和掌上生活请设置手势密码，并为了方便（其实就是懒）请设置成同一个密码
 * 本脚本运行时长大概3-4分钟
 * 本脚本运行期间不需要进行操作
 * 本脚本运行期间不会展示日志，运行结束后再展示（日志窗口会遮挡部分点击操作）
 * 本脚本运行期间如果想要退出，请按一下音量增大键
 * 本脚本可重复运行
 * 本脚本为了增加稳定性会做一些多余的操作，会在一些地方停留较长的时间，请忽略这些
 * 本脚本不保证一直有效，app改版了的话就……你懂的……
 * 运行脚本之前最好把招行系的app进程清掉（因为经常崩哈哈哈
 *
 * 对于所有根据文字内容进行的查找
 * 如果你的系统语言不是简体中文
 * 请打开vscode或其他有正则搜索功能的编辑器，ctrl+F搜索（启用正则模式）text\('.+'\)|textMatches\(.+\)
 * 然后依次修改为与你的系统一致的词语
 */

(function () {

  /**
   * @typedef Application
   * @property {(name: string, fn: (next: Function, tools: {backHome: Function}) => void) => Application} add
   * @property {Function} run
   * @property {Function} reset
   * @property {(x: Application | null) => void} after
   */

  // 等用户打开无障碍
  auto.waitFor();
  // 申请录屏权限（暂时不需要）
  // images.requestScreenCapture();
  // 清理剪贴板
  setClip('cleared by autojs');

  // 监听用户操作停止脚本运行
  engines.execScript(listenUserExit.name, listenUserExit.name  + '();\n' + listenUserExit.toString());
  function listenUserExit() {
    events.setKeyInterceptionEnabled('volume_up', true);
    events.observeKey();
    events.onKeyDown('volume_up', () => {
      toast('用户取消了脚本运行');
      engines.stopAll();
    });
  }

  // 用户设置密码
  if (!storages.create('password').get('password')) {
    let pwd = dialogs.rawInput('掌上生活和招商银行请务必先设置手势密码，并且设置成同一个手势密码，手势密码一共有9个点，分别对应数字1-9，请按滑动顺序输入点对应的数字（为避免不必要的重复，只会要求输入一次，输入的密码会存在手机本地，如手势密码修改了，另有一个clear脚本来清除存储的密码）');
    let s = storages.create('password');
    if (!/^[0-9]{4,9}$/.test(/** @type {string} */(pwd))) {
      throw new Error('输入的密码有误');
    }
    s.put('password', pwd);
  }

  // 安卓手机普遍的根路径
  const rootPath = '/storage/emulated/0';

  // 最大搜索时间
  const MAX = 3000;

  // 存储失败任务，等待重新运行，但是只重新运行一次
  /** @type {Application[]} */
  let failedTasks = []
  let firstRoundFlag = false

  /**
   * @param {string} appName
   * @param {string} packageName
   * @param {(() => boolean) | string} homePageCondition
   * @returns {Application}
   */
  function createApp(appName, packageName, homePageCondition) {
    /** @type {[string, Function][]} */
    let steps = [];
    let index = 0;
    /** @type {Application | null} */
    let after

    function init() {
      try {
        log('【' + appName + '】初始化...')
        launchPackage(packageName, homePageCondition);
        backToHome(homePageCondition);
        log('【' + appName + '】初始化成功');
        return true;
      } catch (e) {
        log('【' + appName + '】初始化失败：' + e.message);
        return false;
      }
    }

    /**
     * 清理
     * @param {boolean=} noBack 是否不执行返回操作
     */
    function clear(noBack) {
      index = steps.length;
      if (!noBack) backToHome(homePageCondition);
      log('【' + appName + '】清理完成');
      if (after) {
        after.run();
      } else {
        log('脚本运行完毕');
      }
    }

    /**
     *
     * @param {string=} action
     */
    function next(action) {
      // 每步执行之前停1.5s
      sleep(1500);
      if (action === 'clear') {
        return clear();
      }
      if (action) {
        for (let i = 0; i < steps.length; i++) {
          if (steps[i][0] === action) {
            index = i
          }
        }
      }
      if (index < steps.length) {
        try {
          steps[index++][1](
            next,
            {
              backHome() {
                backToHome(homePageCondition);
              }
            }
          );
        } catch (e) {
          if (firstRoundFlag && app) failedTasks.push(app);
          console.error(steps[index - 1][0] + ' 失败' + (e.message ? '：' + e.message : ''));
          clear();
        }
      } else {
        clear();
      }
    }

    /** @type {Application} */
    let app = {
      /**
       * @param {string} name
       * @param {(next: Function, tools: {backHome: Function}) => void} fn
       */
      add(name, fn) {
        steps.push([name, fn]);
        return this;
      },
      run() {
        let success = init();
        if (success) {
          next();
        } else {
          clear(true);
        }
      },
      after(app) {
        after = app;
        return this;
      },
      reset() {
        index = 0;
      }
    }
    return app
  }

  let oneplus = createApp('一加社区', 'com.oneplus.bbs', 'com.oneplus.bbs.ui.activity.CommunityActivity');
  oneplus.add('点击今日签到', (next) => {
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

  let jdjr = createApp('京东金融', 'com.jd.jrapp', 'com.jd.jrapp.bm.mainbox.main.MainActivity');
  jdjr.add('点击我的', (next) => {
    findAndClickIt(idEndsWith('firstLayout'));
    next();
  }).add('点击每日签到', (next) => {
    findAndClickIt(text('每日签到'));
    next();
  }).add('点击签到按钮', (next) => {
    findAndClickIt(textMatches(/^(已连续签到\d+天|签到领钢镚.*)$/));
    next();
  });

  let jdmall = createApp('京东购物', 'com.jingdong.app.mall', 'com.jingdong.app.mall.MainFrameActivity');
  jdmall.add('点击我的', (next) => {
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
    findAndClickIt(textMatches(/^(签到领京豆|已连续签到)$/));
    next();
  }).add('返回京豆页面', (next) => {
    backward();
    next();
  }).add('点击双签', (next) => {
    findAndClickIt(text('双签领豆'));
    next();
  }).add('点击立即领取', (next) => {
    let el = text('立即领取').findOne(MAX);
    if (el) {
      clickControl(el);
      next('查看京豆数量');
    } else {
      backward();
      findAndClickIt(text('双签领豆'));
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
    findAndClickIt(text('双签领豆'));
    combo();
    next();
  }).add('查看京豆数量', (next, tools) => {
    tools.backHome();
    findAndClickIt(className('android.view.View').desc('我的'));
    let t = text('京豆').findOne(MAX);
    if (t == null) throw new Error('没找到京豆二字');
    let n = sibling(t, 0);
    if (n == null) throw new Error('京豆上方没有数量');
    console.info('京豆数量：' + n.text());
    next();
  });

  let zdm = createApp('张大妈', 'com.smzdm.client.android', 'com.smzdm.client.android.app.HomeActivity');
  zdm.add('点击我的', (next) => {
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
    findAndClickIt(text('我的任务'));
    sleep(500);
    let daily = text('日常任务').findOne(MAX);
    while (!daily) {
      let success = scrollDown();
      if (!success) break;
      daily = text('日常任务').findOnce();
    }
    if (!daily) throw new Error('B');
    let p = daily.parent();
    if (!p) throw new Error('C');
    let listContainer = sibling(p, 1);
    if (!listContainer) throw new Error('D');
    let expand = listContainer.findOne(text('展开'));
    if (expand) {
      let expandParent = expand.parent();
      if (expandParent) {
        clickControl(expandParent);
      }
    }
    let task = getNextTask();
    while (task) {
      let titleEl = task.findOne(idEndsWith('tv_title'));
      if (!titleEl) throw new Error('D');
      let btn = task.findOne(idEndsWith('tv_get'));
      if (!btn) throw new Error('E');
      let title = titleEl.text();
      let already = btn.text() === '领奖励';
      clickControl(btn);
      findAndClickIt(idMatches(/.*(btn_go|bt_go).*/));
      if (already) {
        task = getNextTask();
        continue;
      }
      if (/阅读|指南|活动|好物推荐|干货推荐|攻略/.test(title)) {
        sleep(2000);
        backward();
        sleep(2000);
      } else if (/分享/.test(title)) {
        sleep(3000);
        findAndClickIt(text('分享'));
        findAndClickIt(idEndsWith('tv_wechat'));
        backward();
        backward();
        sleep(2000);
      }
      task = getNextTask();
    }
    backward();
    next();

    function getNextTask() {
      let daily = text('日常任务').findOne(MAX);
      if (!daily) throw new Error('F');
      let p = daily.parent();
      if (!p) throw new Error('G');
      let listContainer = sibling(p, 1);
      if (!listContainer) throw new Error('H');
      let list = listContainer.findOne(idEndsWith('recyclerview'));
      if (!list) throw new Error('I');
      let tasks = list.children();
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let titleEl = task.findOne(className('android.widget.TextView').idEndsWith('tv_title'));
        let btnEl = task.findOne(idEndsWith('tv_get'));
        if (titleEl == null || btnEl == null) continue;
        let title = titleEl.text();
        let btnText = btnEl.text();
        if (btnText !== '已完成' && /活动|阅读|指南|分享|好物推荐|干货推荐|攻略/.test(title)) {
          return task;
        }
      }
    }
  }).add('我的礼包', (next) => {
    findAndClickIt(text('我的礼包'));
    let listItem = getNextBag();
    while (listItem) {
      let no = listItem.findOne(text('未达成'));
      if (no == null) {
        clickControl(listItem);
        findAndClickIt(className('android.view.View').text('确定'));
        sleep(1000);
        listItem = getNextBag();
      } else {
        break;
      }
    }
    backward();
    next();

    function getNextBag() {
      let t = text('待领取礼包').findOne(MAX);
      if (t == null) return null;
      let p = t.parent();
      if (p == null) return null;
      return sibling(p, 2);
    }
  }).add('拔旗子', (next) => {
    findAndClickIt(idEndsWith('tv_login_sign'));
    for (let i = 1; i <= 3; i++) {
      let el = idEndsWith('v_duty_' + i).findOnce();
      if (el) clickControl(el);
      sleep(1000);
      let go = idEndsWith('btn_go').findOnce();
      if (go) clickControl(go);
    }
    next();
  }).add('补签', (next) => {
    let b = text('补签').findOne(MAX);
    if (b) {
      clickControl(b);
      sleep(500);
      let t = text('确定').findOnce();
      if (t) {
        clickControl(t);
      } else {
        backward();
      }
    }
    next();
  }).add('完成', (next) => {
    console.info('张大妈签到完成');
    next();
  });

  let zsWx = createApp('招行微信', 'com.tencent.mm', () => {
    return text('微信').exists() && text('通讯录').exists();
  });
  zsWx.add('点击通讯录', (next) => {
    findAndClickIt(text('通讯录'));
    next();
  }).add('点击公众号', (next) => {
    findAndClickIt(text('公众号'));
    next();
  }).add('点击搜索', (next) => {
    let el = className('android.support.v7.widget.LinearLayoutCompat').findOne(MAX);
    if (el == null) throw new Error();
    let search = el.child(0);
    if (search == null) throw new Error();
    clickControl(search);
    next();
  }).add('输入招商银行信用卡', (next) => {
    let el = text('搜索').findOne(MAX);
    if (!el) throw new Error();
    el.setText('招商银行信用卡');
    next();
  }).add('点击搜索结果中的招商银行信用卡', (next) => {
    findAndClickIt(text('招商银行信用卡').className('android.widget.TextView'));
    next();
  }).add('点击右下角', (next) => {
    click(device.width - 30, device.height - 30);
    next();
  }).add('点击签到领积分', (next) => {
    findAndClickIt(className('android.widget.TextView').textMatches(/.*签到领积分.*/));
    next();
  }).add('点击签到按钮', (next) => {
    findAndClickIt(text('签到按钮图片'));
    next();
  });

  let zsZfb = createApp('招行支付宝', 'com.eg.android.AlipayGphone', 'com.eg.android.AlipayGphone.AlipayLogin');
  zsZfb.add('点击朋友', (next) => {
    findAndClickIt(text('朋友'));
    next();
  }).add('点击生活号', (next) => {
    findAndClickIt(text('生活号'));
    next();
  }).add('点击已关注', (next) => {
    findAndClickIt(text('已关注'));
    next();
  }).add('点击搜索', (next) => {
    findAndClickIt(desc('搜索生活号'));
    next();
  }).add('输入招商银行信用卡', (next) => {
    let el = text('搜索生活号').className('android.widget.EditText').findOne(MAX);
    if (el == null) throw new Error();
    el.setText('招商银行信用');
    next();
  }).add('点击已关注', (next) => {
    let el = text('已关注').findOne(MAX);
    if (el == null) throw new Error('请先关注招商银行信用卡生活号');
    clickControl(el);
    next();
  }).add('点击积分·福利', (next) => {
    findAndClickIt(text('积分·福利'));
    next();
  }).add('点击打卡领积分', (next) => {
    findAndClickIt(text('打卡领积分'));
    next();
  });

  let zsApp = createApp('掌上生活App', 'com.cmbchina.ccd.pluto.cmbActivity', () => {
    return text('饭票').exists && text('影票').exists() && text('积分').exists();
  });
  zsApp.add('点击我的', (next) => {
    findAndClickIt(text('我的'));
    next();
  }).add('点击签到按钮', (next) => {
    let t = text('资料管理').findOne(MAX);
    if (t == null) throw new Error();
    let c = t.parent();
    if (c == null) throw new Error();
    let x = sibling(c, 2);
    if (x == null) throw new Error();
    clickControl(x);
    sleep(1000);
    next();
  }).add('判断登陆状态', (next) => {
    if (text('每日签到').exists()) {
      next('点击签到按钮');
    } else {
      next();
    }
  }).add('判断有没有指纹', (next) => {
    if (text('忘记手势密码').exists()) {
      next('输入图案密码');
    } else {
      next();
    }
  }).add('点击取消和切换登陆方式', (next) => {
    findAndClickIt(text('取消'));
    findAndClickIt(text('切换登录方式'));
    next();
  }).add('输入图案密码', (next) => {
    let password = storages.create('password').get('password');
    if (!password) throw new Error('未曾输入过密码');
    inputPassword(password);
    next();
  }).add('点击签到按钮', (next) => {
    let t = className('android.view.View').text('活动规则').findOne(MAX);
    if (t == null) throw new Error('活动规则控件未找到');
    let signBtn = sibling(t, 1);
    if (signBtn == null) throw new Error('签到按钮未找到');
    clickControl(signBtn, true);
    backward();
    next();
  }).add('输出积分', (next) => {
    let t = text('积分').findOne(MAX);
    if (t == null) throw new Error('积分二字未找到');
    let score = sibling(t, 0);
    if (score == null) throw new Error('积分数字未找到');
    sleep(1000);
    console.info('招行积分：' + score.text());
    next();
  });

  let zsApp2 = createApp('招商银行App', 'cmb.pb', () => text('首页').exists && text('理财').exists() && text('我的').exists());
  zsApp2.add('点击我的', (next) => {
    findAndClickIt(className('android.widget.TextView').text('我的'));
    next();
  }).add('判断登录状态', (next) => {
    if (className('android.view.View').text('账户总览').exists()) {
      next('点击积分');
    } else {
      backward();
      next();
    }
  }).add('判断登录方式', (next) => {
    let t = className('android.widget.TextView').text('点击进行指纹解锁').findOne(MAX);
    if (t == null) return next();
    let m = className('android.widget.TextView').text('更多').findOne(MAX);
    if (m == null) throw new Error('没有找到更多');
    clickControl(m);
    let b = className('android.widget.TextView').text('手势登录').findOne(MAX);
    if (b == null) throw new Error('未找到手势登录方式');
    clickControl(b);
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
    findAndClickIt(idEndsWith('score_view'));
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
    next();
  });

  events.on('exit', () => {
    console.show();
  });
  try {
    firstRoundFlag = true
    createChain([oneplus, jdjr, jdmall, zdm, zsWx, zsZfb, zsApp2, zsApp]).run();
    firstRoundFlag = false
    if (failedTasks.length) {
      console.warn('第一轮失败的任务重试：');
      failedTasks.forEach(task => {
        task.reset();
      })
      createChain(failedTasks).run();
    }
  } catch (e) {
    console.error(e.message);
  }
  engines.stopAll(); // to stop all listers

  /**
   *
   * @param {UiSelector} selector
   */
  function getNumberFromSelector(selector) {
    let remainsEl = selector.findOne(MAX);
    if (remainsEl == null) throw new Error();
    let match = remainsEl.text().match(/\d+/);
    if (!match) throw new Error();
    return +match[0];
  }

  /**
   * @template {Application} T
   * @param {T[]} arr
   * @returns {T}
   */
  function createChain(arr) {
    arr.forEach((app, index, arr) => {
      if (arr[index + 1]) {
        app.after(arr[index + 1]);
      } else {
        app.after(null);
      }
    });
    return arr[0];
  }

  /**
   * @param {string} password
   */
  function inputPassword(password) {
    let welcom = className('android.widget.TextView').text('欢迎回来').findOne(MAX);
    if (welcom == null) throw new Error('A');
    let p = welcom.parent();
    if (p == null) throw new Error('B');
    let c = sibling(p, 4);
    if (c == null) throw new Error('C');
    let t = c.child(0);
    if (t == null) throw new Error('D');
    let rect = t.bounds();
    let points = password.split('').map((number) => getPoint(rect, +number))
    // @ts-ignore
    gesture.apply(null, [password.length * 500].concat(points));
  }

  /**
   * @param {Rect} rect
   * @param {number} number
   * @returns {[number, number]}
   */
  function getPoint(rect, number) {
    let xunit = rect.width() / 6;
    let yunit = rect.height() / 6;
    let yc = Math.floor((number - 1) / 3);
    let xc = (number - 1) % 3;
    return [
      rect.left + ((2 * xc) + 1) * xunit,
      rect.top + ((2 * yc) + 1) * yunit
    ]
  }

  /**
   * @param {UiSelector} selector
   */
  function findAndClickIt(selector) {
    let el = selector.findOne(MAX);
    if (el == null) throw new Error();
    clickControl(el);
  }

  /**
   *
   * @param {string | (() => boolean)} condition
   * @param {number=} maxStep
   * @param {number=} step
   */
  function backToHome(condition, maxStep, step) {
    sleep(500);
    /** @type {() => boolean} */
    let resolvedCondition;
    if (typeof condition === 'string') {
      resolvedCondition = () => currentActivity() === condition;
    } else {
      resolvedCondition = condition;
    }
    if (resolvedCondition()) return;
    if (maxStep != null && step === maxStep) return;
    if (step == null) step = 0
    backward();
    backToHome(resolvedCondition, maxStep, step + 1);
  }

  /**
   * @param {UiObject} x
   * @param {boolean=} flag
   */
  function clickControl(x, flag) {
    if (!flag && x.click()) {
      sleep(1000);
      return;
    }
    let rect = x.bounds();
    while(!click(rect.centerX(), rect.centerY()));
    sleep(1000);
  }

  /**
   *
   * @param {UiObject} x
   * @param {number} i
   */
  function sibling(x, i) {
    let p = x.parent()
    if (p) {
      return p.child(i)
    }
    return null
  }

  /**
   * @param {String} packageName
   * @param {string | (() => boolean)} condition
   */
  function launchPackage (packageName, condition) {
    let resolvedCondition;
    if (typeof condition === 'string') {
      resolvedCondition = () => currentActivity() === condition;
    } else {
      resolvedCondition = condition;
    }
    sleep(1000);
    let b = app.launchPackage(packageName);
    if (!b) throw new Error('app启动失败');
    // app更新可能重新进入引导页
    let leap = text('跳过').findOnce();
    if (leap) {
      clickControl(leap);
      sleep(2000);
    }
    let index = 5;
    while (!resolvedCondition() && index > 0) {
      sleep(1000);
      index--;
    }
    // 点击中心，消除可能的弹窗
    click(device.width / 2, device.height / 2);
    sleep(1000);
    while (!resolvedCondition()) {
      backward();
    }
  }

  function backward() {
    sleep(500);
    back();
    sleep(500);
  }

  /**
   * @param  {string} x
   */
  function log(x) {
    console.verbose(x)
  }

})();
