import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import Meta from '../components/common/meta';
import Content from '../components/homeContent/content';
import React, { useEffect } from "react";
import { connectClient } from '../components/common/utils/createClient';

interface Type {
  homeProjects: any;
  projects: string;
}

const Home = ({ homeProjects, projects }: Type): JSX.Element => {
  // removes needsScroll class set in project pages from vertical scroll
  // projectPage useEffect hook needs refactoring to avoid calling it again here.

  useEffect(()=>{
    const bg = document.body;
    bg.classList.remove("needsScroll");
    // bg.classList.add("noScroll");
    bg.removeAttribute("style");
  });


  return (
    <>
      <Meta page={"Home"} />
      <Layout>
        <Content homeProjects={homeProjects} projects={projects} />
      </Layout>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {

  const res = await connectClient.getEntries({ content_type: 'homePage' });

  const fileToRead = path.join(process.cwd(), './backEndDummyData/homeProjects.json');
  const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
  // const project = data.projects.find(project => project.path === projectPath)
  const HomeProjects = data.homeProjects.map((item: any, i: number) => (data.homeProjects[i]))
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