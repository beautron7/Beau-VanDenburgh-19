const { MSICreator } = require('electron-wix-msi');
const fs = require('fs');


cleanUpShit(true);

const msiCreator = new MSICreator({
  appDirectory: './build',
  description: 'Type out notes and tests for math',
  exe: 'project-delta.exe',
  name: 'Project Delta',
  manufacturer: 'Beau-Programs',
  outputDirectory: './',
  version:"1.1.1.1"
});
// Step 2: Create a .wxs template file
(async function(){
  console.log("Making .wix")
  await msiCreator.create();
  console.log("Making .msi")
  await msiCreator.compile();
  cleanUpShit(false)
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
}