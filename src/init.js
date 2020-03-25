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

/**
 *
 * @param {import('./app').Application[]} apps
 */
function main(apps) {
  // 等用户打开无障碍
  auto.waitFor();
  // 清理剪贴板，防止张大妈等app读取剪贴板蹦出弹窗
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

  // 监听退出，显示日志
  events.on('exit', () => {
    console.show();
  });

  // 用户设置密码
  if (!storages.create('password').get('password')) {
    let pwd = dialogs.rawInput('掌上生活和招商银行请务必先设置手势密码，并且设置成同一个手势密码，手势密码一共有9个点，分别对应数字1-9，请按滑动顺序输入点对应的数字（为避免不必要的重复，只会要求输入一次，输入的密码会存在手机本地，如手势密码修改了，另有一个clear脚本来清除存储的密码）');
    let s = storages.create('password');
    if (!/^[0-9]{4,9}$/.test(/** @type {string} */(pwd))) {
      throw new Error('输入的密码有误');
    }
    s.put('password', pwd);
  }

  try {
    let {setFirstRound, failedTasks} = require('./app');

    setFirstRound(true);
    createChain(apps).run();
    setFirstRound(false);

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
}


/**
 * @template {import('./app').Application} T
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

module.exports = main;
