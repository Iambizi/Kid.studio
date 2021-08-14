import { GetStaticProps} from 'next';
import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import React, { useEffect } from "react";
import fs from 'fs'
import path from 'path'
import styles from '../../styles/scss/common/_footer.module.scss';
import ReelInfo from '../../components/reelContent/reelInfoSection';
import ReelStills from '../../components/reelContent/reelStills';
import { useRouter } from 'next/router';
import { connectClient } from '../../components/common/utils/createClient';
import useSWR from 'swr';


interface Type{
    reelData: any;
}

async function fetcher(url){
    const res = await fetch(url);
    return res.json();
}

export default function reels({ reelData } :Type):JSX.Element{
    const router = useRouter();
    const pathName = router.pathname;
    const comparison = pathName === "/work/reel";
    const baseUrl = "https://cdn.contentful.com?access_token=E2IVpgcZ42Dnz6TZREbi2FkPvdOCc-bYjM86apdVyYA";
    "/content_types"
    const {data} = useSWR("",fetcher, {initialData: reelData})
    
    const title = reelData.pageTitle;
    const details = reelData.details.content[0].content[0].value;
    const videoCover = reelData.videoCover.fields.file.url;
    const playButton = reelData.playButton.fields.file.url;
    const projectVideo = reelData.projectVideo;
    const reelStills = reelData.videoStills;

    useEffect(()=>{

        const bg = document.body;
        
        if(pathName === "/work/reel"){
            bg.classList.add("needsScroll");
        }else if(comparison === false){
            bg.classList.remove("needsScroll");
        }

    },[path]);
    
    return(
        <>
            <Meta page={title} />
            <Layout specificStyles={`${styles.projectPages}`}>
                <ReelInfo reelTitle={title} reelDetails={details} videoCover={videoCover} playButton={playButton} projectVideo={projectVideo} />
                <ReelStills reelStills={reelStills} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ()=>{
    
    const res = await connectClient.getEntries({ content_type: 'reelPage' });
    
    const entry = await connectClient.getEntry('6Ni31mFt8UZPFf7eGap7lS');
    console.log(entry);

    const reelData = res.items[0].fields;
    return {
        props: {
            reelData: reelData
        }
    }
}
