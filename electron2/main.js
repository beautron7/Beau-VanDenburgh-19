const {app, BrowserWindow} = require('electron')
let win
let graphingWin

function createWindow(){
    win = new BrowserWindow({width: 800, height: 600, minHeight: 500, minWidth: 400})
    win.loadURL(`file://${__dirname}/index.html`)
    // win.webContents.openDevTools()
    win.on('closed', () => {
      win=null
    })
}

function createGraphingWindow(){
    graphingWin = new BrowserWindow({width: 800, height: 600, minHeight: 500, minWidth: 400})
    graphingWin.loadURL(`file://${__dirname}/graphing_app/index.html`)
    // graphingWin.webContents.openDevTools()
    graphingWin.on('closed', () => {
      graphingWin=null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

const {ipcMain} = require('electron')
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg)  // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong')
// })

var graphParams = [0];

ipcMain.on('main_comunications', (event, arg) => {
  console.log(arg)
  if(arg[0] == 'open the graphing window'){
    graphParams = arg[1]
    createGraphingWindow();
    console.log(arg[1]);
    event.returnValue = 'success'
  } else if (arg[0] == "What are the graphing params?"){
    event.returnValue = graphParams;
  }
})
