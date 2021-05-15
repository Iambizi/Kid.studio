import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import Content from '../components/homeContent/content'

export default function home():JSX.Element {
  return (
    <>
        <Meta page={"Home"} />
          <Layout>
            <Content  />
        </Layout>
    </>
  )
}