import { GetStaticProps} from 'next';
import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import React, { useEffect } from "react";
import fs from 'fs'
import path from 'path'
import styles from '../../styles/scss/common/_footer.module.scss';
import MainInfo from '../../components/reelContent/reelInfoSection';
import Stills from '../../components/reelContent/reelStills';

interface Type{
    reelPageData: any;
}
export default function reels({reelPageData}: Type):JSX.Element{
    useEffect(()=>{
        const bg = document.body;
        bg.classList.remove("needsScroll");
    },[]);
    console.log(reelPageData);
    return(
        <>
            <Meta page={reelPageData.title} />
            <Layout specificStyles={`${styles.projectPages}`}>
                <MainInfo reels={reelPageData} />
                <Stills reels={reelPageData} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context)=>{

    const { params } = context;
    
    const fileToRead = path.join(process.cwd(),'./backEndData/projects/reelsPage.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
    
    // using page specific data return data according to the params (specific project being selected)
    // Once I start creating api endpoints this will no longer be necessary
    
    return {
        props: {
            reelPageData: data
        }
    }
}
