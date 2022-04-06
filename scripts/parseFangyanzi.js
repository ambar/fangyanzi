const assert = require('assert')
const fs = require('fs')
const pickBy = require('lodash/pickBy')
const {citiesByGroup} = require('../data/fangyanzi.meta')

const cities = [...new Set(Object.values(citiesByGroup).flat())]

let lines = fs
  .readFileSync('./data/raw/全國漢語方言用字總表.标点修正.txt')
  .toString()
  .trim()
  .split(/\n+/)

const toneLetters = {1: '˩', 2: '˨', 3: '˧', 4: '˦', 5: '˥'}
const reToneLetters = RegExp(Object.values(toneLetters).join('|'))
const getToneLetter = (number) =>
  [...String(number)].map((x) => toneLetters[x]).join('')

const fixIPA = (x) => {
  // TODO: '/‘/ʽ/’/k ̕a
  return (
    x
      // 烏魯木齊 https://zh.wikipedia.org/wiki/%E4%B9%8C%E9%B2%81%E6%9C%A8%E9%BD%90%E8%AF%9D
      .replace(/¶/g, 'ɤ')
      // 娄底 https://zh.wikipedia.org/wiki/%E5%A8%84%E5%BA%95%E8%AF%9D
      .replace(//g, 'ɤ')
      // 廈門：行 忻州：𠼟
      .replace(/a\)/g, 'ã')

      // 纠错： 共三处
      // 東莞：䉺 原文错标为 21345
      .replace(//g, getToneLetter(213))
      // 廣州：偈 原文错标为 245
      .replace(/˨/g, getToneLetter(22))
      // 銀川：㞎 保留
      .replace(//g, getToneLetter(45))

      // 疑标错
      // 嘉興：伏 https://www.wugniu.com/allplaces?char=%E4%BC%8F 原文疑标错为 15
      .replace(//g, getToneLetter(14))
      // 無錫：夭 https://zh.wikipedia.org/wiki/%E6%97%A0%E9%94%A1%E8%AF%9D#%E5%A3%B0%E8%B0%83 原文疑标错为 31
      .replace(//g, getToneLetter(13))

      // 粤 https://zh.wikipedia.org/wiki/%E7%B2%A4%E8%AF%AD#%E8%81%B2%E8%AA%BF%E7%B3%BB%E7%B5%B1
      .replace(//g, getToneLetter(23))

      // 官
      // 北京 揰
      .replace(/Ü/g, getToneLetter(51))
      // https://zh.wikipedia.org/wiki/%E6%B4%9B%E9%99%BD%E8%A9%B1#%E8%81%B2%E8%AA%BF
      // 洛陽 梃
      .replace(//g, getToneLetter(412))
      // 牟平 梃
      .replace(//g, getToneLetter(231))
      // 烏魯木齊 笡 https://zh.wikipedia.org/wiki/%E4%B9%8C%E9%B2%81%E6%9C%A8%E9%BD%90%E8%AF%9D
      .replace(//g, getToneLetter(213))
      .replace(//g, getToneLetter(51))
      // 柳州：𠮨 建甌：腂
      .replace(//g, getToneLetter(54))
      // 厦门：行 北京：茈 —— 文档标为 13，很可能有误，纠正为 35（阳平）
      .replace(/Ä/g, getToneLetter(35))
      // 武漢：肏 濟南：孬 烏魯木齊：餷
      .replace(//g, getToneLetter(213))

      // 吴语 https://zh.wikipedia.org/wiki/%E5%90%B4%E8%AF%AD#%E5%A3%B0%E8%B0%83
      // 無錫 扷
      .replace(//g, getToneLetter(424))
      // 蘇州 扷
      .replace(//g, getToneLetter(512))
      // 上海/無錫 㓟
      .replace(//g, getToneLetter(53))
      // 上海：毻 金华：湔
      .replace(//g, getToneLetter(34))
      // 金華 渠
      .replace(//g, getToneLetter(212))
      // 無錫 晛 (梅縣 53?)
      .replace(//g, getToneLetter(52))
      // 福州：腯 無錫：碫
      .replace(//g, getToneLetter(242))
      // 温州：䯿 忻州：𠠃
      .replace(//g, getToneLetter(313))
      // 嘉興：憨 https://www.wugniu.com/allplaces?char=%E6%86%A8
      .replace(//g, getToneLetter(14))

      // 貴陽:厾
      .replace(//g, getToneLetter(31))
      // 績溪:厾
      .replace(//g, getToneLetter(32))
      // 廣州:揾
      .replace(//g, getToneLetter(35))
      // 新化：淈
      .replace(//g, getToneLetter(21))
      // 衡阳：淈
      .replace(//g, getToneLetter(213))

      // 娄底 https://zh.wikipedia.org/wiki/%E5%A8%84%E5%BA%95%E8%AF%9D
      // 淈/鋌 42
      .replace(//g, getToneLetter(42))
      // 扷
      .replace(//g, getToneLetter(35))

      // 新化/太原
      .replace(//g, getToneLetter(45))

      // 长沙:㩧/弆 益阳:淈
      .replace(//g, getToneLetter(41))
      // 弸 长沙 poŋ
      .replace(//g, getToneLetter(13))
      // 佮
      .replace(//g, getToneLetter(24))
      // 湘潭：䜊，寧波：㪬
      .replace(//g, getToneLetter(12))

      // 娄煩：峁
      .replace(//g, getToneLetter(312))
      // 應縣：眊
      .replace(//g, getToneLetter(43))
      // 黟縣：嫑
      .replace(//g, getToneLetter(324))
      // 都昌：唔 金華：亨
      .replace(//g, getToneLetter(334))
      // 金華：儂 長治：玍
      .replace(//g, getToneLetter(535))
      // 寧遠：滮 https://www.zhihu.com/xen/market/pdf-view/paid_magazine/1395242869838409728
      .replace(//g, getToneLetter(435))
  )
}

const splitLines = (lines) => {
  let out = []
  for (const [i, next] of lines.entries()) {
    const prev = lines[i - 1]
    if (!prev) {
      out.push(next)
      continue
    }
    let last = out[out.length - 1]
    if (!last) {
      out.push(prev)
      continue
    }
    if (last.includes('〕')) {
      out.push(next)
    } else {
      out[out.length - 1] += next
    }
  }
  return out
}

let reReading = RegExp(
  `(${cities.join('|')}) ?[^\\p{Script=Han}|\①～（“…]+，?`,
  'gu'
)
let reCity = RegExp(`(${cities.join('|')})`)
let rePUA = /[\uE000-\uF8FF]/
const parseLines = (lines) => {
  let items = splitLines(lines).map(x => {
    x = x
      .replace(/娄底/g, '婁底')
      .replace(/绩溪/g, '績溪')
      .replace(/上犹/g, '上猶')
      .replace(/温州/g, '溫州')
      .replace(/苏州/g, '蘇州')
      .replace(/(厦门)|(厦門)/g, '廈門')
    x = fixIPA(x)
    const [, note] = x.match(/○([^〔]*)/) || []
    const [, group] = x.match(/〔(.*)〕/) || []
    const [, first] =
      x.match(/(^\p{Script=Han}|[\uE000-\uF8FF])(\s|\n|\d)/u) || []
    assert.ok(!group.includes('○'), x)
    let rest = x.replace(/○.*$/, '').replace(/〔.*$/, '')
    let pinyins = rest.match(reReading)
    if (!pinyins) {
      // TODO: 參見
      return
    }
    rest = rest.replace(reReading, '')
    let pinyin = pinyins.map((x) => {
      assert.ok(!rePUA.test(x), x)
      let [, city, py] = x.split(reCity)
      return [
        city,
        py
          .trim()
          .replace(/\p{Punctuation}$/u, '')
          .replace(/,\s?/g, '，')
          // 㒼/㶒标注错误（不一致），使用了数字
          .replace(/\d+$/g, x => getToneLetter(x)),
      ]
    })
    const dedupedGroup = group
      ? [
          ...new Set(
            group
              .trim()
              .replace(/晋/g, '晉')
              .replace(/粤/g, '粵')
              .split(/\p{Punctuation}/u)
              .filter(Boolean)
          ),
        ]
      : void 0
    let char = first
    let def = rest.replace(char, '').trim()
    if (reToneLetters.test(def)) {
      console.warn('def:tone', def)
    }
    let sup
    def = def.replace(/^\d\s/, (x) => {
      sup = Number(x)
      return ''
    })
    return pickBy({
      char,
      sup,
      note: note?.trim(),
      group: dedupedGroup,
      def,
      pinyin: Object.fromEntries(pinyin),
    })
  })
  return items.filter(Boolean)
}

const json2csv = (json, sep = ',') => {
  const headers = Object.keys(json[0])
  const wrapQuote = (v) => (/[,]/.test(v) ? `"${v}"` : v)
  const formatValue = (v) => {
    if (Array.isArray(v)) {
      return v.join(',')
    }
    if (v && typeof v === 'object') {
      return Object.entries(v)
        .map(([k, v]) => `${k}=${v}`)
        .join(';')
    }
    return v ?? ''
  }
  let rows = json.map((x) =>
    headers.map((h) => wrapQuote(formatValue(x[h]))).join(sep)
  )
  rows.unshift(headers.join(sep))
  return rows.join('\n')
}

let reTypes = [
  ['嚴式', /嚴式方言字/],
  ['寬式', /寬式方言字/],
  ['其他', /其他方言字/],
]
const groupByType = (lines) => {
  let group = {}
  let type
  for (const line of lines) {
    const [theType] = reTypes.find(([, r]) => r.test(line)) || []
    if (theType) {
      type = theType
      continue
    }
    group[type] ||= []
    group[type].push(line)
  }
  return group
}

const main = () => {
  const group = groupByType(lines)
  console.info(Object.keys(group))
  const items = Object.entries(group)
    .map(([type, lines]) => parseLines(lines).map((x) => ({type, ...x})))
    .flat()
  fs.writeFile(
    './data/raw/fangyanzi.raw.json',
    JSON.stringify(items, null, '  ') + '\n',
    console.info
  )
  // fs.writeFile(
  //   './data/raw/fangyanzi.csv',
  //   json2csv(items) + '\n',
  //   console.info
  // )
}

main()
