const AnyProxy = require("anyproxy");

function initiallize() {
  return new Promise((resolve, reject) => {
    const options = {
      port: 9126,
      // rule: require('myRuleModule'),
      webInterface: {
        enable: true,
        webPort: 9125
      },
      rule: require('./rules'),
      throttle: 10000,
      forceProxyHttps: false,
      wsIntercept: false, // 不开启websocket代理
      silent: false
    };
    const proxyServer = new AnyProxy.ProxyServer(options);

    proxyServer.on("ready", () => {
      resolve();
    });
    proxyServer.on("error", e => {
      reject(e);
    });
    proxyServer.start();
  });
}

module.exports = {
  initiallize
};
