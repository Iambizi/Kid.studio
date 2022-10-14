import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import Meta from '../components/common/meta';
import Content from '../components/homeContent/content';
import React, { useEffect } from "react";
import { connectClient } from '../components/common/utils/createClient';
import apolloClient from "../pages/api/apollo-client";
import { homePageQuery, commonAssetsQuery } from "../pages/api/queries";
import { homePageTypes } from "../components/propTypes/homePageTypes";

interface Types {
  commonAssets: any;
  homePageData: homePageTypes;
}

const Home: React.FC<Types> = ({ commonAssets, homePageData }): JSX.Element => {
  // removes needsScroll class set in project pages from vertical scroll
  // projectPage useEffect hook needs refactoring to avoid calling it again here.

  useEffect(() => {
    const bg = document.body;
    bg.classList.remove("needsScroll");
    bg.removeAttribute("style");
  });

  const loaderLink = commonAssets.loader.fields.file.url;

  return (
    <>
      <Meta page={"Home"} />
      <Layout commonAssets={commonAssets}>
        <Content homePageData={homePageData} loaderLink={loaderLink} />
      </Layout>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {

  const commonRes = await connectClient.getEntries({ content_type: 'commonAssets' });

  const { data } = await apolloClient.query({
    query: homePageQuery
  });

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      commonAssets: commonRes.items[0].fields,
      homePageData: data.homePageCollection.items
    },
    revalidate: 300
  }
}