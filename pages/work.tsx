import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import ProjectList from '../components/workContent/projectList';

export default function work():JSX.Element{
     return(
         <>
            <Meta page={"Work"} />
            <Layout>
                <ProjectList />
            </Layout>
         </>
     )
}