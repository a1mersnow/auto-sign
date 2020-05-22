import {setFirstRound, failedTasks} from './app';
import jdmall from './apps/jdmall'
import jdjr from './apps/jdjr'

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

    setFirstRound(true);
    createChain(apps).run();
    setFirstRound(false);

    if (failedTasks.length) {
      console.warn('第一轮失败的任务重试：');
      let jdjrIndex = failedTasks.indexOf(jdjr)
      let jdmallIndex = failedTasks.indexOf(jdmall)
      // 京东金融如果失败了，需要再运行一遍京东
      if (jdjrIndex > -1) {
        if (jdmallIndex > -1) {
          failedTasks.splice(jdmallIndex, 1)
        }
        failedTasks.push(jdmall)
      }
      failedTasks.forEach(task => {
        task.reset();
      })
      let chain = createChain(failedTasks)
      chain.run();
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

export default main;
