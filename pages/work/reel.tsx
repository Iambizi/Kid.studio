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


interface Type{
    reelPageData: any;
    reelData: any;
}
export default function reels({reelPageData, reelData}: Type):JSX.Element{
    const router = useRouter();
    const pathName = router.pathname;
    const comparison = pathName === "/work/reel";
    
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
            <Meta page={reelPageData.title} />
            <Layout specificStyles={`${styles.projectPages}`}>
                <ReelInfo reelTitle={title} reelDetails={details} videoCover={videoCover} playButton={playButton} projectVideo={projectVideo} />
                <ReelStills reels={reelPageData} reelStills={reelStills} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ()=>{
    
    const fileToRead = path.join(process.cwd(),'./backEndDummyData/projects/reelPage.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());

    const res = await connectClient.getEntries({ content_type: 'reelPage' });

    const reelData = res.items[0].fields;

    return {
        props: {
            reelPageData: data,
            reelData: reelData
        }
    }
}
