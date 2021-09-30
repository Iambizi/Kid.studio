import { GetStaticProps } from 'next';
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import ProjectList from '../components/workContent/projectList';
import { connectClient } from '../components/common/utils/createClient';
import styles from '../styles/scss/common/_footer.module.scss';
import useSWR from 'swr';

interface Type {
    workData: any;
}


export default function work({ workData }:Type):JSX.Element{
    const [bgImg, setbgImg] = useState(false);

    const [checkBottom, setBottom] = useState(false);

    

    async function fetcher(url){
        const res = await fetch(url);
        return res.json();
    }
    useEffect(()=>{
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        maxScroll ? setBottom(true) : null;
    },[])

    console.log(checkBottom);
    //use swr cache revalidation magic
    const baseUrl = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
    const { data } = useSWR(baseUrl, fetcher, { initialData: workData }) 


     return(
         <>
            <Meta page={"Work"} />
            <Layout bgImg={bgImg} setbgImg={setbgImg} specificStyles={ checkBottom ? `${styles.workPageFooter}`: null}>
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