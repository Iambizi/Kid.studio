import Navigation from "../components/common/header/navigation"
import Footer from "../components/common/footer";
import React from "react";
import projectPages from "../pages/work/[project]";

interface Type {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string;
}

export default function layout({ children, bgImg, setbgImg, specificStyles }:Type):JSX.Element{
    return(
        <>
            <Navigation bgImg={bgImg} />
                {children}
            <Footer bgImg={bgImg} specificStyles={specificStyles} />
        </>
    );
}