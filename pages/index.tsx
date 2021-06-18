import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import Content from '../components/homeContent/content';
import React, { useEffect } from "react";
import { useRouter } from 'next/router';

interface Type{
  homeProjects: any;
}

export default function home({homeProjects}: Type):JSX.Element {
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
            <Content homeProjects={homeProjects}  />
        </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context)=>{
  
  const  { params } = context;
  
  const fileToRead = path.join(process.cwd(),'./backEndData/homeProjects.json');
  const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
  // const project = data.projects.find(project => project.path === projectPath)
  const HomeProjects = data.homeProjects.map((item, i)=>(data.homeProjects[i]))
  // console.log(data.projects[0].path)
  return {
      props: {
          homeProjects: HomeProjects
      },
      revalidate: 300
  }
}