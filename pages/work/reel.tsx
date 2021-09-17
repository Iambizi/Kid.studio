import { GetStaticProps} from 'next';
import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import React, { useEffect } from "react";
import styles from '../../styles/scss/common/_footer.module.scss';
import ReelInfo from '../../components/reelContent/reelInfoSection';
import ReelStills from '../../components/reelContent/reelStills';
import { useRouter } from 'next/router';
import { connectClient } from '../../components/common/utils/createClient';
import useSWR from 'swr';

interface Type{
    reelData: any;
}

export default function reels({ reelData }: Type):JSX.Element{
    const router = useRouter();
    const pathName = router.pathname;
    const comparison = pathName === "/work/reel";

    async function fetcher(url){
        const res = await fetch(url);
        return res.json();
    }

    //use swr cache revalidation magic
    const reelEntryID = "4AcYGCG0p8FOFAj0bsaLYm";
    const baseUrl = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master/entries/${reelEntryID}?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
    // const singleEntry = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master/entries/${reelEntryID}?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}&include=10`;
    const singleEntry = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master/entries/?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}&content_type=reelPage&select=fields`;

    console.log(singleEntry);

    const {data} = useSWR(singleEntry, fetcher);

    console.log(data);
    
    const title = reelData.pageTitle;
    const details = reelData.details?.content[0].content[0].value;
    const videoCover = reelData.videoCover;
    const playButton = reelData.playButton?.fields.file.url;
    const projectVideo = reelData.projectVideo;
    const reelStills = reelData.videoStills;

    useEffect(()=>{

        const bg = document.body;
        
        if(pathName === "/work/reel"){
            bg.classList.add("needsScroll");
        }else if(comparison === false){
            bg.classList.remove("needsScroll");
        }

    },[]);
    
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
    const reelData = res.items[0].fields;
    
    return {
        props: {
            reelData: reelData
        }
    }
}
