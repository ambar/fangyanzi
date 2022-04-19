const fs = require('fs')
const {execSync} = require('child_process')
const revised = require('../data/fangyanzi.json')
const {getRange} = require('../lib/cjkrange')

/**
 * 采用 BabelStone Han 显示扩展区汉字
 * NOTE: 支持扩展A区、B区、E区、G区中的部分字符，扩展C区、D区和F区的所有字符
 * 下载：https://www.babelstone.co.uk/Fonts/Download/BabelStoneHan.ttf
 * @see https://www.babelstone.co.uk/Fonts/Han.html#Summary
 * @see https://zh.wikipedia.org/wiki/Wikipedia:Unicode扩展汉字#支援大字集的字型
 */
const exts = ['ExtensionG']
// STSong 有基本区不支持的字，见 /glyph 页
const stSongMissing = ['鿍']
const chars = revised
  .map((x) => [x.char, ...x.def, ...(x.note ?? '')])
  .flat()
  .filter((x) => x && (exts.includes(getRange(x)) || stSongMissing.includes(x)))
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
        body {font-family: BabelStoneHan;}
    </style>
</head>
<body>${chars}</body>
</html>
`
const toDir = `./styles/`
fs.writeFileSync('tmp/input.html', html)
execSync(
  'glyphhanger ./tmp/input.html --jsdom --css --formats=woff2 --family=BabelStoneHan --subset=./tmp/BabelStoneHan.ttf',
  {stdio: 'inherit'}
)
execSync(`cp tmp/BabelStoneHan-subset.woff2 ${toDir}`, {stdio: 'inherit'})
execSync(`cp tmp/BabelStoneHan.css ${toDir}`, {stdio: 'inherit'})
const cssFile = `${toDir}BabelStoneHan.css`
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
