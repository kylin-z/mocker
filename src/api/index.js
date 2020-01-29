import { ipcRenderer } from "electron";
import shortid from "shortid";

function responseInterceptor(response) {
  if (response.status === 100) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
}

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
