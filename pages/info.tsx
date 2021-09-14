import Layout from '../components/layout';
import { GetStaticProps} from 'next';
import Meta  from '../components/common/meta';
import React, { useEffect } from "react";
import InfoBox from '../components/infoContent/infoBox';
import InfoWarpImg from '../components/infoContent/infoWarpedPlane';
import { connectClient } from '../components/common/utils/createClient';
import useSWR, { SWRConfig } from 'swr';
import Loader from "../components/common/loader";


interface Type{
    infoPageData: any;
    fallback: string;
}

export default function info({ infoPageData, fallback }:Type):JSX.Element{
// removes needsScroll class set in project pages from vertical scroll
// projectPage useEffect hook needs refactoring to avoid calling it again here.

  useEffect(()=>{
    const bg = document.body;
    bg.classList.remove("needsScroll");
},[]);

async function fetcher(url){
    const res = await fetch(url);
    return res.json();
}

//use swr cache revalidation magic
const infoEntryID = "65tpeH9l765M0OdtSeFDWN";
const infoAssetID = "4HforvkWa8x76LM9AZ1srE";
const baseUrlSyncApi = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/sync?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}&initial=true&type=Entry&content_type=infoPage&limit=40`;
// const baseUrlAssets = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master/assets/${infoAssetID}?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
const allEntries = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
const singleEntry = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master/entries/${infoEntryID}?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
const baseUrlSingleContentType = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master/content_types/infoPage?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
const baseUrlAssets = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master/assets/${infoAssetID}?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
const baseUrlAssetsFields = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master/assets/${infoAssetID}?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;

const { data } = useSWR( singleEntry, fetcher);




const aboutUs = infoPageData.aboutUs?.content[0].content[0].value;
// const aboutUs = data?.fields.aboutUs.content[0].content[0].value;
const infoImage =  infoPageData.infoImage?.fields.file.url;

const src = infoImage ? infoPageData.infoImage?.fields.file.url : null;

console.log(data);
// console.log(infoPageData);

// console.log(infoImage);

console.log(baseUrlAssetsFields);

    return(
        <>
            <Meta page={"Info"} />
            <Layout>
                <InfoBox aboutUs={aboutUs} />
                <InfoWarpImg src={src} />
                {/* <SWRConfig value={{ fallback }}>
                    <InfoBox aboutUs={aboutUs} />
                    <InfoWarpImg src={src} />
                </SWRConfig> */}
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
            fallback:{
                infoImage: res.includes.Asset[0],
                aboutUs: res.items[0].fields,
            infoPageData: res.items[0].fields
            }
        }
    }
}