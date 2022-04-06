import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import Meta from '../../components/common/meta';
import MainInfoSection from '../../components/workContent/project-Reel-Pages/mainInfo';
import Stills from '../../components/workContent/project-Reel-Pages/stills';
import React, { useEffect } from "react";
import styles from '../../styles/scss/common/_footer.module.scss';
import { connectClient } from '../../components/common/utils/createClient';

interface Type {
    projectPageData: any;
}

const ProjectPages = ({ projectPageData }: Type): JSX.Element => {

    const title = projectPageData?.projectTitle;
    const details = projectPageData?.projectCreds.content[0].content[0].value;
    const videoCover = projectPageData?.videoCover;
    const playButton = projectPageData?.playButton ? projectPageData.playButton?.fields.file.url : null;
    const projectVideo = projectPageData ? projectPageData.projectVideo : null;
    const projectStills = projectPageData?.videoStills;

    useEffect(() => {
        const bg = document.body;
        bg.classList.add("needsScroll");
        
        bg.removeAttribute("style");
    }, []);

    return (
        <>
            <Meta page={title} />
            <Layout specificStyles={`${styles.projectPages}`}>
                <MainInfoSection title={title} details={details} videoCover={videoCover} playButton={playButton} projectVideo={projectVideo} />
                <Stills Stills={projectStills} />
            </Layout>
        </>
    )
}

export default ProjectPages;

export const getStaticPaths: GetStaticPaths = async () => {
    const res: any = await connectClient.getEntries({ content_type: 'projectPage' });

    const paths = res.items.map((item) => ({
        params: { project: item.fields.projectSlug },
    }));

    return {
        paths,
        fallback: "blocking",
    };
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { params } = context;
    const projectPath = params.project;

    // using page specific data return data according to the params (specific project being selected)
    // Once I start creating api endpoints this will no longer be necessary

    const res: any = await connectClient.getEntries({ content_type: 'projectPage' });

    const projectPageData = res.items.map((item, i) => res.items[i]).find((item, i) => res.items[i].fields.projectSlug.includes(projectPath));

    if (!res) {
        return {
          notFound: true,
        }
      }

    return {
        props: {
            projects: res.items,
            projectPageData: projectPageData.fields
        }
    }
}

