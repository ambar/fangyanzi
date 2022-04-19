import * as ui from '@chakra-ui/react'
import Link from 'next/link'
import {useMemo, useState} from 'react'
import {data as fangyanzi} from '~/data/fangyanzi'
import {getRange} from '~/lib/cjkrange'

const CharsGrid: React.FC<{chars: string[]; fontFamily?: string}> = ({
  chars,
  fontFamily,
}) => {
  return (
    <ui.SimpleGrid my="4" fontSize="large" fontFamily={fontFamily} columns={30}>
      {chars.map((x, i) => (
        <ui.Center key={i} border=".5px solid">
          <Link href={`/?q=${x}`}>{x}</Link>
        </ui.Center>
      ))}
    </ui.SimpleGrid>
  )
}

const FangyanziTable = () => {
  const [grouped, groupedFlag] = ui.useBoolean(true)
  const [fontFamily, setFontFamily] = useState('cjkExt')
  const chars = useMemo(
    () => [
      ...new Set(
        fangyanzi
          .filter((x) => x.char)
          .map((x) => x.char)
          .sort()
      ),
    ],
    []
  )
  const groupedChars = useMemo(() => {
    const group = new Map<string, string[]>()
    if (grouped) {
      for (const char of chars) {
        const range = getRange(char) as string
        if (!group.has(range)) {
          group.set(range, [])
        }
        group.get(range)!.push(char)
      }
    }
    return [...group].sort((a, b) => a[0].localeCompare(b[0]))
  }, [chars, grouped])

  return (
    <ui.Box py="8" fontFamily={fontFamily}>
      <ui.HStack whiteSpace="nowrap">
        <ui.Flex alignItems="center">
          字体：
          <ui.Select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option>cjkExt</option>
            <option>STSong,SimSun</option>
            <option>system-ui</option>
          </ui.Select>
        </ui.Flex>
        <ui.Flex alignItems="center">
          按区分组：
          <ui.Switch isChecked={grouped} onChange={groupedFlag.toggle} />
        </ui.Flex>
        <ui.Text color="gray.600" fontSize="sm">
          「cjkExt」表示对扩展区（A～G）应用自定义字体，其他应用 STSong/SimSun。
        </ui.Text>
      </ui.HStack>
      {grouped ? (
        [...groupedChars].map(([key, chars]) => (
          <ui.Box key={key} as="section" my="4">
            <ui.Heading as="h2" fontSize="large">
              {key}（{chars.length}）
            </ui.Heading>
            <CharsGrid chars={chars} />
          </ui.Box>
        ))
      ) : (
        <CharsGrid chars={chars} />
      )}
    </ui.Box>
  )
}

export default FangyanziTable
