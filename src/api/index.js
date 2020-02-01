import { ipcRenderer } from "electron";
import shortid from "shortid";

function responseInterceptor(response) {
  if (response.status === 100) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
}

// rule

export const saveRule = param => {
  return responseInterceptor(ipcRenderer.sendSync("save-rule", param));
};

export const removeRule = id => {
  return responseInterceptor(ipcRenderer.sendSync("remove-rule", id));
}

export const getRules = param => {
  const reqId = shortid.generate();
  return responseInterceptor(ipcRenderer.sendSync("get-rules", param));
};

export const batchUpdateRulesById = (ids, rule) => {
  return responseInterceptor(ipcRenderer.sendSync("batch-update-rule-by-id", {
    ids,
    rule
  }));
}

export const batchRemoveRuleById = (ids) => {
  return responseInterceptor(ipcRenderer.sendSync("batch-remove-rule-by-id", ids));
}

// module
export const getModules = param => {
  const reqId = shortid.generate();
  return responseInterceptor(ipcRenderer.sendSync("get-modules", param));
};
export const saveModule = param => {
  return responseInterceptor(ipcRenderer.sendSync("save-module", param));
};

export const removeModule = id => {
  return responseInterceptor(ipcRenderer.sendSync("remove-module", id));
}