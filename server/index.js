const db = require('./db');
const proxyServer = require('./proxy');

async function initiallize() {
  await db.initiallize();
  await proxyServer.initiallize();
}

module.exports = {
  initiallize
};
