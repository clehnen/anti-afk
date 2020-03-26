# Anti - AFK

Moves your mouse periodically to prevent "Away from Keyboard" actions from triggering.

Works for screen timeout, and applications like Skype and Discord.  

## Installation

clone the repository 

run `npm install` in the directory

run `npm start` to build and execute

Pressing the left mouse button will stop the program.


# Dependencies

You might have to install some peer dependencies yourself,
namely node-gyp.

Please ensure you have the required dependencies before installing:

* Windows
  * windows-build-tools npm package (`npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe)
* Mac
  * Xcode Command Line Tools.
* Linux
  * Python (v2.7 recommended, v3.x.x is not supported).
  * make.
  * A C/C++ compiler like GCC.
  * libxtst-dev and libpng++-dev (`sudo apt-get install libxtst-dev libpng++-dev`).

Install node-gyp using npm:

```
npm install -g node-gyp
```

Then build:

```
node-gyp rebuild
```

See the [node-gyp readme](https://github.com/nodejs/node-gyp#installation) for more details.
