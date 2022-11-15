const proxy = [
  {
    context: '/api',
    target: 'https://bibliotecapp-backend.herokuapp.com/',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
