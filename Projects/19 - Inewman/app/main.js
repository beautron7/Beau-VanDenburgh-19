const {app, BrowserWindow} = require('electron')
let win

function createWindow(){
    win = new BrowserWindow({width: 800, height: 600, minHeight: 500, minWidth: 400})
    win.loadURL(`file://${__dirname}/index.html`)
    // win.webContents.openDevTools()
    win.on('closed', () => {
      win=null
    })
}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

const {ipcMain} = require('electron')
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg)  // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong')
// })


ipcMain.on('main_comunications', (event, arg) => {
    event.returnValue = arg;
});

var http = require('http');
