const packager = require('electron-packager')
packager({
  dir:"./src",
  icon:"./src/assets/img/icon.ico",
  out:"./build",
}).then(function (...args) {
  console.log("/==============\\\n|BUILD SUCCESS!|\n\\==============/\n\n");
  console.log(args);
}).catch(function (...args) {
  console.log("/==============\\\n| BUILD FAILED |\n\\==============/\n\n");
  console.log(args);
})
