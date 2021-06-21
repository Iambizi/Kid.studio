import { GetStaticPaths, GetStaticProps} from 'next';
import fs from 'fs'
import path from 'path'
import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import MainInfo from '../../components/workContent/projectPages/mainInfoSection';
import Stills from '../../components/workContent/projectPages/stills';
// import Navigation from "../../components/common/header/navigation";
// import Footer from "../../components/common/footer";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from '../../styles/scss/common/_footer.module.scss';


interface Type{
    projectsPageData: any;
}

export default function projectPages( {projectsPageData}: Type){
    const router = useRouter();
    const pathName = router.pathname;
    const comparison = pathName === "/work/[project]";

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
                <MainInfo projects={projectsPageData} />
                <Stills projects={projectsPageData} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context)=>{

    const { params } = context;
    const projectPath = params.project;
    
    const fileToRead = path.join(process.cwd(),'./backEndData/projects/projectPage.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
    
    // using page specific data return data according to the params (specific project being selected)
    // Once I start creating api endpoints this will no longer be necessary
    const pageSpecificData = data.projectPage.map((item, i)=>(data.projectPage[i])).find(item => item.path.includes(projectPath));
    
    return {
        props: {
            projectsPageData: pageSpecificData
        }
    }
}

export const getStaticPaths: GetStaticPaths = async (context) =>{
    return {
        paths: [
            { params: { project: 'project' }}
        ],
        fallback: 'blocking'
    };
}

