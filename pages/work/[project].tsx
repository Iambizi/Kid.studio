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
    projects: any;
}

export default function projectPages( {projectsPageData, projects}: Type):JSX.Element{
    // console.log(projectsPageData);
    const router = useRouter();
    const pathName = router.pathname;
    const comparison = pathName === "/work/[project]";
    // console.log(projects);

    // console.log(projects[0].fields.projectSlug);

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
    
    const fileToRead = path.join(process.cwd(),'./backEndDummyData/projects/projectPage.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
    
    // using page specific data return data according to the params (specific project being selected)
    // Once I start creating api endpoints this will no longer be necessary
    const pageSpecificData = data.projectPage.map((item, i)=>(data.projectPage[i])).find(item => item.path.includes(projectPath));
    const pageSpecificDataS = JSON.parse(JSON.stringify(pageSpecificData));
    // const pageSpecificDataS = JSON.parse(pageSpecificData);
    

    const res = await connectClient.getEntries({ content_type: 'projectPage' });
    
    const projectID = res.items[0].sys.id;
    const projectFields: any = res.items[0].fields;
    const projectSlug = projectFields.projectSlug;

    res.items.map((item, i)=>{
     console.log(res.items[i].sys.id);
    })
    
    const entry = await connectClient.getEntry(projectID);
    // console.log(entry);
    console.log(projectPath);
    // console.log(res);
    console.log(projectSlug);

    return {
        props: {
            projectsPageData: pageSpecificDataS,
            projects: res.items
        }
    }
}

// export const getStaticPaths: GetStaticPaths = async () =>{
//     return {
//         paths: [
//             { params: { project: 'project' }}
//         ],
//         fallback: 'blocking'
//     };
// }

export const getStaticPaths: GetStaticPaths = async () =>{
    const res = await connectClient.getEntries({ content_type: 'projectPage' });
    
    return {
        paths: [
            res.items.map((item, i)=>{
                const projectFields: any = res.items[i].fields;
                { params: { project: projectFields.projectSlug }}
               })
            
        ],
        fallback: 'blocking'
    };
}
