import Layout from '../components/layout';
import { GetStaticProps } from 'next';
import Meta from '../components/common/meta';
import React, { useEffect } from "react";
import InfoBox from '../components/infoContent/infoBox';
import { connectClient } from '../components/common/utils/createClient';
import InfoPlaneCanvas from '../components/infoContent/infoCanvas';
import apolloClient from "../pages/api/apollo-client";
import { infoPageQuery } from "../pages/api/queries";
import { infoPageTypes } from "../components/props/propTypes";

interface Types {
    commonAssets: any;
    infoData: infoPageTypes;
    loaderLink: string;
}

const Info: React.FC<Types> = ({ commonAssets, infoData, loaderLink }): JSX.Element => {

    const aboutUs = infoData?.aboutUs.json.content[0].content[0].value;
    const infoImage = infoData?.infoImage.url;

    useEffect(() => {
        const bg = document.body;
        bg.classList.remove("needsScroll");
        bg.removeAttribute("style");
    });

    return (
        <>
            <Meta page={"Info"} />
            <Layout commonAssets={commonAssets}>
                <InfoBox aboutUs={aboutUs} />
                <InfoPlaneCanvas src={infoImage} loaderLink={loaderLink} />
            </Layout>
        </>
    )
}

export default Info;

export const getStaticProps: GetStaticProps = async () => {

    const commonRes = await connectClient.getEntries({ content_type: 'commonAssets' });

    const { data } = await apolloClient.query({
        query: infoPageQuery
    });

    if (!data) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            commonAssets: commonRes.items[0].fields,
            loaderLink: data.commonAssetsCollection.items[0].loader.url,
            infoData: data.infoPageCollection.items[0],
        }
    }
}