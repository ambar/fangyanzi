import rawData from './fangyanzi.json'
import meta from './fangyanzi.meta.json'

export type Group =
  | '湘'
  | '粵'
  | '客'
  | '閩'
  | '贛'
  | '吳'
  | '徽'
  | '官'
  | '晉'
  | '平'

export type Zi = {
  type: string
  char: string
  sup?: number
  group: Group[]
  pinyin: Record<string, string>
  def: string
  note?: string
  glyph?: string
  ids?: string
}

export const groups = meta.groups as Group[]
// NOTE: 客/深州疑有错，可能是深圳
export const citiesByGroup = meta.citiesByGroup as Record<Group, string[]>

export const data = rawData as Zi[]
