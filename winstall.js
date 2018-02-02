const { MSICreator } = require('electron-wix-msi');
const fs = require('fs');
const {ncp} = require('ncp');ncp.limit=16;

(async function(){
  cleanUpShit(true);
 
  //copy ./src to a temp folder
  // await new Promise(function(resolve, reject) {
  //   ncp("./src","./msibuild",(err) => {
  //     if(err)
  //     reject();
  //     else
  //     resolve();
  //   })
  // });

  // console.log("cleaning up...")
  ncp("./build","%appdata%/Project Delta")
  //purge it of anything with a period.

  // var node_modules = "./msibuild/node_modules"
  // var important_folders = ["build","dist"];

  // fs.readdirSync(node_modules).forEach( library => {
  //   fs.readdirSync(node_modules + '/' + library)
  //     .filter (subfolder => !important_folders.includes(subfolder))
  //     .forEach(subfolder => {
  //       deleteFolderRecursive(node_modules + "/" + library + "/" + subfolder)
  //     });
  // });

  //configure installer
  // const msiCreator = new MSICreator({
  //   appDirectory: './build/resources/app',
  //   description: 'Type out notes and tests for math',
  //   exe: 'project-delta.exe',
  //   name: 'Project Delta',
  //   manufacturer: 'Beau-Programs',
  //   outputDirectory: './',
  //   version:"1.1.1.1"
  // });
  
  // console.log("Making .wix")
  // await msiCreator.create();
  // console.log("Making .msi")
  // await msiCreator.compile();
  // cleanUpShit(false)
})()



function cleanUpShit(deleteInstaller){
  var BadFileExtensions = [
    '.wixobj',
    '.wixpdb',
    '.wxs'
  ]
  if(deleteInstaller){BadFileExtensions.push('.msi')};
  BadFileExtensions.forEach(extension=>{
    var file = "project-delta"+extension
    if(fs.existsSync(file)){
      fs.unlinkSync(file); 
    }
  });
  deleteFolderRecursive("./msibuild")
}

function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
    if(fs.lstatSync(path).isDirectory()){
      fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      try {
        fs.rmdirSync(path);
      } catch(e) {
        fs.rmdirSync(path);
      }
    } else {
      fs.unlinkSync(path);
    }
  }
};

function deleteAnythingThatStartsWithPeriods(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteAnythingThatStartsWithPeriods(curPath);
      } else if(file[0]==".") { // delete file
        console.log(file)
        fs.unlinkSync(curPath);
      }
    });
  }
};