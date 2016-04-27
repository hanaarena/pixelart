[![](https://raw.githubusercontent.com/hanaarena/pixelart/master/logo.png)]()

# pixelart [![NPM version](https://img.shields.io/npm/v/pixelart.svg)](https://npmjs.com/package/pixelart)

Transfer image to pixel art in terminal,also implement to-pixel in command line

>  An image is worth a thousand words:

[![](https://raw.githubusercontent.com/hanaarena/pixelart/master/example.gif)]()

## Install

Currently only test in Mac OS X,to use this tool,you may use [iTerm 2.9+](http://iterm2.com/downloads.html).

Also this cli tool use [node-canvas](https://github.com/Automattic/node-canvas) to render,so you need to install node-canvas's [dependencies](https://github.com/Automattic/node-canvas#installation)

After above step were done,is time to continue...:

```bash
npm install -g pixelart
```

## Feature

-  png
-  jpeg
-  [TODO] Remote URL

## Usage
```bash
pixelart /path/to/image
```

[term-img](https://github.com/sindresorhus/term-img) options is supported.like:

```bash
pixelart /path/to/image --width=50
```

## API

**pixel** [Number]

scale pixel level

## Thanks

-  [to-pixel](https://github.com/pixelass/to-pixels)
-  [term-img](https://github.com/sindresorhus/term-img)

## Known issues

**Image given has not completed loading?**

try

```bash
brew uninstall jpeg && brew install jpeg
```

then, reinstall node-canvas

```bash
npm install canvas
```

**or other strange bugs?**

Just try reinstall all dependences which `node-canvas` repo noted

On OS X,you can try

```bash 
brew uninstall pkg-config cairo libpng jpeg giflib
```

then

```bash 
brew install pkg-config cairo libpng jpeg giflib
```

then, reinstall node-canvas

```bash
npm install canvas
```
