const path = require('path');
const dayjs = require('dayjs');
const fs = require('fs')

module.exports = env => {
  const entry = {
    main: './src/main.js'
  }
  if (fs.existsSync(path.resolve(__dirname, './src/test.js'))) {
    entry.test = './src/test.js'
  }
  return {
    mode: 'production',
    entry,
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: (chunkData) => {
        return chunkData.chunk.name === 'main' ? ('auto-sign-' + getTime() + '.js') : 'test.js';
      }
    }
  }
};

function getTime() {
  return dayjs().format('YYYYMMDDHHmm');
}
