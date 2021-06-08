import Layout from '../components/layout';
import React, { useState } from 'react';
import Meta  from '../components/common/meta';
import ProjectList from '../components/workContent/projectList';


export default function work():JSX.Element{
    const [bgImg, setbgImg] = useState(false);
     return(
         <>
            <Meta page={"Work"} />
            <Layout bgImg={bgImg} setbgImg={setbgImg}>
                <ProjectList bgImg={bgImg} setbgImg={setbgImg}  />
            </Layout>
         </>
     )
}