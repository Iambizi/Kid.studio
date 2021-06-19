import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import React, { useEffect } from "react";

export default function info():JSX.Element{
// removes needsScroll class set in project pages from vertical scroll
// projectPage useEffect hook needs refactoring to avoid calling it again here.
  useEffect(()=>{
    const bg = document.body;
    bg.classList.remove("needsScroll");
},[]);
    return(
        <>
            <Meta page={"Info"} />
            <Layout>
                <h1>Info Page OOO</h1>
            </Layout>
        </>
    )
}