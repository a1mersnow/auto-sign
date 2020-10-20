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
]

let idxs = all.map(function (_, i) { return i })

// 用户是否设置过模块
let st = storages.create('pick');
if (!st.get('pick')) {
  // select of user
  let sofu = dialogs.multiChoice('你尚未选择过所需模块，请选择（默认全选，如需重新选择，请执行clear脚本）：', ['一加社区', '京东金融', '京东商城', '什么值得买', '招行微信', '招行支付宝', '招商银行', '掌上生活', '微信老板电器'], idxs)
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
