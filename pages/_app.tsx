import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import type {AppProps} from 'next/app'
import '../styles/globals.css'

// 不指定 fallback 时 iOS 偶有 bug（有 query string 访问主体显示为粗体）
const system = `-apple-system,BlinkMacSystemFont,system-ui`
/** https://zh.m.wikipedia.org/wiki/宋体 */
const song = `'Songti SC','Noto Serif CJK SC','Source Han Serif SC','Source Han Serif CN',STSong,NSimSun,SimSun,PMingLiU,MingLiU`
/** https://chakra-ui.com/docs/styled-system/theming/theme */
const customTheme = extendTheme({
  config: {
    // initialColorMode: 'light',
    // useSystemColorMode: true,
  },
  fonts: {
    body: `${song},${system},serif`,
    heading: `${song},${system},serif`,
    song: song,
    ipa: `Doulos SIL,Arial,${song},${system},serif`,
    cjkExt: `BabelStoneHan,Hana,${song},${system},serif`,
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
