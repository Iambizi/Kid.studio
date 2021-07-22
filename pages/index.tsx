import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import Content from '../components/homeContent/content';
import React, { useEffect } from "react";
import { createClient } from 'contentful';

interface Type{
  homeProjects: any;
  projects: string;
}

export default function home({homeProjects, projects}: Type):JSX.Element {
  // removes needsScroll class set in project pages from vertical scroll
  // projectPage useEffect hook needs refactoring to avoid calling it again here.
    useEffect(()=>{
        const bg = document.body;
        bg.classList.remove("needsScroll");
    },[]);
    
  return (
    <>
        <Meta page={"Home"} />
          <Layout>
            <Content homeProjects={homeProjects} projects={projects} />
        </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () =>{

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY
  });

  const res = await client.getEntries({ content_type: 'homePage' });

  
  const fileToRead = path.join(process.cwd(),'./backEndData/homeProjects.json');
  const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
  // const project = data.projects.find(project => project.path === projectPath)
  const HomeProjects = data.homeProjects.map((item, i)=>(data.homeProjects[i]))
  // console.log(data.projects[0].path)
  return {
      props: {
          homeProjects: HomeProjects,
          projects: res.items
      },
      revalidate: 300
  }
}