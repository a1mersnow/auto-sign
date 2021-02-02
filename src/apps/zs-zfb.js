import {findAndClickIt, clickControl, backward, getNumberFromSelector, MAX, sibling, scrollD} from '../util';
import {createApp} from '../app';

let app = createApp('招行支付宝', 'com.eg.android.AlipayGphone', () => {
  return text('首页').exists() && text('我的').exists();
}, () => idEndsWith('registerAccount').text('注册账号').exists(), undefined, () => {
  const el = text('稍后再说').findOne(MAX)
  if (el != null) clickControl(el)
});

app.add('点击消息', (next) => {
  let el = text('消息').findOne(MAX)
  if (el) {
    clickControl(el)
    sleep(500)
    let b = className('android.widget.TextView').text('招商银行信用卡').findOne(MAX)
    if (b) {
      clickControl(b, true)
      next('同意并继续')
    } else {
      let c = text('首页').findOne(MAX)
      if (c) {
        clickControl(c)
        next('点击搜索')
      } else {
        throw new Error('返回首页入口失败')
      }
    }
  } else {
    next();
  }
}).add('点击朋友', (next) => {
  let el = text('朋友').findOne(MAX)
  if (el) {
    clickControl(el)
    next();
  } else {
    next('点击搜索');
  }
})/** 旧版 START */.add('[旧] 看看有没有招商银行信用卡', (next) => {
  const el = text('招商银行信用卡').findOne(MAX)
  if (el) {
    clickControl(el)
    next('点击右下角')
  } else {
    next()
  }
}).add('[旧] 点击生活号', (next) => {
  findAndClickIt(text('生活号'));
  next();
}).add('[旧] 先尝试搜索不行再点击已关注', (next) => {
  const el = text('搜索你感兴趣的生活号').findOne(MAX)
  if (el) {
    clickControl(el)
    next('[旧] 输入招商银行信用卡')
  } else {
    findAndClickIt(text('已关注'));
    next();
  }
}).add('[旧] 点击搜索', (next) => {
  let el
  let el2
  el = desc('搜索生活号').findOne(MAX)
  if (el) {
    clickControl(el)
    next()
  } else {
    el2 = text('招商银行信用卡').findOne(MAX)
    if (el2) {
      scrollD(500)
      sleep(100)
      scrollD(500)
      sleep(100)
      scrollD(500)
      sleep(100)
      scrollD(500)
      clickControl(el2)
      next('点击右下角')
    } else {
      throw new Error('请先关注招商银行信用卡')
    }
  }
}).add('[旧] 输入招商银行信用卡', (next) => {
  let el = text('搜索生活号').className('android.widget.EditText').findOne(MAX);
  if (el == null) throw new Error();
  el.setText('招商银行信用');
  next();
}).add('[旧] 点击搜索结果中的招行信用卡', (next) => {
  let el = text('已关注').findOne(MAX);
  if (el == null) throw new Error('请先关注招商银行信用卡生活号');
  clickControl(el);
  next('同意并继续');
})/** 旧版 END */.add('点击搜索', (next) => {
  const el = idEndsWith('search_bg').findOne()
  if (el == null) throw new Error('未找到搜索框')
  clickControl(el, true)
  next()
}).add('输入招商银行信用卡', (next) => {
  let el = idEndsWith('search_input_box').className('android.widget.EditText').findOne(MAX);
  if (el == null) throw new Error('没有找到输入框');
  el.setText('招商银行信用卡');
  next();
}).add('点击搜索结果中的招行信用卡', (next) => {
  findAndClickIt(className('android.widget.TextView').textStartsWith('招商银行信用卡'))
  next()
}).add('选择招商银行信用卡', (next) => {
  let b = className('android.widget.TextView').text('招商银行信用卡').findOne(MAX)
  if (b) {
    clickControl(b, true)
  } else {
    throw new Error('未找到入口')
  }
  next()
}).add('同意并继续', (next) => {
  const el = text('同意并继续').findOne(1000)
  if (el) {
    clickControl(el)
    next()
  } else {
    next('点击右下角')
  }
}).add('关注', (next) => {
  findAndClickIt(text('关注生活号'))
  next()
}).add('拒绝定位', (next) => {
  findAndClickIt(text('拒绝'))
  next()
}).add('点击右下角', (next) => {
  click(device.width - 70, device.height - 70);
  next();
}).add('点击签到领积分', (next) => {
  let el = textMatches(/.*签到领积分.*/).findOne(MAX);
  if (el == null) throw new Error('签到领积分按钮未找到')
  clickControl(el, true);
  next();
}).add('确认授权', (next) => {
  let el = className('android.widget.Button').text('确认授权').findOne(MAX);
  if (el) {
    clickControl(el);
  }
  next();
}).add('点击签到按钮', (next) => {
  findAndClickIt(text('签到按钮图片'));
  next();
});

export default app;
