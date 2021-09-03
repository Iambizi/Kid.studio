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
import fetcherFunction  from '../../components/common/utils/fetcherFunction';


interface Type{
    reelData: any;
}

export default function reels({ reelData }: Type):JSX.Element{
    const router = useRouter();
    const pathName = router.pathname;
    const comparison = pathName === "/work/reel";

    // async url fetcher function
    async function fetcher(url){
        const res = await fetch(url);
        return res.json();
    }


    //use swr revalidation magic
    const baseUrl = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
    const {data} = useSWR(baseUrl,fetcher, {initialData: reelData})
    
    const title = data.pageTitle;
    const details = data.details.content[0].content[0].value;
    const videoCover = data.videoCover;
    const playButton = data.playButton.fields.file.url;
    const projectVideo = data.projectVideo;
    const reelStills = data.videoStills;

    console.log(data.details.content[0]);
    console.log(details);

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
