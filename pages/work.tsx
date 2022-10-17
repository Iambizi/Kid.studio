import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import ProjectList from '../components/workContent/projectList';
import { connectClient } from '../components/common/utils/createClient';
import styles from '../styles/scss/common/_footer.module.scss';
import apolloClient from "../pages/api/apollo-client";
import { workPageQuery } from "../pages/api/queries";
import { workPageTypes } from "../components/props/propTypes";

interface Type {
    workData: any;
    commonAssets: any;
    workPageData: any;
}


const Work: React.FC<Type> = ({ workData, commonAssets }):JSX.Element =>{
    const [bgImg, setbgImg] = useState(false);

     return(
         <>
            <Meta page={"Work"} />
            <Layout commonAssets={commonAssets} bgImg={bgImg} setbgImg={setbgImg} specificStyles={styles.workPageFooter}>
                <ProjectList bgImg={bgImg} setbgImg={setbgImg} projectList={workData}  />
            </Layout>
         </>
     )
}

export default Work;

export const getStaticProps: GetStaticProps = async ()=>{
    
    const res = await connectClient.getEntries({ content_type: 'workPage' });
    const commonRes = await connectClient.getEntries({ content_type: 'commonAssets' });

    const { data } = await apolloClient.query({
        query: workPageQuery
    });
    
    if (!res) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            commonAssets: commonRes.items[0].fields,
            workData: res.items,
            workPageData: data.items

        },
        revalidate: 300
    }
}