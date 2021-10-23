var root = depth(0).findOnce();
var accessKeys = ['bounds', 'className', 'depth', 'desc', 'text', 'id'];
var result = {};

walk(root, result);
setClip(JSON.stringify(result));
toast('日志已保存至剪贴板')

function walk (node, ctx) {
  if (node) {
    fill(node, ctx);
    var len = node.children().length;
    if (len) ctx.children = [];
    for (var i = 0; i < len; i++) {
      var n = {};
      ctx.children.push(n);
      walk(node.child(i), n)
    }
  }
}

function fill(node, ctx) {
  for (var i = 0; i < accessKeys.length; i++) {
    var key = accessKeys[i];
    ctx[key] = node[key]();
  }
}
