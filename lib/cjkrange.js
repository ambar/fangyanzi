// https://zh.wikipedia.org/wiki/中日韓統一表意文字
const ranges = [
  // 中日韩统一表意文字	CJK Unified Ideographs	20,992	20,989	汉字
  ['Basic', 0x4e00, 0x9fff],
  // 中日韩统一表意文字扩展区A	CJK Unified Ideographs Extension A	6,592	6,582	汉字
  ['ExtensionA', 0x3400, 0x4dbf],
  // 中日韩统一表意文字扩展区B	CJK Unified Ideographs Extension B	42,720	42,718	汉字
  ['ExtensionB', 0x20000, 0x2a6df],
  // 中日韩统一表意文字扩展区C	CJK Unified Ideographs Extension C	4,160	4,149	汉字
  ['ExtensionC', 0x2a700, 0x2b73f],
  // 中日韩统一表意文字扩展区D	CJK Unified Ideographs Extension D	224	222	汉字
  ['ExtensionD', 0x2b740, 0x2b81f],
  // 中日韩统一表意文字扩展区E	CJK Unified Ideographs Extension E	5,776	5,762	汉字
  ['ExtensionE', 0x2b820, 0x2ceaf],
  // 中日韩统一表意文字扩展区F	CJK Unified Ideographs Extension F	7,488	7,473	汉字
  ['ExtensionF', 0x2ceb0, 0x2ebef],
  // 中日韩相容表意文字补充区	CJK Compatibility Ideographs Supplement	544	542	汉字
  ['CompatibilitySupplement', 0x2f800, 0x2fa1f],
  // 中日韩统一表意文字扩展区G	CJK Unified Ideographs Extension G	4944	4939	汉字
  ['ExtensionG', 0x30000, 0x3134f],
]

const getRange = (char) => {
  if (!char) {
    return
  }
  const code = char.codePointAt()
  return ranges.find(([name, start, end]) => {
    return code >= start && code <= end
  })?.[0]
}

exports.getRange = getRange
