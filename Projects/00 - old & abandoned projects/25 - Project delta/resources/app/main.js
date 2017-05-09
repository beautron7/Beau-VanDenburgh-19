const electron=require("electron")
const {app, BrowserWindow} = require('electron')
const Menu = electron.Menu
const fs = require("fs")
const os = require('os')
const path = require('path')
var child_process = require('child_process')
var spawn = child_process.spawn;
var backup = "";
var backup_path = "";
var has_saved=false;
var unhang;
var latest_backup = new Date;
var latest_ping;
var ping_validation;
let win;
var ask_to_open_pid = -1
var web_app_status = "unknown"
const ipc = electron.ipcMain
const shell = electron.shell
var ready_bound_functions = []
function do_when_ready(fn){
  if(web_app_status == "ready"){
    fn()
  } else {
    ready_bound_functions.push(fn)
  }
}

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

var open_file=(win, path)=>{
  do_when_ready(()=>{win.webContents.send("load",path);});
}

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
  win.webContents.openDevTools()
  var dontclose = false;
  win.on('close', function(e){
    if(has_saved){
      return;
    }
    var choice = electron.dialog.showMessageBox(this,{
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
  for (var i = 0; i < process.argv.length; i++) {
    if(process.argv[i].search("-open")==1){
      var argument = process.argv[i]
      console.log(argument.search("-open"))
      open_file(win, argument.match(/--open:(.+)/)[1])
    }
  }
  unhang = function () {
    var options;
    if(backup==""){
      options = {
        type: 'info',
        title: 'Renderer Process Hanging',
        message: 'The application is not responding (or you opened the help menu). Would you like to quit?',
        buttons: ["Wait", 'Quit']
      }
    } else {
      options = {
        type: 'info',
        title: 'Renderer Process Hanging',
        message: 'The application is not responding (or you opened the help menu). Would you like to save a copy of your data from '+latest_backup.toTime()+'?',
        buttons: ['Save a seperate copy', 'Exit without saving','Overwire last save',"Cancel"]
      }
    }
    electron.dialog.showMessageBox(options, function (index) {
      if (index === 0) {//wait, save a seperate copy
        if (backup=="") {
          setTimeout(re_arm,10000)//well, we do want to give them the option
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
              electron.dialog.showMessageBox(options,()=>{
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
        electron.dialog.showMessageBox(options,()=>{
          has_saved=true;
          app.quit();
        })
      } else if (index==3){
        //ok, well lets rearm the system
        setTimeout(re_arm,10000);
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

ipc.on( "open" , function (event, arg) {
  var electron_path = __dirname.match(/(.+)resources\\app/)[1]
  console.log("running electron in "+__dirname)
  spawn(electron_path+"electron.exe", ["--open:"+arg+""]);
})

ipc.on('backup_data', function (event, arg) {
  console.log("Backup Recieved");
  backup=arg;
  latest_backup=new Date
});

ipc.on("backup_path",function (event,backup_path) {
  if(typeof backup_path != "string"){
    console.log("A path was recieved but it was null.")
  } else if (backup_path==""){
    console.log("A path was recieved, but it was an empty string")
  } else {
    console.log("Path recieved:"+backup_path)
    if (ask_to_open_pid != -1) {
      clearInterval(ask_to_open_pid)
      ask_to_open_pid = -1
    }
    paths=backup_path.match(/(^.+(\\|\/))(.+$)/)
    win.setTitle(paths[3]+" --- "+paths[1]+" --- Project Delta")
  }
})

var re_arm=function () {
    latest_ping = new Date();
    var max_delay = 7000
    ping_validation = setInterval(()=>{
      if(new Date - latest_ping > max_delay){
        clearInterval(ping_validation);
        unhang();
      }
    },5000)
}
setTimeout(re_arm,5000)

ipc.on("ping",()=>{
  latest_ping = new Date();
});

ipc.on("status",(event,message)=>{
  console.log("webapp status: "+message)
  web_app_status=message
  if (web_app_status=="ready"){
    for (var i = 0; i < ready_bound_functions.length; i++) {
      ready_bound_functions[i]();
    }
  }
})
