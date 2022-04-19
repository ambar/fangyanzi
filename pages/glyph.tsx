import type {NextPage} from 'next'
import BasePage from '~/biz/BasePage'
import GlyphTable from '~/biz/GlyphTable'

const Home: NextPage = () => {
  return (
    <BasePage docTitle="字形测试">
      <GlyphTable />
    </BasePage>
  )
}

export default Home
