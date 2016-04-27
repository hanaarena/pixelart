#!/usr/bin/env node
'use strict'

const fs = require('fs')
const Color = require('color')
const termImg = require('term-img')
const Canvas = require('canvas')
const meow = require('meow')
const Image = Canvas.Image
const canvas = new Canvas(500, 500)
const context = canvas.getContext('2d')
const img = new Image
const cli = meow(`
  Usage:

    pixelart <path>

    -w --width output width
    -h --height output height
    -p --pixel scale pixel level
    -v --version pixelart version
`, {
  alias: {
    w: 'width',
    h: 'height',
    p: 'pixel',
    v: 'version'
  }
})
const file = cli.input[0]
let options = {}

if (!file) {
  cli.showHelp()
}

function createReader (canvas, opt) {
  Object.assign(options, {
    pixel: opt.pixel || 6,
    row: opt.width || 30,
  })

  img.crossOrigin = 'Anonymous'

  img.onload = () => {
    context.drawImage(img, 0, 0, options.row, img.height / img.width * options.row)

    // Pixel art
    let base64Data = drawCanvas(context)
    base64Data = base64Data.toDataURL().substr(base64Data.toDataURL().indexOf(',') + 1)
    const canvasData = new Buffer(base64Data, 'base64')

    termImg(canvasData, {
      width: options.row,
      fallback: () => new Error('Oops!Not supported here!')
    })
  }

  img.onerror = err => {
    throw err
  }

  fs.readFile(file, (err, squid) => {
    if (err) throw err
    img.src = squid
  })
}

function getColorArray (__context) {
  let imageData = __context.getImageData(0, 0, options.row, img.height / img.width * options.row)
  let colorArray = []

  if (!imageData) {
    return colorArray
  }

  let data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]
    let a = data[i + 3] / 255
    let rgba = `rgba(${[r, g, b, a].join(',')})`

    if (a === 0) {
      colorArray.push('transparent')
    } else {
      let color = new Color(rgba)
      let invert = false
      let hue = false
      let hueRotate = false
      let sat = false
      // handle color modification
      if (invert === true) {
        color = color.negate()
      }
      if (typeof hue === 'number') {
        color = color.hue(hue)
      }
      if (typeof hueRotate === 'number') {
        color = color.rotate(hueRotate)
      }
      if (typeof sat === 'number') {
          color = color.saturate(sat)
      }
      let hsla = color.hslaString()
      colorArray.push(hsla)
    }
  }

  return colorArray
}

/**
 * Draw the pixel art on a canvas
 * @param {context} canvas's context
 * @return {Node} return a canvas with the pixel art version
 */
function drawCanvas (context) {
  let _canvas = new Canvas()
  let _context = _canvas.getContext('2d')
  let colorArray = getColorArray(context)
  let y = -1
  let pixel = options.pixel

  _canvas.height = (img.height / img.width * options.row) * pixel
  _canvas.width = options.row * pixel

  colorArray.forEach((color, index) => {
    let x = index % options.row

    if (x === 0) {
      ++y
    }

    if (color !== 'transparent') {
      _context.fillStyle = color

      _context.fillRect(x * pixel, y * pixel, pixel, pixel)
    }
  })

  return _canvas
}

// init
createReader(canvas, cli.flags)
