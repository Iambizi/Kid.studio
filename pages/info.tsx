import Layout from '../components/layout';
import { GetStaticProps } from 'next';
import Meta from '../components/common/meta';
import React, { useEffect } from 'react';
import InfoBox from '../components/infoContent/infoBox';
import InfoPlaneCanvas from '../components/infoContent/infoCanvas';
import apolloClient from '../pages/api/apollo-client';
import { infoPageQuery } from '../pages/api/queries';
import { infoPageTypes, commonPageTypes } from '../components/props/propTypes';

interface Types {
  commonData: commonPageTypes;
  infoPageData: infoPageTypes;
  loaderLink: string;
}

const Info: React.FC<Types> = ({
  infoPageData,
  loaderLink,
  commonData,
}): JSX.Element => {
  const aboutUs = infoPageData?.aboutUs.json.content[0].content[0].value;
  const infoImage = infoPageData?.infoImage.url;

  useEffect(() => {
    const bg = document.body;
    bg.classList.remove('needsScroll');
    bg.removeAttribute('style');
  });

  return (
    <>
      <Meta page={'Info'} />
      <Layout commonData={commonData}>
        <InfoBox aboutUs={aboutUs} />
        <InfoPlaneCanvas src={infoImage} loaderLink={loaderLink} />
      </Layout>
    </>
  );
};

export default Info;

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await apolloClient.query({
    query: infoPageQuery,
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
      infoPageData: data.infoPageCollection.items[0],
    },
  };
};
