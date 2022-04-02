import * as ui from '@chakra-ui/react'
import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import type { Router } from 'next/router'
import FangyanziTable from '~/biz/FangyanziTable'

const siteName = '方言字'
const Home: NextPage<{query: Router['query']}> = ({query}) => {
  const title = [query.q || query.group, siteName].filter(Boolean).join( ' - ')

  return (
    <ui.Container maxW="6xl" px="1">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="方言字,汉语方言用字规范,现代汉语方言大词典"
        />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Head>

      <FangyanziTable />
    </ui.Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  return {
    // force SSR rendering
    props: {query},
  }
}

export default Home
