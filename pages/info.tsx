import Layout from '../components/layout';
import { GetStaticProps} from 'next';
import Meta  from '../components/common/meta';
import React, { useEffect } from "react";
import InfoBox from '../components/infoContent/infoBox';
import InfoWarpImg from '../components/infoContent/infoWarpedPlane';
import { connectClient } from '../components/common/utils/createClient';
import useSWR from 'swr';

interface Type{
    infoData: any;
}

export default function info({ infoData }:Type):JSX.Element{
// removes needsScroll class set in project pages from vertical scroll
// projectPage useEffect hook needs refactoring to avoid calling it again here.
console.log(infoData);

  useEffect(()=>{
    const bg = document.body;
    bg.classList.remove("needsScroll");
},[]);

const src = infoData ? infoData.fields.file.url : null;

    return(
        <>
            <Meta page={"Info"} />
            <Layout>
            <InfoBox />
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
            infoData: res.includes.Asset[0]
        }
    }
}