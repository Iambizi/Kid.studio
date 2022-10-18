import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import Meta from '../../components/common/meta';
import MainInfoSection from '../../components/workContent/project-Reel-Pages/mainInfo';
import Stills from '../../components/workContent/project-Reel-Pages/stills';
import React, { useEffect } from "react";
import styles from '../../styles/scss/common/_footer.module.scss';
import { connectClient } from '../../components/common/utils/createClient';
import apolloClient from "../../pages/api/apollo-client";
import { projectPageQuery } from "../../pages/api/queries";
import { projectPageTypes } from "../../components/props/propTypes";

interface Type {
    projectPageData: any;
    commonAssets: any;
    projectData: projectPageTypes;
}

const ProjectPages: React.FC<Type> = ({ projectPageData, commonAssets, projectData }): JSX.Element => {


    const title = projectData?.projectTitle;
    const details = projectData.projectCreds.json.content[0].content[0].value;
    const videoCover = projectPageData?.videoCover;
    const playButton = projectPageData?.playButton ? projectPageData.playButton?.fields.file.url : null;
    const projectVideo = projectData?.projectVideo;
    const projectStills = projectPageData?.videoStills;

    console.log(projectData);
    console.log(projectData?.videoCover.url);
    // console.log(projectData?.projectTitle);
    // console.log(projectData.projectCreds.json.content[0].content[0].value)

    useEffect(() => {
        const bg = document.body;
        bg.classList.add("needsScroll");
        bg.removeAttribute("style");
    }, []);

    return (
        <>
            <Meta page={title} />
            <Layout commonAssets={commonAssets} specificStyles={`${styles.projectPages}`}>
                <MainInfoSection title={title} details={details} videoCover={videoCover} playButton={playButton} projectVideo={projectVideo} projectData={projectData} />
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

    const commonRes = await connectClient.getEntries({ content_type: 'commonAssets' });

    const { data } = await apolloClient.query({
        query: projectPageQuery
    });

    const projectData = data.projectPageCollection.items.map((project, i) => (data.projectPageCollection.items[i])).find((slug, i) => (data.projectPageCollection.items[i].projectSlug.includes(projectPath)));
    // const projectPageData = res.items.map((item, i) => res.items[i]).find((item, i) => res.items[i].fields.projectSlug.includes(projectPath));
    // const projectData = data.projectPageCollection.items.map((project, i) => (project[i])).find((slug, i) => (data.projectPageCollection.items[i].projectSlug.includes(projectPath)));

    // console.log(projectData.projectTitle);

    if (!data) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            projects: res.items,
            projectPageData: projectPageData.fields,
            commonAssets: commonRes.items[0].fields,
            // projectData: data.projectPageCollection.items
            projectData: projectData
        }
    }
}

