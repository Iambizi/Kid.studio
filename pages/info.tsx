import Layout from '../components/layout';
import { GetStaticProps} from 'next';
import Meta  from '../components/common/meta';
import React, { useEffect } from "react";
import fs from 'fs';
import path from 'path';
import InfoBox from '../components/infoContent/infoBox';
import InfoWarpImg from '../components/infoContent/infoWarpedPlane';

interface Type{
    infoPageData: any;
}

export default function info({ infoPageData }:Type):JSX.Element{
// removes needsScroll class set in project pages from vertical scroll
// projectPage useEffect hook needs refactoring to avoid calling it again here.
// console.log(infoPageData);
  useEffect(()=>{
    const bg = document.body;
    bg.classList.remove("needsScroll");
},[]);
    return(
        <>
            <Meta page={"Info"} />
            <Layout>
            <InfoBox />
            <InfoWarpImg infoData={infoPageData} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ()=>{
    
    const fileToRead = path.join(process.cwd(),'./backEndData/infoPage.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
    
    return {
        props: {
            infoPageData: data
        }
    }
}