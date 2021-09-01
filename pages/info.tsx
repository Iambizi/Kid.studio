import Layout from '../components/layout';
import { GetStaticProps} from 'next';
import Meta  from '../components/common/meta';
import React, { useEffect } from "react";
import InfoBox from '../components/infoContent/infoBox';
import InfoWarpImg from '../components/infoContent/infoWarpedPlane';
import { connectClient } from '../components/common/utils/createClient';
import useSWR from 'swr';

interface Type{
    infoPageData: any;
}

export default function info({ infoPageData }:Type):JSX.Element{
// removes needsScroll class set in project pages from vertical scroll
// projectPage useEffect hook needs refactoring to avoid calling it again here.

  useEffect(()=>{
    const bg = document.body;
    bg.classList.remove("needsScroll");
},[]);
const aboutUs = infoPageData.aboutUs.content[0].content[0].value;
const infoImage = infoPageData.infoImage.fields.file.url;

const src = infoImage ? infoPageData.infoImage.fields.file.url : null;

    // async url fetcher function
    async function fetcher(url){
        const res = await fetch(url);
        return res.json();
    }

    //use swr revalidation magic
    const baseUrl = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
    console.log(baseUrl);
    const {data} = useSWR(baseUrl,fetcher, {initialData: infoPageData}) 

    return(
        <>
            <Meta page={"Info"} />
            <Layout>
            <InfoBox aboutUs={aboutUs} />
            <InfoWarpImg src={src} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ()=>{
    
    const res = await connectClient.getEntries({ content_type: 'infoPage' });
    // const fetcher = url => fetch(url).then(r => r.json())

    // const res = await fetcher(connectClient.getEntries({ content_type: 'infoPage' }))
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
        }
    }
}