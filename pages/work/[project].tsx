import { GetStaticPaths, GetStaticProps} from 'next';
import fs from 'fs'
import path from 'path'
import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import MainInfo from '../../components/workContent/projectPages/mainInfoSection';
import Stills from '../../components/workContent/projectPages/stills';
import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import styles from '../../styles/scss/common/_footer.module.scss';
import { connectClient } from '../../components/common/utils/createClient';



interface Type{
    projectsPageData: any;
    projectPage: any;
}

export default function projectPages( {projectsPageData, projectPage}: Type):JSX.Element{
    const router = useRouter();
    const pathName = router.pathname;
    const comparison = pathName === "/work/[project]";

    console.log(projectPage);

    const title = projectPage.projectTitle;
    const details = projectPage.projectCreds.content[0].content[0].value;
    const videoCover = projectPage.videoCover.fields.file.url;
    const playButton = projectPage.playButton.fields.file.url;
    const projectVideo = projectPage.projectVideo;
    const projectStills = projectPage.videoStills;

    useEffect(()=>{

        const bg = document.body;
        
        if(pathName === "/work/[project]"){
            bg.classList.add("needsScroll");
        }else if(comparison === false){
            bg.classList.remove("needsScroll");
        }

    },[path]);

    return(
        <>
            <Meta page={projectsPageData.title} />
            <Layout specificStyles={`${styles.projectPages}`}>
                <MainInfo projects={projectsPageData} title={title} details={details} videoCover={videoCover} playButton={playButton} projectVideo={projectVideo}/>
                <Stills projects={projectsPageData} projectStills={projectStills} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context)=>{

    const { params } = context;
    const projectPath = params.project;
    
    const fileToRead = path.join(process.cwd(),'./backEndDummyData/projects/projectPage.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
    
    // using page specific data return data according to the params (specific project being selected)
    // Once I start creating api endpoints this will no longer be necessary
    const pageSpecificData = data.projectPage.map((item, i)=>(data.projectPage[i])).find(item => item.path.includes(projectPath));
    const pageSpecificDataS = JSON.parse(JSON.stringify(pageSpecificData));
    
    const res: any = await connectClient.getEntries({ content_type: 'projectPage' });

    const projectPage = res.items.map((item,i)=> res.items[i]).find((item, i) => res.items[i].fields.projectSlug.includes(projectPath));

    return {
        props: {
            projectsPageData: pageSpecificDataS,
            projects: res.items,
            projectPage: projectPage.fields
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () =>{
    const res: any = await connectClient.getEntries({ content_type: 'projectPage' });
    
    const paths = res.items.map((item) => ({
        params: { project: item.fields.projectSlug },
      }))
    return {
        paths,
        fallback: 'blocking'
    };
}
