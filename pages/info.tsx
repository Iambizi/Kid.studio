import Layout from '../components/layout';
import { GetStaticProps } from 'next';
import Meta from '../components/common/meta';
import React, { useEffect } from "react";
import InfoBox from '../components/infoContent/infoBox';
// import InfoWarpImg from '../components/infoContent/infoWarpedR3f';
import InfoWarpImg from '../components/infoContent/infoWarpedR3f2';
// import InfoWarpImg from '../components/common/commonWarpedPlane';
import { connectClient } from '../components/common/utils/createClient';
import {InfoPlaneCanvas} from '../components/infoContent/infoCanvas';


interface Type {
    infoPageData: any;
    fallback: string;
}

export default function Info({ infoPageData, fallback }: Type): JSX.Element {

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
            <Layout>
                <InfoBox aboutUs={aboutUs} />
                <InfoPlaneCanvas src={infoImage} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const res = await connectClient.getEntries({ content_type: 'infoPage' });

    if (!res) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            infoImage: res.includes.Asset[0],
            aboutUs: res.items[0].fields,
            infoPageData: res.items[0].fields,
            fallback: {
                infoImage: res.includes.Asset[0],
                aboutUs: res.items[0].fields,
                infoPageData: res.items[0].fields
            }
        }
    }
}