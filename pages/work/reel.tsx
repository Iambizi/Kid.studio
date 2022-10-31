import { GetStaticProps } from 'next';
import Layout from '../../components/layout';
import Meta from '../../components/common/meta';
import React, { useEffect } from 'react';
import styles from '../../styles/scss/common/_footer.module.scss';
import MainInfoSection from '../../components/workContent/project-Reel-Pages/mainInfo';
import Stills from '../../components/workContent/project-Reel-Pages/stills';
import apolloClient from '../../pages/api/apollo-client';
import { reelPageQuery } from '../../pages/api/queries';
import {
  reelPageTypes,
  commonPageTypes,
} from '../../components/props/propTypes';

interface Type {
  commonData: commonPageTypes;
  reelData: reelPageTypes;
}

const Reels: React.FC<Type> = ({
  reelData,
  commonData,
}): JSX.Element => {
  const reelTitle = reelData?.pageTitle;
  const reelDetails = reelData?.details.json.content[0].content[0].value;
  const videoCover = reelData?.videoCover;
  const playButton = reelData?.playButton.url;
  const projectVideo = reelData?.projectVideo;
  const reelStills = reelData?.videoStillsCollection.items;

  useEffect(() => {
    const bg = document.body;
    bg.classList.add('needsScroll');
    bg.removeAttribute('style');
  }, []);

  return (
    <>
      <Meta page={reelTitle} />
      <Layout commonData={commonData} specificStyles={`${styles.projectPages}`}>
        <MainInfoSection
          title={reelTitle}
          details={reelDetails}
          videoCover={videoCover}
          playButton={playButton}
          projectVideo={projectVideo}
        />
        <Stills stills={reelStills} />
      </Layout>
    </>
  );
};

export default Reels;

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await apolloClient.query({
    query: reelPageQuery,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      reelData: data.reelPageCollection.items[0],
      commonData: data.commonAssetsCollection.items[0]
    },
  };
};
