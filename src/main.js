import init from './init.js';
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
        const DELAY = 1000;
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
  let all = [
    oneplus,
    jdjr,
    jdmall,
    zdm,
    zsWx,
    zsZfb,
    zsApp2,
    zsApp,
    robam,
    ysf,
  ]

  let idxs = all.map(function (_, i) { return i })

  // 用户是否设置过模块
  let st = storages.create('pick');
  if (!st.get('pick')) {
    // select of user
    let sofu = dialogs.multiChoice('你尚未选择过所需模块，请选择（默认全选，如需重新选择，请执行clear脚本）：', ['一加社区', '京东金融', '京东商城', '什么值得买', '招行微信', '招行支付宝', '招商银行', '掌上生活', '微信老板电器', '云闪付'], idxs)
    if (sofu.length === 0) {
      toast('请至少选择一个模块')
    } else {
      st.put('pick', sofu)
      let need = sofu.map(function (i) { return all[i] })
      init(need)
    }
  } else {
    init(/** @type {number[]} */(st.get('pick', idxs)).map(function (i) { return all[i] }))
  }
}
