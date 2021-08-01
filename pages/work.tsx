import fs from 'fs'
import path from 'path'
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import ProjectList from '../components/workContent/projectList';
import { connectClient } from '../components/common/utils/createClient';
import useSWR from 'swr';

interface Type {
    workData: any;
}


export default function work({ workData }:Type):JSX.Element{
    const [bgImg, setbgImg] = useState(false);
     return(
         <>
            <Meta page={"Work"} />
            <Layout bgImg={bgImg} setbgImg={setbgImg}>
                <ProjectList bgImg={bgImg} setbgImg={setbgImg} projectList={workData}  />
            </Layout>
         </>
     )
}

export const getStaticProps: GetStaticProps = async ()=>{
    
    const res = await connectClient.getEntries({ content_type: 'workPage' });
    
    if (!res) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            workData: res.items
        },
        revalidate: 300
    }
}