import { GetStaticProps} from 'next';
import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import React, {useEffect} from "react";
import styles from '../../styles/scss/common/_footer.module.scss';
import ReelInfo from '../../components/reelContent/reelInfoSection';
import ReelStills from '../../components/reelContent/reelStills';
import { connectClient } from '../../components/common/utils/createClient';

interface Type{
    reelData: any;
}

export default function Reels({ reelData }: Type):JSX.Element{

    const title = reelData?.pageTitle;
    const details = reelData?.details?.content[0].content[0].value;
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
