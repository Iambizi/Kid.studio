import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import Meta from '../components/common/meta';
import Content from '../components/homeContent/content';
import React, { useEffect } from 'react';
import apolloClient from '../pages/api/apollo-client';
import { homePageQuery } from '../pages/api/queries';
import { homePageTypes, commonPageTypes } from '../components/props/propTypes';

interface Types {
  commonData: commonPageTypes;
  homePageData: homePageTypes;
  loaderLink: string;
}

const Home: React.FC<Types> = ({
  homePageData,
  loaderLink,
  commonData,
}): JSX.Element => {
  // removes needsScroll class set in project pages from vertical scroll
  // projectPage useEffect hook needs refactoring to avoid calling it again here.

  useEffect(() => {
    const bg = document.body;
    bg.classList.remove('needsScroll');
    bg.removeAttribute('style');
  });

  // const loaderLink = commonAssets.loader.fields.file.url;

  return (
    <>
      <Meta page={'Home'} />
      <Layout commonData={commonData}>
        <Content homePageData={homePageData} loaderLink={loaderLink} />
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apolloClient.query({
    query: homePageQuery,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      commonData: data.commonAssetsCollection.items[0],
      loaderLink: data.commonAssetsCollection.items[0].loader.url,
      homePageData: data.homePageCollection.items,
    },
  };
};
