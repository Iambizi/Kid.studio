import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import Content from '../components/homeContent/content';
export default function Custom404() {
    return (
        <>
            <Meta page={"404"} />
            <Layout>
                <h1>404 - Page Not Found</h1>
                {/* <h1>{projects[0].title}</h1> */}
            </Layout>
        </>
    )
}