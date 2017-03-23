const electron=require("electron")
const {app, BrowserWindow} = require('electron')
const Menu = electron.Menu
const fs = require("fs")
var backup = "";
var backup_path = "";
var has_saved=false;
var unhang;
var latest_backup = new Date;
var latest_ping;
var ping_validation;
let win;

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
  win = new BrowserWindow({width: 800, height: 600, minHeight: 500, minWidth: 400})
  win.loadURL(`file://${__dirname}/index.html`)
  // win.webContents.openDevTools()
  var dontclose = false
  win.on('close', function(e){
    if(has_saved){
      return;
    }
    var choice = require('electron').dialog.showMessageBox(this,{
      type: 'question',
      buttons: ["Yes",'No',"cancel"],
      title: 'Confirm',
      message: "Do you want to go back and save?"
    });
    if(choice == 0){
      e.preventDefault();
      win.webContents.send('string' , "save");
    } else if (choice==2){
      e.preventDefault();
    }
  });
  win.on('closed', () => {
    win=null
  })
  unhang = function () {
    var options;
    if(backup==""){
      options = {
        type: 'info',
        title: 'Renderer Process Hanging',
        message: 'The application is not responding. Would you like to quit?',
        buttons: ["Wait", 'Quit']
      }
    } else {
      options = {
        type: 'info',
        title: 'Renderer Process Hanging',
        message: 'The application is not responding. Would you like to save a copy of your data from '+latest_backup.toTime()+'?',
        buttons: ['Save a seperate copy', 'Exit without saving','Overwire last save',"Cancel"]
      }
    }
    require('electron').dialog.showMessageBox(options, function (index) {
      if (index === 0) {
        if (backup=="") {
          //Cancel
        } else {//ok, we need to recover their file
          var fname
          try {
            fname = JSON.parse(backup).title_text+"("+(new Date).toTime()+").jsonbook"//json parse error
          } catch (e) {
            fname = "Recovered Notebook ("+(new Date).toTime()+").jsonbook"
          } finally {
            try {
              fs.writeFile(`${__dirname}/recovered_files/`+fname,backup)//invalid filename
            } catch (e) {
              fname = "Recovered ("+"("+(new Date).toTime()+")"+").jsonbook"
              fs.writeFile(`${__dirname}/recovered_files/`+fname,backup)
            } finally {
              var options = {
                type: 'info',
                title: 'Info',
                message: `Your file has been saved in ${__dirname}\\recovered_files\\`+fname,
                buttons: ['ok']
              }
              require("electron").dialog.showMessageBox(options,()=>{
                has_saved=true;
                app.quit();
              })
            }
          }
        }
      } else if(index === 1){
        has_saved=true;win.close()
      } else if(index === 2){
        fs.writeFile(backup_path,backup);
        var options = {
          type: 'info',
          title: 'Info',
          message: `Your file has been saved in `+backup_path,
          buttons: ['ok']
        }
        require("electron").dialog.showMessageBox(options,()=>{
          has_saved=true;
          app.quit();
        })
      }
    })
  }
  win.on('unresponsive', unhang)
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

const ipc = require('electron').ipcMain
ipc.on('sendMSG', function (event, arg) {
  if (arg=="save_true") {
    console.log("Success!")
    has_saved=true;
    win.close()
  } else if (arg == "recovery_success"){
    console.log("Saved the bacon!");
    clearInterval(recover_loop_id);
  }
})
ipc.on('backup_data', function (event, arg) {
  console.log("Backup Recieved");
  backup=arg;
  latest_backup=new Date
});
ipc.on("backup_path",function (event,arg) {
  backup_path=arg;
  console.log("Path recieved:"+arg)
})


setTimeout(()=>{
  latest_ping = new Date();
  var max_delay = 7000
  ping_validation = setInterval(()=>{
    if(new Date - latest_ping > max_delay){
      clearInterval(ping_validation);
      unhang();
    }
  },5000)
},5000)

ipc.on("ping",()=>{
  latest_ping = new Date();
});
