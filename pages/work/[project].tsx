import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import Meta from '../../components/common/meta';
import MainInfoSection from '../../components/workContent/project-Reel-Pages/mainInfo';
import Stills from '../../components/workContent/project-Reel-Pages/stills';
import React, { useEffect } from 'react';
import styles from '../../styles/scss/common/_footer.module.scss';
import apolloClient from '../../pages/api/apollo-client';
import { projectPageQuery } from '../../pages/api/queries';
import {
  projectPageTypes,
  commonPageTypes,
} from '../../components/props/propTypes';

interface Type {
  commonData: commonPageTypes;
  projectData: projectPageTypes;
}

const ProjectPages: React.FC<Type> = ({
  projectData,
  commonData,
}): JSX.Element => {
  const title = projectData?.projectTitle;
  const details = projectData.projectCreds.json.content[0].content[0].value;
  const videoCover = projectData?.videoCover;
  const playButton = projectData?.playButton.url;
  const projectVideo = projectData?.projectVideo;
  const projectStills = projectData?.videoStillsCollection.items;

  useEffect(() => {
    const bg = document.body;
    bg.classList.add('needsScroll');
    bg.removeAttribute('style');
  }, []);

  return (
    <>
      <Meta page={title} />
      <Layout commonData={commonData} specificStyles={`${styles.projectPages}`}>
        <MainInfoSection
          title={title}
          details={details}
          videoCover={videoCover}
          playButton={playButton}
          projectVideo={projectVideo}
        />
        <Stills stills={projectStills} />
      </Layout>
    </>
  );
};

export default ProjectPages;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: projectPageQuery,
  });

  const paths = data.projectPageCollection.items.map((item) => ({
    params: { project: item.projectSlug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const projectPath = params.project;

  // using page specific data return data according to the params (specific project being selected)
  // Once I start creating api endpoints this will no longer be necessary

  const { data } = await apolloClient.query({
    query: projectPageQuery,
  });

  const projectData = data.projectPageCollection.items
    .map((project, i) => data.projectPageCollection.items[i])
    .find((slug, i) =>
      data.projectPageCollection.items[i].projectSlug.includes(projectPath)
    );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      // projectData: data.projectPageCollection.items
      commonData: data.commonAssetsCollection.items[0],
      projectData: projectData,
    },
    revalidate: 300,
  };
};
