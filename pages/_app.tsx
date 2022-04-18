import {ChakraProvider, theme, extendTheme} from '@chakra-ui/react'
import type {AppProps} from 'next/app'
import '../styles/globals.css'

/** https://zh.m.wikipedia.org/wiki/宋体 */
const fontSerif = `STSong,SimSun,${theme.fonts.body}`
/** https://chakra-ui.com/docs/styled-system/theming/theme */
const customTheme = extendTheme({
  config: {
    // initialColorMode: 'light',
    // useSystemColorMode: true,
  },
  fonts: {
    body: fontSerif,
    heading: fontSerif,
    ipa: `Doulos SIL,Arial,${fontSerif}`,
    cjkExt: `BabelStoneHan,Hana,${fontSerif}`,
  },
  styles: {
    global: {
      body: {
        '-webkit-font-smoothing': 'auto',
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
