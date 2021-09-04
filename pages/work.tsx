import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import ProjectList from '../components/workContent/projectList';
import { connectClient } from '../components/common/utils/createClient';
import useSWR from 'swr';
import fetcherFunction  from '../components/common/utils/fetcherFunction';

interface Type {
    workData: any;
}


export default function work({ workData }:Type):JSX.Element{
    const [bgImg, setbgImg] = useState(false);
    
        //use swr cache revalidation magic
        const baseUrl = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
        const { data } = useSWR(baseUrl, fetcherFunction, {initialData: workData, refreshInterval: 180000}) 


     return(
         <>
            <Meta page={"Work"} />
            <Layout bgImg={bgImg} setbgImg={setbgImg}>
                { data? <ProjectList bgImg={bgImg} setbgImg={setbgImg} projectList={data}  /> : null}
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