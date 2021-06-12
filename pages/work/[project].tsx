import { GetStaticPaths, GetStaticProps} from 'next';
import fs from 'fs'
import path from 'path'
import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import MainInfo from '../../components/workContent/projectPages/mainInfoSection'


interface Type{
    projects: any;
}

export default function projectPages({projects}: Type){
    return(
        <>
            <Meta page={"Reel"} />
            <Layout>
                {/* <h1>{projects[0].title}</h1> */}
                <MainInfo projects={projects} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context)=>{
    const  { params } = context;
    const projectPath = params.path;
    const fileToRead = path.join(process.cwd(),'./projectsData/projects.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
    // const project = data.projects.find(project => project.path === projectPath)
    const projects = data.projects.map((item, i)=>(data.projects[i]))
    // console.log(data.projects[0].path)
    console.log(projects);
    return {
        props: {
            projects: projects
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () =>{
    return {
        paths: [
            { params: { project: 'project' }}
        ],
        fallback: 'blocking'
    };
}

