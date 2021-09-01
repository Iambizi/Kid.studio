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

        // async url fetcher function
        async function fetcher(url){
            const res = await fetch(url);
            return res.json();
        }
    
        //use swr revalidation magic
        const baseUrl = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
        console.log(baseUrl);
        const {data} = useSWR(baseUrl,fetcher, {initialData: workData}) 


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