import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import Meta from '../components/common/meta';
import Content from '../components/homeContent/content';
import React, { useEffect } from "react";
import { connectClient } from '../components/common/utils/createClient';
import { gql } from "@apollo/client";
import client from "../pages/api/apollo-client";
import { homePageQuery, commonAssetsQuery } from "../pages/api/queries";

interface Types {
  homeProjects: string;
  commonAssets: any;
  homePageData: any;
}

const Home: React.FC<Types> = ({ homeProjects, commonAssets, homePageData }): JSX.Element => {
  // removes needsScroll class set in project pages from vertical scroll
  // projectPage useEffect hook needs refactoring to avoid calling it again here.

  useEffect(() => {
    const bg = document.body;
    bg.classList.remove("needsScroll");
    bg.removeAttribute("style");
  });

  const loaderLink = commonAssets.loader.fields.file.url;

  console.log(homePageData);

  return (
    <>
      <Meta page={"Home"} />
      <Layout commonAssets={commonAssets}>
        <Content homeProjects={homeProjects} loaderLink={loaderLink} />
      </Layout>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {

  const res = await connectClient.getEntries({ content_type: 'homePage' });

  const commonRes = await connectClient.getEntries({ content_type: 'commonAssets' });

  const { data } = await client.query({
    query: homePageQuery
  });

  if (!res) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      homeProjects: res.items,
      commonAssets: commonRes.items[0].fields,
      homePageData: data
    },
    revalidate: 300
  }
}