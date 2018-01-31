<!--Please open this file in a web-browser.-->

<h1>Project Delta</h1>
<i>For people who love Math, but have Dysgraphia</i>
<h2>Description:</h2>
<p>Project Delta was created as a <u>free</u>, open source, and easy to use program to allow people who wanted to type out math notes without "flattening" them. (eg: "1/sqrt(1/(5x^2))"). The program uses <a href="http://mathquill.com/">MathQuill</a> LaTeX entry fields to make the entry of "Math" easy. Mathquill was chosen because it powers <a href="https://www.learnosity.com/">software</a> used by companies such as The College Board, HMH, and Pearson to enable online test-taking. The program doesn't have features like autocomplete or spell-check and uses already tested software in hopes that institutions will approve its use for accommodating the testing of students with Dysgraphia. Because it was designed for use in testing, anyone can download a copy for free and / or audit the source code.</p>
<p>The software should work on Windows, Mac, and Linux, but has only been tested on Windows. The source code is avalible on <a href="https://github.com/beautron7/Project-Delta">Github</a></p>
<h2>Installation:</h2>
<ol>
  <li>
    <p>Download the source-code from <a href="https://github.com/beautron7/Project-Delta">Github</a>
  </li>
  <li>
    <p>Install a recent version of <a href="https://nodejs.org/en/">Node.js</a>. The program was tested on 5.5.1, but 8.9.4 or higher should work.</p>
    <p>Open a terminal of your choice and verify that NPM is installed by typing</p>
    <p><code>$ npm -v</code></p>
    <p>If that doesn't work, try the above command after opening "Node.js command prompt" from the start menu, or look up "how to add node.js to the PATH"</p>
  </li>
  <li>
    <p>Use <code>cd</code> to change the directory to the root of the repository<p>
  </li>
  <li>
    <p>Type <code>npm install</code> to automatically download the 3rd party software needed to parse math equasions. Make sure there are no errors except for "Skipping optional dependency" errors.
  </li>
  <li>
    <p>Type <code>npm build</code> to make a .exe / .app file in the "build" folder.</p><p> Alternativley, type <code>npm&nbsp;start</code> if you want to have access to inspect element</p>
  </li>
  <li>
    <p>Using Finder/Explorer, open the "Build" folder, and look for "Project-Delta.exe" or "Project-Delta.app"
  </li>
</ol>
<h2>Usage:</h2>
<p>When you open up the program, hit "New Page". This will plop down a monospace text field. If you press <kbd>Enter</kbd> with a text field selected, a new text field will be created underneath the selected text field. You can press <kbd>Ctrl+L</kbd> to toggle the "mode" of the highlighted line. The default mode is the monospace text input. The second mode is Math entry, and in it the monspace input bar is replaced with a MathQuill entry field. <u>There is no undo button for MathQuill</u>, and <kbd>Ctrl+Delete</kbd> clears the line. Pressing the "Save" button lets you save a file. Pressing the "Print" button creates a temporary PDF file of your page, and should automatically open it in an external program.
<h3>Keyboard Shortcuts:</h3>
<ul>
<li><kbd>Ctrl+L</kbd>: Toggle the type of the currently selected line.</li>
<li><kbd>Ctrl+S</kbd>: Equivalent to clicking the "Save" button.</li>
<li><kbd>Ctrl+N</kbd>: Equivalent to clicking the "New Page" button.</li>
<li><kbd>Ctrl+P</kbd>: Equivalent to clicking the "Print" button.</li>
<li><kbd>Ctrl+O</kbd>: Equivalent to clicking the "Open" button.</li>


<style>
  code {
    background-color: rgba(255,0,0,0.1)
  }
  html {
    font-family: sans-serif;
  }
</style>
