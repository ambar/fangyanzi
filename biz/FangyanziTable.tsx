import * as icons from '@chakra-ui/icons'
import * as ui from '@chakra-ui/react'
import {useCallbackRef, useColorMode} from '@chakra-ui/react'
import Fuse from 'fuse.js'
import pickBy from 'lodash/pickBy'
import {useRouter} from 'next/router'
// @ts-expect-error React has no exported member 'useDeferredValue'
import {useDeferredValue, useEffect, useMemo, useState, memo} from 'react'
import fangyanzi, {Zi} from '../data/fangyanzi'
import BatchRenderer from './BatchRenderer.jsx'
import {citiesByGroup, Group, groups} from '../data/fangyanzi.meta'

const citiesByGroupEntries = Object.entries(citiesByGroup)

const fuse = new Fuse(fangyanzi, {
  useExtendedSearch: true,
  keys: [
    'char',
    'sup',
    // 'group',
    'pinyin',
    'ids',
    'def',
    'note',
  ],
  getFn(obj, path) {
    const value = Fuse.config.getFn(obj, path)
    if (typeof value === 'object') {
      // stringify plain object
      return Object.entries(value).flat().join(' ')
    }
    return value
  },
})

fangyanzi.forEach((x, i) => {
  // key for React rendering
  x.__key__ = String(i)
})

const getCitiesByGroup = (groups: Group[]) => {
  return groups.map((g) => citiesByGroup[g]).flat()
}

/** 未标准的字，SVG 输出，允许复制 IDS 表示 */
const IDSGlyph: React.FC<{ids: string}> = ({ids}) => {
  const {colorMode} = useColorMode()
  const img = (
    <ui.Image
      display="inline"
      boxSize="1em"
      src={`/hans/${ids}.svg`}
      loading="lazy"
      alt={ids}
      css={{filter: colorMode === 'dark' ? 'invert(1)' : 'unset'}}
    />
  )
  return (
    <ui.Flex mx="-1em" alignItems="center">
      〈{img}〉
    </ui.Flex>
  )
}

const Intro = () => {
  return (
    <>
      字列中尖括号标记的〈某〉表示沒有 Unicode 編碼的漢字，展示為圖片。
      <br />
      釋列中「嚴式」表自造字、合音合體字或特有字；「寬式」為方言常用字；「其他」指常見的訓讀字或同音借字之類。
      <br />
      數據取自教育部語保工程出版的《漢語方言用字規範》總表，其用字主要收集自《現代漢語方言大詞典》。
      <br />
      如有訛誤，請
      <ui.Link
        href="https://github.com/ambar/fangyanzi/issues"
        target="_blank"
        color="teal"
      >
        提交反饋
      </ui.Link>
      。
    </>
  )
}

const HelpPopover: React.FC = ({children}) => {
  return (
    <ui.Popover trigger="hover">
      <ui.PopoverTrigger>
        <ui.Button aria-label="說明" variant="unstyled">
          <icons.InfoOutlineIcon />
        </ui.Button>
      </ui.PopoverTrigger>
      <ui.PopoverContent>
        <ui.PopoverArrow />
        <ui.PopoverBody p="2">{children}</ui.PopoverBody>
      </ui.PopoverContent>
    </ui.Popover>
  )
}

const RowItem: React.FC<{item: Zi}> = memo(function RowItem({item}) {
  return (
    <ui.Tr>
      <ui.Td>
        <ui.Flex fontSize="xl" className="useHana">
          {item.glyph === 'ids' ? <IDSGlyph ids={item.ids!} /> : item.char}
          {item.sup && (
            <ui.Text as="sup" fontSize="xs" userSelect="none">
              {item.sup}
            </ui.Text>
          )}
        </ui.Flex>
      </ui.Td>
      <ui.Td>
        <ui.Text fontSize="sm" fontFamily="Doulos SIL, Arial">
          {Object.entries(item.pinyin)
            .map((x) => x.join(' '))
            .join(' ')}
        </ui.Text>
        <ui.Text className="useHana">
          {item.def}
          <>{item.note && ` ○ ${item.note}`}</>
          <ui.Badge bg="gray.100" fontWeight="normal">
            {item.type}
          </ui.Badge>
        </ui.Text>
      </ui.Td>
      <ui.Td>{item.group.join('')}</ui.Td>
    </ui.Tr>
  )
})

const defaultTypeFilter = ['嚴式', '寬式', '其他']
const defaultGroup = groups // ['湘']
type FilterMode = 'group' | 'city'

const parseGroup = (group: string) => {
  return group.split('').filter((x) => groups.includes(x as Group)) as Group[]
}

const FangyanziTable = () => {
  const router = useRouter()
  const {query} = router
  const {colorMode} = useColorMode()
  const [keyword, setKeyword] = useState((query.q as string) || '')
  const deferredKeyword = useDeferredValue(keyword)
  const [typeFilter, setTypeFilter] = useState(defaultTypeFilter)
  const [useExtFont, setUseExtFont] = useState(true)
  const [filterMode, setFilterMode] = useState<FilterMode>('group')
  const [currentGroup, setCurrentGroup] = useState(() =>
    query.group ? parseGroup(query.group as string) : defaultGroup
  )
  const [cities, setCities] = useState(() => getCitiesByGroup(currentGroup))
  const isAllSelected = useMemo(
    () => currentGroup.length === groups.length,
    [currentGroup]
  )
  const filtered = useMemo(() => {
    let r = fangyanzi
    let kw = deferredKeyword.trim()
    if (kw) {
      r = fuse.search(kw).map((x) => x.item)
    }
    if (!isAllSelected) {
      r = r.filter((x) => cities.some((c) => c in x.pinyin))
    }
    if (typeFilter.length !== defaultTypeFilter.length) {
      r = r.filter((x) => typeFilter.includes(x.type))
    }
    return r
  }, [deferredKeyword, isAllSelected, cities, typeFilter])

  const updateQuery = useCallbackRef(
    (partial: Record<string, string | null>) => {
      router.replace({
        query: pickBy({...query, ...partial}),
      })
    }
  )

  useEffect(() => {
    setCities(getCitiesByGroup(currentGroup))
    updateQuery({
      group:
        currentGroup.length > 0 && currentGroup.length !== groups.length
          ? currentGroup.join('')
          : null,
    })
  }, [currentGroup, updateQuery])

  useEffect(() => {
    updateQuery({q: keyword.trim() || null})
  }, [keyword, updateQuery])

  const filterMenu = (
    <ui.Menu isLazy closeOnSelect={false}>
      <ui.MenuButton as={ui.Button}>地區選擇</ui.MenuButton>
      <ui.MenuList minWidth="240px" maxHeight="80vh" overflowY="auto">
        <ui.MenuOptionGroup
          title="快捷"
          type="checkbox"
          value={isAllSelected ? ['yes'] : ['no']}
          onChange={() => {
            setCurrentGroup(isAllSelected ? ([] as Group[]) : groups)
          }}
        >
          <ui.MenuItemOption value="yes">全選</ui.MenuItemOption>
        </ui.MenuOptionGroup>
        <ui.MenuOptionGroup
          title="模式"
          type="radio"
          value={filterMode}
          onChange={(v) => {
            setFilterMode(v as FilterMode)
          }}
        >
          <ui.MenuItemOption value="group">區</ui.MenuItemOption>
          <ui.MenuItemOption value="city">地市</ui.MenuItemOption>
        </ui.MenuOptionGroup>
        {filterMode === 'group' ? (
          <ui.MenuOptionGroup
            title="區"
            type="checkbox"
            value={currentGroup}
            onChange={(v) => {
              setCurrentGroup(v as Group[])
            }}
          >
            {groups.map((x) => (
              <ui.MenuItemOption key={x} value={x}>
                {x}
              </ui.MenuItemOption>
            ))}
          </ui.MenuOptionGroup>
        ) : (
          citiesByGroupEntries.map(([group, citySet]) => (
            <ui.MenuOptionGroup
              title={group}
              key={group}
              type="checkbox"
              value={cities}
              onChange={(v) => {
                setCities(v as string[])
              }}
            >
              {citySet.map((x) => (
                <ui.MenuItemOption key={x} value={x}>
                  {x}
                </ui.MenuItemOption>
              ))}
            </ui.MenuOptionGroup>
          ))
        )}
      </ui.MenuList>
    </ui.Menu>
  )

  const displayMenu = (
    <ui.Menu isLazy closeOnSelect={false}>
      <ui.MenuButton as={ui.Button}>顯示設定</ui.MenuButton>
      <ui.MenuList minWidth="240px" maxHeight="80vh" overflowY="auto">
        <ui.MenuOptionGroup
          title="分類"
          type="checkbox"
          value={typeFilter}
          onChange={(v) => setTypeFilter(v as string[])}
        >
          {defaultTypeFilter.map((x) => (
            <ui.MenuItemOption key={x} value={x}>
              {x}
            </ui.MenuItemOption>
          ))}
        </ui.MenuOptionGroup>
        <ui.MenuDivider />
        <ui.MenuOptionGroup
          // title=""
          type="checkbox"
          value={[useExtFont ? 'yes' : 'no']}
          onChange={() => setUseExtFont(!useExtFont)}
        >
          <ui.MenuItemOption value="yes">使用擴展區訂製字體</ui.MenuItemOption>
        </ui.MenuOptionGroup>
      </ui.MenuList>
    </ui.Menu>
  )

  return (
    <ui.Box
      css={{
        'th, td': {padding: '.8em 1.2em'},
        '.useHana': {
          fontFamily: useExtFont ? 'Hana, var(--chakra-fonts-body)' : 'inherit',
        },
      }}
    >
      <ui.Divider my={4} />
      <ui.FormControl as="fieldset">
        <ui.HStack>
          {/* https://github.com/chakra-ui/chakra-ui/issues/3173 */}
          <ui.Box>{filterMenu}</ui.Box>
          <ui.Box>{displayMenu}</ui.Box>
          <ui.Box>
            <ui.Input
              className="useHana"
              type="search"
              value={keyword}
              placeholder="搜尋"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </ui.Box>
          <ui.Box>
            <HelpPopover>
              <Intro />
            </HelpPopover>
          </ui.Box>
        </ui.HStack>
      </ui.FormControl>

      <ui.Divider my={4} />

      <ui.Box>
        <ui.Table
          size="md"
          variant="striped"
          sx={{
            th: {
              position: 'sticky',
              top: 0,
              zIndex: 10,
              textTransform: 'none',
              fontSize: '1em',
              bg: colorMode === 'dark' ? 'gray.800' : 'white',
            },
          }}
        >
          <ui.TableCaption>共 {filtered.length} 項</ui.TableCaption>
          <ui.Thead>
            <ui.Tr>
              <ui.Th>字</ui.Th>
              <ui.Th>釋</ui.Th>
              <ui.Th>區</ui.Th>
            </ui.Tr>
          </ui.Thead>
          <ui.Tbody>
            {/* @ts-expect-error ignore */}
            <BatchRenderer items={filtered}>
              {(item: Zi) => <RowItem key={item.__key__} item={item} />}
            </BatchRenderer>
          </ui.Tbody>
        </ui.Table>
      </ui.Box>

      <ui.Box my="4" color="gray" fontSize="sm" textAlign="center">
        <Intro />
      </ui.Box>
    </ui.Box>
  )
}

export default FangyanziTable
