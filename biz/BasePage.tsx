import * as ui from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'

const siteName = '方言字'

const BasePage: React.FC<{docTitle: string; children: React.ReactNode}> = ({
  docTitle,
  children,
}) => {
  const head = (
    <Head>
      <title>{[docTitle, siteName].filter(Boolean).join(' - ')}</title>
      <meta
        name="description"
        content="方言字,汉语方言用字规范,现代汉语方言大词典"
      />
      <link rel="icon" sizes="32x32" type="image/png" href="/favicon-32.png" />
      <link rel="icon" sizes="any" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
    </Head>
  )

  return (
    <ui.Container maxW="6xl" px="0">
      {head}
      {children}
    </ui.Container>
  )
}

export default BasePage
