import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import type {Router} from 'next/router'
import BasePage from '~/biz/BasePage'
import FangyanziTable from '~/biz/FangyanziTable'

const Home: NextPage<{query: Router['query']}> = () => {
  const {query} = useRouter()
  return (
    <BasePage docTitle={(query.q || query.group) as string}>
      <FangyanziTable />
    </BasePage>
  )
}

// 偏好静态发布
// const Home: NextPage<{query: Router['query']}> = ({query}) => {
//   return (
//     <BasePage docTitle={(query.q || query.group) as string}>
//       <FangyanziTable />
//     </BasePage>
//   )
// }

// export const getServerSideProps: GetServerSideProps = async ({query}) => {
//   return {
//     // force SSR rendering
//     props: {query},
//   }
// }

export default Home
