import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import Layout from '../components/layout';
import Meta from '../components/common/meta';
import ProjectList from '../components/workContent/projectList';
import styles from '../styles/scss/common/_footer.module.scss';
import apolloClient from '../pages/api/apollo-client';
import { workPageQuery } from '../pages/api/queries';
import { workPageTypes, commonPageTypes } from '../components/props/propTypes';

interface Type {
  commonData: commonPageTypes;
  workPageData: workPageTypes;
}

const Work: React.FC<Type> = ({
  workPageData,
  commonData,
}): JSX.Element => {
  const [bgImg, setbgImg] = useState(false);

  return (
    <>
      <Meta page={'Work'} />
      <Layout
        commonData={commonData}
        bgImg={bgImg}
        setbgImg={setbgImg}
        specificStyles={styles.workPageFooter}
      >
        <ProjectList
          bgImg={bgImg}
          setbgImg={setbgImg}
          workPageData={workPageData}
        />
      </Layout>
    </>
  );
};

export default Work;

export const getStaticProps: GetStaticProps = async () => {


  const { data } = await apolloClient.query({
    query: workPageQuery,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      commonData: data.commonAssetsCollection.items[0],
      workPageData: data.workPageCollection.items,
    },
  };
};
