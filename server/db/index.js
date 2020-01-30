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

// -------------rule-------------

function saveRule(event, rule) {
  // TODO: 校验
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
    const id = rule.id;
    const value = db
      .get("rules")
      .find({ id })
      .assign(rule)
      .write();
    event.returnValue = successWrapper(value);
  }
}

// 获取规则列表
function getRules(event, param) {
  const rules = db.get("rules").value();
  event.returnValue = successWrapper(rules);
}

function removeRule(event, id) {
  db.get("rules")
    .remove({ id })
    .write();
  const rules = db.get("rules").value();
  event.returnValue = successWrapper(rules);
}

// 批量更新规则
function batchUpdateRuleById(event, { ids = [], rule = {} } = {}) {
  console.log(ids, rule);
  let values = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const value = db
      .get("rules")
      .find({ id })
      .assign(rule)
      .write();
    values.push(value);
  }
  event.returnValue = successWrapper(values);
}




// -------------module-------------


function saveModule(event, module) {
  // TODO: 校验
  // 新增
  if (!module.id) {
    const id = shortid.generate();
    db.get("modules")
      .push({ id, ...module })
      .write();

    const value = db
      .get("modules")
      .find({ id })
      .value();
    event.returnValue = successWrapper(value);
  } else {
    // 更新
    const id = module.id;
    const value = db
      .get("modules")
      .find({ id })
      .assign(rule)
      .write();
    event.returnValue = successWrapper(value);
  }
}

// 获取模块列表
function getModules(event, param) {
  const modules = db.get("modules").value();
  event.returnValue = successWrapper(modules);
}

function removeModule(event, id) {
  db.get("modules")
    .remove({ id })
    .write();
  const modules = db.get("modules").value();
  event.returnValue = successWrapper(modules);
}

function initiallize() {
  // return new Promise((resolve, reject) => {

  // })
  db.defaults({ rules: [], modules: [] }).write();
  // rule
  ipc.on("save-rule", saveRule);
  ipc.on("get-rules", getRules);
  ipc.on("remove-rule", removeRule);
  ipc.on("batch-update-rule-by-id", batchUpdateRuleById);
  // module
  ipc.on("save-module", saveModule);
  ipc.on("get-modules", getModules);
  ipc.on("remove-module", removeModule);
}

module.exports = {
  initiallize
};
