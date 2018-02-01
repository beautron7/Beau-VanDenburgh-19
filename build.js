const packager = require('electron-packager');
const fs = require('fs');

var config=null, processed_files = 0;

console.log("Removing old build files")
deleteFolderRecursive("./tmp");
deleteFolderRecursive("./build");

packager(config = {
  dir:"./src", //location of source files
  icon:"./src/assets/img/icon.ico", //location of the icon
  out:"./tmp", //where to put the executable
})
  .catch(err=>{//log build errors
    console.log(
      "Errors were encountered:"
    );
    console.log(err);
  })
  .then(cleanUp)
  .then(function () {//success!
    console.log(
      "                     \r"+
      "+==============+\n"+
      "|BUILD SUCCESS!|\n"+
      "+==============+\n"+
      "\n"+
      "You can copy the folder inside ./build to your desktop, and launch the program by double clicking on Project-Delta.app or Project-Delta.exe. type `npm run msi` to make a windows installer if you are on windows"
    );
  })


function onFail(err) {
  console.log(
    "Errors were encountered:"
  );
  console.log(err);
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
          updateDeleteProgress(curPath)
        }
      });
      try {
        updateDeleteProgress(path)
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
        console.log('')
        fs.unlinkSync(curPath);
      }
    });
  }
};

function updateDeleteProgress(str){
  process.stdout.write(`${processed_files++} files deleted\r`);
}

function cleanUp(path) {
  console.log("cleaning up...")
    fs.renameSync(path[0],'./build')
    fs.rmdirSync('./tmp')
    deleteAnythingThatStartsWithPeriods("./build");

  var node_modules = "./build/resources/app/node_modules"
  var important_folders = ["build","dist"];

  fs.readdirSync(node_modules).forEach( library => {
    fs.readdirSync(node_modules + '/' + library)
      .filter (subfolder => !important_folders.includes(subfolder))
      .forEach(subfolder => {
        deleteFolderRecursive(node_modules + "/" + library + "/" + subfolder)
      });
  });
}
