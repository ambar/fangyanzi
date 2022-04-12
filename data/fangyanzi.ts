import data from './fangyanzi.json'

export type Zi = {
  /** @private */
  __key__: string
  type: string
  char: string
  sup?: number
  group: string[]
  pinyin: Record<string, string>
  def: string
  note?: string
  glyph?: string
  ids?: string
}
const typedData = data as Zi[]

export default typedData
