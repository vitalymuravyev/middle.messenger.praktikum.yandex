module.exports = {
  syntax: 'postcss',
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-normalize')({ forceImport: 'sanitize.css', allowDuplicates: false }),
  ],
};
