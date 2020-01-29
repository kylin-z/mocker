const { app, BrowserWindow } = require("electron");

function createWindow() {
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    //关闭跨域限制
    webPreferences: { webSecurity: false, nodeIntegration: true }
  });

  win.webContents.openDevTools();

  // 加载index.html文件
  win.loadURL("http://localhost:8080");
}

app.on("ready", createWindow);

require('./server');