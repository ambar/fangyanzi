import * as ui from '@chakra-ui/react'
import {useState} from 'react'
import {data as fangyanzi} from '~/data/fangyanzi'

const FangyanziTable = () => {
  const [fontFamily, setFontFamily] = useState('cjkExt')

  return (
    <ui.Box py="8">
      <ui.HStack>
        <ui.Box>
          <ui.Select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option>cjkExt</option>
            <option>system-ui</option>
          </ui.Select>
        </ui.Box>
      </ui.HStack>
      <ui.SimpleGrid
        my="4"
        fontSize="large"
        fontFamily={fontFamily}
        columns={30}
      >
        {fangyanzi
          .filter((x) => x.char)
          .map((x, i) => (
            <ui.Center key={i} border=".5px solid">
              {x.char}
            </ui.Center>
          ))}
      </ui.SimpleGrid>
    </ui.Box>
  )
}

export default FangyanziTable
