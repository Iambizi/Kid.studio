import fs from 'fs'
import path from 'path'
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import ProjectList from '../components/workContent/projectList';
import { connectClient } from '../components/common/utils/createClient';
interface Type {
    workPageData: any;
    workData: any;
}


export default function work({workPageData, workData}:Type):JSX.Element{
    console.log(workData);
    const [bgImg, setbgImg] = useState(false);
     return(
         <>
            <Meta page={"Work"} />
            <Layout bgImg={bgImg} setbgImg={setbgImg}>
                <ProjectList bgImg={bgImg} setbgImg={setbgImg} projects={ workPageData.projects }  />
            </Layout>
         </>
     )
}

export const getStaticProps: GetStaticProps = async ()=>{
    
    const fileToRead = path.join(process.cwd(),'./backEndDummyData/projectsList.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());

    const res = await connectClient.getEntries({ content_type: 'workPage' });
    
    if (!data) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            workPageData: data,
            workData: res.items
        },
        revalidate: 300
    }
}