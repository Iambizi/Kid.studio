import Layout from '../components/layout';
import { GetStaticProps } from 'next';
import Meta from '../components/common/meta';
import React, { useEffect } from "react";
import InfoBox from '../components/infoContent/infoBox';
import { connectClient } from '../components/common/utils/createClient';
import InfoPlaneCanvas from '../components/infoContent/infoCanvas';


interface Types {
    infoPageData: any;
    commonAssets: any;
}

const Info = ({ infoPageData, commonAssets }: Types): JSX.Element => {

    const loaderLink = commonAssets.loader.fields.file.url;
    const aboutUs = infoPageData.aboutUs?.content[0].content[0].value;
    const infoImage = infoPageData.infoImage?.fields.file.url;

    useEffect(() => {
        const bg = document.body;
        bg.classList.remove("needsScroll");
        // bg.classList.add("noScroll");
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

    const res = await connectClient.getEntries({ content_type: 'infoPage' });
    const commonRes = await connectClient.getEntries({ content_type: 'commonAssets' });

    if (!res) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            commonAssets: commonRes.items[0].fields,
            infoImage: res.includes.Asset[0],
            aboutUs: res.items[0].fields,
            infoPageData: res.items[0].fields,
        }
    }
}