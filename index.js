const { app, BrowserWindow } = require("electron");
const appServer = require("./server");

function createWindow() {
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    //关闭跨域限制
    webPreferences: { webSecurity: false, nodeIntegration: true }
  });

  if (process.env.NODE_ENV === 'development'){
    win.webContents.openDevTools();
    // 加载index.html文件
    win.loadURL("http://localhost:8686");
  } else {
    win.loadFile("./dist/index.html");
  }
}

async function initApplication() {
  try {
    await appServer.initiallize();
    createWindow();
  } catch (e) {
    app.quit();
  }
}

app.on("ready", initApplication);
