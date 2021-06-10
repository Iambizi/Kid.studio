import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import { GetStaticPaths, GetStaticProps} from 'next';

export default function projectPages(){
    return(
        <>
            <Meta page={"Reel"} />
            <Layout>
                <h1>New video Project</h1>
            </Layout>
        </>
    )
}