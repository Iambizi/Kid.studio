import Layout from '../../components/layout';
import Meta  from '../../components/common/meta';
import { GetStaticPaths, GetStaticProps} from 'next';
import fs from 'fs'
import path from 'path'


export default function projectPages(){
    return(
        <>
            <Meta page={"Reel"} />
            <Layout>
                <h1>New video Project</h1>
            </Layout>
        </>
    )
}

// export const getStaticProps: GetStaticProps = async (context)=>{
//     const  { params } = context;
//     const base = process.env.NEXT_PUBLIC_APP_DOMAIN
//     const projectPath = params.path;
//     const fileToRead = path.join(base,'./projects.json')
//     const data = JSON.parse(await fs.readFileSync(fileToRead).toString())
//     const project = data.blogs.find(project => project.id === projectPath)
//     return {
//         props: {
//             work: project
//         }
//     }
// }

export const getStaticPaths: GetStaticPaths = async () =>{
    return {
        paths: [{params: {project:'ya'}}],
        fallback: 'blocking'
    };
}

export const getStaticProps: GetStaticProps = async ({params})=>{
    return {
        props: {
            work: [
                {
                    // title: "BRYSON TILLER 'ALWAYS FOREVER'",
                    path: "/bryson-tiller-always-forever"
                },
                {
                    // title: "BIG SEAN 'WOLVES' FT. POST MALONE",
                    path: "/wolves"
                },
                {
                    // title: "MUSTAFA 'AIR FROCES'",
                    path: "/mustafa-air-forces"
                }
            ]
        }
    }
}

