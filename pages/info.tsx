import Layout from '../components/layout';
import { GetStaticProps } from 'next';
import Meta from '../components/common/meta';
import React, { useEffect } from "react";
import InfoBox from '../components/infoContent/infoBox';
import { connectClient } from '../components/common/utils/createClient';
import InfoPlaneCanvas from '../components/infoContent/infoCanvas';


interface Type {
    infoPageData: any;
    commonAssets: any;
}

const Info = ({ infoPageData, commonAssets }: Type): JSX.Element => {

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
                <InfoPlaneCanvas src={infoImage} />
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
            // fallback: {
            //     infoImage: res.includes.Asset[0],
            //     aboutUs: res.items[0].fields,
            //     infoPageData: res.items[0].fields
            // }
        }
    }
}