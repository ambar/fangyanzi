const fs = require('fs')
const {execSync} = require('child_process')
const revised = require('../data/fangyanzi.json')
const {getRange} = require('../lib/cjkrange')

/**
 * 采用开源的花园明朝显示扩展区汉字
 * @see https://zh.wikipedia.org/wiki/Wikipedia:Unicode扩展汉字#支援大字集的字型
 */
const exts = [
  // macOS 默认能显示
  // 'ExtensionA',
  'ExtensionB',
  'ExtensionC',
  'ExtensionD',
  'ExtensionE',
  'ExtensionF',
  'ExtensionG',
]
const chars = revised
  .map((x) => [x.char, ...x.def, ...(x.note ?? '')]).flat()
  .filter((x) => x && exts.includes(getRange(x)))
  .join('')

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {font-family: Hana;}
    </style>
</head>
<body>${chars}</body>
</html>
`
const toDir = `./styles/`
fs.writeFileSync('tmp/input.html', html)
execSync(
  'glyphhanger ./tmp/input.html --jsdom --css --formats=woff2 --family=Hana --subset=./tmp/HanaMinB.ttf',
  {stdio: 'inherit'}
)
execSync(`cp tmp/HanaMinB-subset.woff2 ${toDir}`, {stdio: 'inherit'})
execSync(`cp tmp/HanaMinB.css ${toDir}`, {stdio: 'inherit'})
const cssFile = `${toDir}HanaMinB.css`
fs.writeFileSync(
  cssFile,
  fs
    .readFileSync(cssFile)
    .toString()
    .replace('tmp/', './')
    .replace(
      'unicode-range',
      'font-display: swap;\n  /* prettier-ignore */\n  unicode-range'
    )
)
