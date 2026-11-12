const path = require('node:path');
module.exports = {
  content: ['index.html', 'script.js', 'merchant-ui.js'].map(file => path.join(__dirname, file)),
  darkMode: 'class',
  theme: { extend: {
    colors: { primary: '#ef6425', 'background-light':'#f7f8fa', 'background-dark':'#141a23' },
    fontFamily: { sans:['Inter','Segoe UI','Arial','sans-serif'], serif:['Georgia','serif'] }
  } },
  plugins: []
};
