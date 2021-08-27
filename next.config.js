const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true
});

module.exports = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'codestoryimagecontainor.s3.ap-northeast-2.amazonaws.com',
      'lh3.googleusercontent.com'
    ]
  }
};