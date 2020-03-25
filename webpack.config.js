const path = require('path');
const dayjs = require('dayjs')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '自动签到' + getTime() + '.js'
  }
};

function getTime() {
  return dayjs().format('YYYYMMDDHHmm');
}
