const path = require('path');
const dayjs = require('dayjs')

module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.js',
    test: './src/test.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: (chunkData) => {
      return chunkData.chunk.name === 'main' ? ('自动签到' + getTime() + '.js') : 'test.js';
    }
  }
};

function getTime() {
  return dayjs().format('YYYYMMDDHHmm');
}
