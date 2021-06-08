import init from './init.js';
import zsQ from './apps/zs-q';
import oneplus from './apps/oneplus';
import jdjr from './apps/jdjr';
import jdmall from './apps/jdmall';
import zdm from './apps/zdm';
import zsWx from './apps/zs-wx';
import zsZfb from './apps/zs-zfb';
import zsApp2 from './apps/zs-app2';
import zsApp from './apps/zs-app';
import robam from './apps/robam'
import ysf from './apps/ysf'
import { log, warn, closeLog } from './util.js';

main()

function main () {
  log('下面开始检查更新')
  let filepath = String(engines.myEngine().getSource())
  if (filepath.indexOf('/') === -1) {
    warn('不要直接运行此脚本，请保存为文件后再运行')
    return
  }
  let cwd = engines.myEngine().cwd()
  let oldnameMatch = /\/([^/]+)$/.exec(filepath)
  let oldname = oldnameMatch && oldnameMatch[1] || 'null'
  log('当前脚本为：' + oldname)
  log('正在获取最新版本脚本...')
  let res = http.get('https://api.github.com/repos/aimergenge/auto-sign/releases/latest')
  if (res.statusCode != 200) {
    log('获取最新脚本信息失败，继续执行原脚本')
    oldProcess()
  } else {
    // @ts-ignore
    let asset = res.body.json().assets[0]
    let url = asset.browser_download_url
    let n = asset.name
    log('最新脚本为：' + n)

    if (oldname === n) {
      log('当前脚本已经是最新的版本，继续执行')
      oldProcess()
    } else {
      log('当前脚本已过期，下面获取最新脚本...')
      let res2 = http.get(url)
      if (res2.statusCode != 200) {
        log('获取失败，继续执行原脚本')
        oldProcess()
      } else {
        log('获取成功，正在写入...')
        let sourceCode = res2.body.string()
        let newpath = cwd + '/' + n
        files.write(newpath, sourceCode)
        log('写入' + (files.exists(newpath) ? '成功' : '失败'))
        log('删除原脚本...')
        let deleteFlag = files.remove(filepath)
        log('删除' + (deleteFlag ? '成功' : '失败'))
        log('🎉 即将开始运行新脚本 🎉')
        let DELAY = 1000;
        setTimeout(function () {
          closeLog()
        }, DELAY)
        engines.execScriptFile(newpath, {
          delay: DELAY
        })
      }
    }
  }
}

function oldProcess () {
  // 所有模块
  /** @type {[import('./app').Application, string][]} */
  let all = [
    [zsQ, 'zsQ'],
    [oneplus, 'oneplus'],
    [jdjr, 'jdjr'],
    [jdmall, 'jdmall'],
    [zdm, 'zdm'],
    [zsWx, 'zsWx'],
    [zsZfb, 'zsZfb'],
    [zsApp2, 'zsApp2'],
    [zsApp, 'zsApp'],
    [robam, 'robam'],
    [ysf, 'ysf'],
  ]

  // 用户是否设置过模块
  let st = storages.create('pick');
  if (!isValidStore()) {
    // select of user
    let sofu = dialogs.multiChoice('请选择所需模块（如需重新选择，请执行clear脚本）：', ['招行答题', '一加社区', '京东金融', '京东商城', '什么值得买', '招行微信', '招行支付宝', '招商银行', '掌上生活', '微信老板电器', '云闪付'], getDefaultOptions())
    if (sofu.length === 0) {
      toast('请至少选择一个模块')
    } else {
      let fns = all.filter(function (_, index) {
        return sofu.indexOf(index) > -1
      }).map(function (item) {
        return item[1]
      })
      st.put('pick', fns)
      let need = sofu.map(function (i) { return all[i][0] })
      init(need)
    }
  } else {
    init(all.filter(function (item) {
      let u = /** @type {string[]} */(st.get('pick', all.map(function (x) { return x[1] })));
      return u.indexOf(item[1]) > -1
    }).map(function (item) {
      return item[0]
    }))
  }

  function isValidStore () {
    return st.get('pick') && st.get('pick')[0] && typeof st.get('pick')[0] !== 'number'
  }

  function getDefaultOptions () {
    if (isValidStore()) {
      return st.get('pick')
    } else {
      return all.map(function (_, i) { return i })
    }
  }
}
