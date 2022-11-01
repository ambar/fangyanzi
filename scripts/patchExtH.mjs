import fs from 'fs/promises'

const data = {
  '⿰冫兆': '\u{31403}',
  '⿰冫頁': '\u{31407}',
  '⿰口廹': '\u{314C6}',
  '⿰口恁': '\u{314F6}',
  '⿰口様': '\u{31547}',
  '⿰土匡': '\u{3159F}',
  '⿰土干': '\u{31587}',
  '⿰土非': '\u{315BE}',
  '⿰女能': '\u{31666}',
  '⿰扌欒': '\u{31856}',
  '⿰月乃': '\u{31F01}',
  '⿰月戛': '\u{31F15}',
  '⿰火勒': '\u{31B00}',
  '⿰犭活': '\u{31B8F}',
  '⿰用力': '\u{3142E}',
  '⿰目契': '\u{31CC3}',
  '⿰目楚': '\u{31CCB}',
  '⿰石恩': '\u{31D28}',
  '⿰禺欠': '\u{31938}',
  '⿰禾郞': '\u{31D9E}',
  '⿰米堯': '\u{31E5E}',
  '⿰米意': '\u{31E64}',
  '⿰纟些': '\u{31EA4}',
  '⿰虫⿱死肉': '\u{3200A}',
  '⿰虫厚': '\u{31FF3}',
  '⿰虫戛': '\u{32001}',
  '⿰虫施': '\u{31FF8}',
  '⿰虫革': '\u{31FF2}',
  '⿰赤兒': '\u{320C7}',
  '⿰金而': '\u{321CB}',
  '⿱不多': '\u{3135A}',
  '⿱大男': '\u{31632}',
  '⿱屈衣': '\u{32037}',
  '⿱未母': '\u{3195B}',
  '⿱莫用': '\u{31C20}',
  '⿱非射': '\u{32299}',
  '⿱髟任': '\u{3231B}',
  '⿸尸妥': '\u{316BA}',
  '⿸尸查': '\u{316BC}',
  '⿸疒壬': '\u{31C4B}',
  '⿻丅⿱从人': '\u{31355}',
}

const main = async () => {
  const filepath = new URL('../data/fangyanzi.json', import.meta.url)
  const json = JSON.parse(String(await fs.readFile(filepath)))
  for (const x of json) {
    const char = data[x.ids]
    if (char) {
      x.char = char
    }
  }
  await fs.writeFile(filepath, JSON.stringify(json, null, '  '))
}

main()
