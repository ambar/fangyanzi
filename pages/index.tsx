import type {GetServerSideProps, NextPage} from 'next'
import type {Router} from 'next/router'
import BasePage from '~/biz/BasePage'
import FangyanziTable from '~/biz/FangyanziTable'

const siteName = '方言字'
const Home: NextPage<{query: Router['query']}> = ({query}) => {
  return (
    <BasePage docTitle={(query.q || query.group) as string}>
      <FangyanziTable />
    </BasePage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  return {
    // force SSR rendering
    props: {query},
  }
}

export default Home
