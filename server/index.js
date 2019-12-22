const AnyProxy = require('anyproxy');
const options = {
  port: 9126,
  // rule: require('myRuleModule'),
  webInterface: {
    enable: true,
    webPort: 9125
  },
  throttle: 10000,
  forceProxyHttps: false,
  wsIntercept: false, // 不开启websocket代理
  silent: false
};
const proxyServer = new AnyProxy.ProxyServer(options);

proxyServer.on('ready', () => { /* */ });
proxyServer.on('error', (e) => { /* */ });
proxyServer.start();

//when finished
proxyServer.close();