import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import Content from '../components/homeContent/content';
import React, { useEffect } from "react";
import { connectClient } from '../components/common/utils/createClient';
import useSWR from 'swr';
import fetcherFunction  from '../components/common/utils/fetcherFunction';

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

    // async url fetcher function
    async function fetcher(url){
      const res = await fetch(url);
      return res.json();
    }

    //use swr revalidation magic
    const baseUrl = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
    const { data } = useSWR(baseUrl, fetcherFunction, { initialData: projects });  
    
  return (
    <>
        <Meta page={"Home"} />
          <Layout>
            <Content homeProjects={ homeProjects } projects={ data } />
        </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () =>{

  const res = await connectClient.getEntries({ content_type: 'homePage' });

  const fileToRead = path.join(process.cwd(),'./backEndDummyData/homeProjects.json');
  const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
  // const project = data.projects.find(project => project.path === projectPath)
  const HomeProjects = data.homeProjects.map((item: any, i: number)=>(data.homeProjects[i]))
  // console.log(data.projects[0].path)
  
    if (!res) {
      return {
          notFound: true
      };
  }
  return {
      props: {
          homeProjects: HomeProjects,
          projects: res.items
      },
      revalidate: 300
  }
}