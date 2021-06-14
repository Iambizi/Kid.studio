import fs from 'fs'
import path from 'path'
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import ProjectList from '../components/workContent/projectList';

interface Type {
    projects: any;
}
export default function work({projects}:Type):JSX.Element{
    const [bgImg, setbgImg] = useState(false);
     return(
         <>
            <Meta page={"Work"} />
            <Layout bgImg={bgImg} setbgImg={setbgImg}>
                <ProjectList bgImg={bgImg} setbgImg={setbgImg} projects={projects}  />
            </Layout>
         </>
     )
}

export const getStaticProps: GetStaticProps = async (context)=>{
    const  { params } = context;
    
    const fileToRead = path.join(process.cwd(),'./backEndData/projectsList.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
    // const project = data.projects.find(project => project.path === projectPath)
    const projects = data.projects.map((item, i)=>(item[i]))
    // console.log(data.projects[0].path)
    return {
        props: {
            projects: projects
        },
        revalidate: 300
    }
}