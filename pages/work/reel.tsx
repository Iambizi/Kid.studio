import { GetStaticProps} from 'next';
import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import React, {useEffect} from "react";
import styles from '../../styles/scss/common/_footer.module.scss';
import MainInfoSection from '../../components/workContent/project-Reel-Pages/mainInfo';
import Stills from '../../components/workContent/project-Reel-Pages/stills';
import { connectClient } from '../../components/common/utils/createClient';

interface Type{
    reelData: any;
}

 const Reels = ({ reelData }: Type):JSX.Element =>{

    const reelTitle = reelData?.pageTitle;
    const reelDetails = reelData?.details?.content[0].content[0].value;
    const videoCover = reelData?.videoCover;
    const playButton = reelData?.playButton?.fields.file.url;
    const projectVideo = reelData?.projectVideo;
    const reelStills = reelData?.videoStills;

    useEffect(()=>{
        const bg = document.body;
        bg.classList.add("needsScroll");
        // bg.classList.remove("noScroll");
        bg.removeAttribute("style");
    },[]);

    
    return(
        <>
            <Meta page={reelTitle} />
            <Layout specificStyles={`${styles.projectPages}`}>
                <MainInfoSection title={reelTitle} details={reelDetails} videoCover={videoCover} playButton={playButton} projectVideo={projectVideo} />
                <Stills Stills={reelStills} />
            </Layout>
        </>
    )
}

export default Reels;

export const getStaticProps: GetStaticProps = async ()=>{
    
    const res = await connectClient.getEntries({ content_type: 'reelPage' });
    const reelData = res.items[0].fields;

    if (!res) {
        return {
          notFound: true,
        }
      }
    
    return {
        props: {
            reelData: reelData
        }
    }
}
