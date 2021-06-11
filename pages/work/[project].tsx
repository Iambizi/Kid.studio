import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import { GetStaticPaths, GetStaticProps} from 'next';
import fs from 'fs'
import path from 'path'

interface Type{
    projects: any;
}

export default function projectPages({projects}: Type){
    console.log(projects);
    return(
        <>
            <Meta page={"Reel"} />
            <Layout>
                <h1>{projects.title}</h1>
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
            {params: {projects:'ya'}}
        ],
        fallback: 'blocking'
    };
}

// export const getStaticProps: GetStaticProps = async ({params})=>{
//     return {
//         props: {
//             work: [
//                 {
//                     // title: "BRYSON TILLER 'ALWAYS FOREVER'",
//                     path: "/bryson-tiller-always-forever"
//                 },
//                 {
//                     // title: "BIG SEAN 'WOLVES' FT. POST MALONE",
//                     path: "/wolves"
//                 },
//                 {
//                     // title: "MUSTAFA 'AIR FROCES'",
//                     path: "/mustafa-air-forces"
//                 }
//             ]
//         }
//     }
// }

