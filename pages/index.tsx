import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import Meta from '../components/common/meta';
import Content from '../components/homeContent/content';
import React, { useEffect } from "react";
import { connectClient } from '../components/common/utils/createClient';

interface Type {
  homeProjects: string;
  commonAssets: any;
}

const Home = ({ homeProjects, commonAssets }: Type): JSX.Element => {
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
      <Layout commonAssets={commonAssets}>
        <Content homeProjects={homeProjects} />
      </Layout>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {

  const res = await connectClient.getEntries({ content_type: 'homePage' });

  const commonRes = await connectClient.getEntries({ content_type: 'commonAssets' });

  if (!res) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      homeProjects: res.items,
      commonAssets: commonRes.items[0].fields
    },
    revalidate: 300
  }
}