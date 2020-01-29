const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const ipc = require("electron").ipcMain;
const shortid = require("shortid");
const _ = require("lodash");

const adapter = new FileSync("db.json");
const db = low(adapter);

function successWrapper(data) {
  return {
    data,
    status: 100
  };
}

function saveRule(event, rule) {
  // 新增
  if (!rule.id) {
    const id = shortid.generate();
    db.get("rules")
      .push({ id, ...rule })
      .write();

    const value = db
      .get("rules")
      .find({ id })
      .value();
    event.returnValue = successWrapper(value);
  } else {
    // 更新
  }
}

// 获取规则列表
function getRules(event, param) {
  const rules = db.get('rules').value();
  event.returnValue = successWrapper(rules);
}

function removeRule(event, id) {
  db.get('rules')
  .remove({ id })
  .write()
  const rules = db.get('rules').value();
  event.returnValue = successWrapper(rules);
}

function initiallize() {
  // return new Promise((resolve, reject) => {

  // })
  db.defaults({ rules: [] }).write();
  ipc.on("save-rule", saveRule);
  ipc.on("get-rules", getRules);
  ipc.on("remove-rule", removeRule);
}

module.exports = {
  initiallize
};
