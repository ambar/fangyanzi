import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import type {AppProps} from 'next/app'
import '../styles/globals.css'

/** https://zh.m.wikipedia.org/wiki/宋体 */
const song = `'Songti SC','Noto Serif CJK SC','Source Han Serif SC','Source Han Serif CN',STSong,NSimSun,SimSun,PMingLiU,MingLiU,serif`
/** https://chakra-ui.com/docs/styled-system/theming/theme */
const customTheme = extendTheme({
  config: {
    // initialColorMode: 'light',
    // useSystemColorMode: true,
  },
  fonts: {
    body: song,
    heading: song,
    song: song,
    ipa: `Doulos SIL,Arial,${song}`,
    cjkExt: `BabelStoneHan,Hana,${song}`,
  },
  styles: {
    global: {
      body: {
        WebkitFontSmoothing: 'auto',
      },
    },
  },
})

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
