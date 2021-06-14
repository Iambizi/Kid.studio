import { GetStaticPaths, GetStaticProps} from 'next';
import fs from 'fs'
import path from 'path'
import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import MainInfo from '../../components/workContent/projectPages/mainInfoSection'


interface Type{
    projects: any;
}

export default function projectPages( {projects}: Type){
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
    const { params } = context;
    // console.log({ params });
    const projectPath = params.project;
    const fileToRead = path.join(process.cwd(),'./backEndData/projectsList.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead).toString());
    // const project = data.projects.find( item => item.path);
    const projects = data.projects.map((item, i)=>(data.projects[i])).find(item => item.id );
    // const projects = projectPath;
    console.log(projects);
    // return posts.map(post => {
    //     return {
    //       params: {
    //         id: post.id
    //       }
    //     }
    //   })
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

