import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import Meta from '../components/common/meta';
import Content from '../components/homeContent/content';
import React, { useEffect } from "react";
import { connectClient } from '../components/common/utils/createClient';

interface Type {
  homeProjects: string;
}

const Home = ({ homeProjects }: Type): JSX.Element => {
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
        <Content homeProjects={homeProjects} />
      </Layout>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {

  const res = await connectClient.getEntries({ content_type: 'homePage' });

  if (!res) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      homeProjects: res.items
    },
    revalidate: 300
  }
}