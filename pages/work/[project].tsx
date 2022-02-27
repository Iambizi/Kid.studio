import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import Meta from '../../components/common/meta';
import MainInfo from '../../components/workContent/projectPages/mainInfoSection';
import Stills from '../../components/workContent/projectPages/stills';
import React, { useEffect } from "react";
import styles from '../../styles/scss/common/_footer.module.scss';
import { connectClient } from '../../components/common/utils/createClient';

interface Type {
    projectsPageData: any;
    projectPage: any;
}

export default function ProjectPages({ projectPage }: Type): JSX.Element {

    const title = projectPage.projectTitle;
    const details = projectPage.projectCreds.content[0].content[0].value;
    const videoCover = projectPage.videoCover;
    const playButton = projectPage.playButton ? projectPage.playButton?.fields.file.url : null;
    const projectVideo = projectPage ? projectPage.projectVideo : null;
    const projectStills = projectPage.videoStills;

    useEffect(() => {
        const bg = document.body;
        bg.classList.add("needsScroll");
        
        bg.removeAttribute("style");
    }, []);

    return (
        <>
            <Meta page={title} />
            <Layout specificStyles={`${styles.projectPages}`}>
                <MainInfo title={title} details={details} videoCover={videoCover} playButton={playButton} projectVideo={projectVideo} />
                <Stills projectStills={projectStills} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { params } = context;
    const projectPath = params.project;

    // using page specific data return data according to the params (specific project being selected)
    // Once I start creating api endpoints this will no longer be necessary

    const res: any = await connectClient.getEntries({ content_type: 'projectPage' });

    const projectPage = res.items.map((item, i) => res.items[i]).find((item, i) => res.items[i].fields.projectSlug.includes(projectPath));

    return {
        props: {
            projects: res.items,
            projectPage: projectPage.fields
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res: any = await connectClient.getEntries({ content_type: 'projectPage' });

    const paths = res.items.map((item) => ({
        params: { project: item.fields.projectSlug },
    }))

    return {
        paths,
        fallback: 'blocking'
    };
}
