# Project Delta
A way to take notes (and type math) built off of electron, bootstrap, jQuery, Mathquill, and Messy code.

#### Features
- Type stuff on a piece of lined paper
- Type math equasions easily with Mathquill (and automatically resize fractions and things to fit on one or two or three lines)
- Auto-recover your files when Mathquill crashes the program!
- Format text (**Bold**, *italics*, highlighting, Large text (ctrl+K) )*
- Save files as a json object and load them
- Print to pdf
- Scalable UI

#### Instalation
- To run a debug version, download the source from github and find the `./app` folder (the one this readme is in),
- Create a folder to hold the app (`./path/to/your/folder`)
- Next, run `$ npm install electron`,
- Then, run `$ electron` from the prompt to find your install location for electron.
- Once you find your install location, Copy the contents of `./electron/dist` to your folder's root
- Finally, copy the whole`./app` folder you downloaded from this repo to `./path/to/your/folder/resources` folder
- Your folder should look like
```
./path/to/your/folder|
                       |-resources\
                       |          |-app \
                       |          |     |-assets\
                       |          |     |-recovered_files\
                       |          |     |-core-styles.css
                       |          |     |-index.html
                       |          |     |...
                       |          |-default_app.asar
                       |          |-electron.asar
                       |-locales\
                       |        |...
                       |-electron.exe
                       |...
```
- To run it, just run `electron.exe`

#### Keybindings
-  `Ctrl+L`: Make a text object a math object
-  `Ctrl+B`: Bold a line
-  `Ctrl+I`: Italicize a line
-  `Ctrl+P`: Convert to pdf to print
-  `Ctrl+O`: Open a file (first, save your old one)
-  `Ctrl+S`: Save, or save as
-  `Ctrl+K`: Toggle font size between 1 line and 2 lines (for text)


#### Footnotes
- \*There isn't a key-bind for highlighting yet
