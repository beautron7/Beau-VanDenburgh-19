const electron=require("electron")
const {app, BrowserWindow} = require('electron')
const Menu = electron.Menu
const fs = require("fs")
const os = require('os')
const path = require('path')
var backup = "";
var backup_path = "";
var has_saved=false;
var unhang;
var latest_backup = new Date;
var latest_ping;
var ping_validation;
let win;

const ipc = electron.ipcMain
const shell = electron.shell

ipc.on('print-to-pdf', function (event) {
  const pdfPath = path.join(os.tmpdir(), 'print.pdf')
  const win = BrowserWindow.fromWebContents(event.sender)
  // Use default printing options
  win.webContents.printToPDF({}, function (error, data) {
    if (error) throw error
    fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        throw error
      }
      shell.openExternal('file://' + pdfPath)
      event.sender.send('wrote-pdf', pdfPath)
    })
  })
})

Date.prototype.toTime = function () {
  returnval="";
  returnval+=(this.getHours()%12)+";";
  if (this.getMinutes()<=10) {
    returnval+=0
  }
  returnval+=this.getMinutes()
  if (this.getHours()>=12) {
    returnval+=" PM"
  } else {
    returnval+=" AM"
  }
  return returnval;
};

function createWindow(){
  win = new BrowserWindow({width: 800, height: 600, minHeight: 500, minWidth: 400, icon: __dirname + '/icon.ico'})
  win.loadURL(`file://${__dirname}/index.html`)
  // win.webContents.openDevTools()
  var dontclose = false
  win.on('close', function(e){
    var choice = require('electron').dialog.showMessageBox(this,{
      type: 'question',
      buttons: ["Yes",'No'],
      title: 'Confirm',
      message: "Do you really want to quit?"
    });
    if(choice == 1){
      e.preventDefault();
    }
  });
  win.on('closed', () => {
    win=null
  })
}

ipc.on("backup_path",function (event,backup_path) {
  if(typeof backup_path != "string"){
    console.log("A path was recieved but it was null.")
  } else if (backup_path==""){
    console.log("A path was recieved, but it was an empty string")
  } else {
    console.log("Path recieved:"+backup_path)
    paths=backup_path.match(/(^.+(\\|\/))(.+$)/)
    win.setTitle(paths[3]+" --- "+paths[1]+" --- Project Delta")
  }
})

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
