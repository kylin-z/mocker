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

function saveRule(rule) {
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
    return value;
  } else {
    // 更新
    const id = rule.id;
    const value = db
      .get("rules")
      .find({ id })
      .assign(rule)
      .write();
    return value;
  }
}
function saveRuleListener(event, rule) {
  // TODO: 校验
  event.returnValue = successWrapper(saveRule(rule));
}

// 获取规则列表
function getRules(param) {
  if(_.isEmpty(param)) {
    const rules = db.get("rules").value();
    return rules;
  } else {
    const rules = db.get("rules").filter(param).value();
    return rules;
  }
}
function getRulesListener(event, param) {
  event.returnValue = successWrapper(getRules(param));
}

// 删除
function removeRule(id) {
  db.get("rules")
    .remove({ id })
    .write();
  const rules = db.get("rules").value();
  return rules;
}
function removeRuleListener(event, id) {
  event.returnValue = successWrapper(removeRule(id));
}

// 批量更新规则

function batchUpdateRuleById({ ids = [], rule = {} } = {}) {
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
  return values;
}

function batchUpdateRuleByIdListener(event, param) {
  event.returnValue = successWrapper(batchUpdateRuleById(param));
}

function batchRemoveRuleById(ids = []) {
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    db.get("rules")
    .remove({ id })
    .write();
  }
  const rules = db.get("rules").value();
  return rules;
}

function batchRemoveRuleByIdListener(event, ids) {
  event.returnValue = successWrapper(batchRemoveRuleById(ids));
}



// -------------module-------------

function saveModule(module) {
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
    return value;
  } else {
    // 更新
    const id = module.id;
    const value = db
      .get("modules")
      .find({ id })
      .assign(rule)
      .write();
    return value;
  }
}
function saveModuleListener(event, module) {
  // TODO: 校验
  event.returnValue = successWrapper(saveModule(module));
}

// 获取模块列表

function getModules(param) {
  const modules = db.get("modules").value();
  return modules;
}
function getModulesListener(event, param) {
  event.returnValue = successWrapper(getModules(param));
}

// 删除
function removeModule(id) {
  db.get("modules")
    .remove({ id })
    .write();
  const modules = db.get("modules").value();
  return modules;
}

function removeModuleListener(event, id) {
  event.returnValue = successWrapper(removeModule(id));
}

function initiallize() {
  // return new Promise((resolve, reject) => {

  // })
  db.defaults({ rules: [], modules: [] }).write();
  // rule
  ipc.on("save-rule", saveRuleListener);
  ipc.on("get-rules", getRulesListener);
  ipc.on("remove-rule", removeRuleListener);
  ipc.on("batch-remove-rule-by-id", batchRemoveRuleByIdListener);
  ipc.on("batch-update-rule-by-id", batchUpdateRuleByIdListener);
  // module
  ipc.on("save-module", saveModuleListener);
  ipc.on("get-modules", getModulesListener);
  ipc.on("remove-module", removeModuleListener);
}

module.exports = {
  initiallize,
  saveRule,
  getRules,
  removeRule,
  batchUpdateRuleById,
  batchRemoveRuleById,
  saveModule,
  getModules,
  removeModule
};
