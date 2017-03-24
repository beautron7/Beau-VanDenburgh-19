# Project Delta
A way to take notes built off of electron, bootstrap, jQuery, Mathquill, and Mediocre code.

#### Features
- Type stuff on a piece of lined paper
- Type math equasions easily with Mathquill (and automatically resize to fit on one or two or three lines)
- Auto-recover your files when Mathquill crashes the program!
- Format text (**Bold**, *italics*, highlighting, Large text (ctrl+K) )
- Save files as a json object and load them
- Print to pdf
- Scalable UI

#### Instalation
- To run a debug version, download the source from github, download electron, then run`$ electron .`
- To run it standalone, you can take a version, use `npm install electron` to install electron in the current folder, and drag the "APP" folder to resources.

#### Mac Users
- Some keyboard shortcuts may rely on control
- If you want to go in and change the source code so you can use command, look for `/*Keybindings*/` in index.html
- That file contians all of the keybindings right now
