import Head from 'next/head';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import Info from '../components/infoContent/infoWarpImg';

export default function info():JSX.Element{
    return(
        <>
            <Meta page={"Info"} />
            <Layout>
                <Info />
            </Layout>
        </>
    )
}