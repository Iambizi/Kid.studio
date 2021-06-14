import fs from 'fs'
import path from 'path'
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import ProjectList from '../components/workContent/projectList';

interface Type {
    workPageData: any;
}
export default function work({workPageData}:Type):JSX.Element{
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

export const getStaticProps: GetStaticProps = async (context)=>{
    const  { params } = context;
    
    const fileToRead = path.join(process.cwd(),'./backEndData/projectsList.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
    // const project = data.projects.find(project => project.path === projectPath)
    // const projects = data.projects.map((item, i)=>(item[i]))
    if (!data) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            workPageData: data
        },
        revalidate: 300
    }
}