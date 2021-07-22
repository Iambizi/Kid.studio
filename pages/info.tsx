import Layout from '../components/layout';
import { GetStaticProps} from 'next';
import Meta  from '../components/common/meta';
import React, { useEffect } from "react";
import fs from 'fs';
import path from 'path';
import InfoBox from '../components/infoContent/infoBox';
import InfoWarpImg from '../components/infoContent/infoWarpedPlane';
import { createClient } from 'contentful';


interface Type{
    infoPageData: any;
    infoData: any;
}

export default function info({ infoData }:Type):JSX.Element{
// removes needsScroll class set in project pages from vertical scroll
// projectPage useEffect hook needs refactoring to avoid calling it again here.
// console.log(infoDatap);

// const [ res, setRes ] = useState();
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
    
    const fileToRead = path.join(process.cwd(),'./backEndData/infoPage.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());

    const client = createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_ID,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY
      });

    const res = await client.getEntries({ content_type: 'infoPage' });
    
    return {
        props: {
            infoPageData: data,
            infoData: res.includes.Asset[0]
        }
    }
}