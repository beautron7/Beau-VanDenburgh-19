# Project Delta

_For people who love Math, but have Dysgraphia_

## Description:

Project Delta was created as a <u>free</u>, open source, and easy to use program to allow people who wanted to type out math notes without "flattening" them. (eg: "1/sqrt(1/(5x^2))"). The program uses [MathQuill](http://mathquill.com/) LaTeX entry fields to make the entry of "Math" easy. Mathquill was chosen because it powers [software](https://www.learnosity.com/) used by companies such as The College Board, HMH, and Pearson to enable online test-taking. The program doesn't have features like autocomplete or spell-check and uses already tested software in hopes that institutions will approve its use for accommodating the testing of students with Dysgraphia. Because it was designed for use in testing, anyone can download a copy for free and / or audit the source code.

The software should work on Windows, Mac, and Linux, but has only been tested on Windows. The source code is avalible on [Github](https://github.com/beautron7/Project-Delta)

## Installation:

1.  Download the source-code from [Github](https://github.com/beautron7/Project-Delta)

2.  Install a recent version of [Node.js](https://nodejs.org/en/). The program was tested on 5.5.1, but 8.9.4 or higher should work.

    Open a terminal of your choice and verify that NPM is installed by typing

    `$ npm -v`

    If that doesn't work, try the above command after opening "Node.js command prompt" from the start menu, or look up "how to add node.js to the PATH"

3.  Use `cd` to change the directory to the root of the repository

4.  Type `npm install` to automatically download the 3rd party software needed to parse math equasions. Make sure there are no errors except for "Skipping optional dependency" errors.

5.  Type `npm build` to make a .exe / .app file in the "build" folder.

    Alternativley, type `npm start` if you want to have access to inspect element

6.  Using Finder/Explorer, open the "Build" folder, and look for "Project-Delta.exe" or "Project-Delta.app"

## Usage:

When you open up the program, hit "New Page". This will plop down a monospace text field. If you press <kbd>Enter</kbd> with a text field selected, a new text field will be created underneath the selected text field. You can press <kbd>Ctrl+L</kbd> to toggle the "mode" of the highlighted line. The default mode is the monospace text input. The second mode is Math entry, and in it the monspace input bar is replaced with a MathQuill entry field. <u>There is no undo button for MathQuill</u>, and <kbd>Ctrl+Backspace</kbd> clears the line. Pressing the "Save" button lets you save a file. Pressing the "Print" button creates a temporary PDF file of your page, and should automatically open it in an external program.

### Keyboard Shortcuts:

*   <kbd>Ctrl+L</kbd>: Toggle the type of the currently selected line.
*   <kbd>Ctrl+S</kbd>: Equivalent to clicking the "Save" button.
*   <kbd>Ctrl+N</kbd>: Equivalent to clicking the "New Page" button.
*   <kbd>Ctrl+P</kbd>: Equivalent to clicking the "Print" button.
*   <kbd>Ctrl+O</kbd>: Equivalent to clicking the "Open" button.
