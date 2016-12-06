const {app, BrowserWindow} = require('electron')
let win
let win2

function createBothWindows(){
  createWindow();
  createWindow2();
}

function createWindow(){
    win = new BrowserWindow({width: 800, height: 600, minHeight: 500, minWidth: 400})
    win.loadURL(`file://${__dirname}/index.html`)
    // win.webContents.openDevTools()
    win.on('closed', () => {
      win=null
    })
}

function createWindow2(){
    win2 = new BrowserWindow({width: 800, height: 600, minHeight: 500, minWidth: 400})
    win2.loadURL(`file://${__dirname}/index.html`)
    // win.webContents.openDevTools()
    win2.on('closed', () => {
      win2=null
    })
}

app.on('ready', createBothWindows)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
  if (win2 === null) {
    createWindow2()
  }
})

const {ipcMain} = require('electron')
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg)  // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong')
// })


ipcMain.on('main_comunications', (event, arg) => {
    // event.returnValue = arg;
    win.webContents.send('asynchronous-reply', arg)
    win2.webContents.send('asynchronous-reply', arg)
})
