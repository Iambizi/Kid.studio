import Navigation from "../components/common/header/navigation";
import Footer from "../components/common/footer";
import Flash from "../components/common/flash";
import React from "react";

interface Type {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string;
}

export default function Layout( { children, bgImg, specificStyles }:Type ):JSX.Element{

    return(
        <>
            <Navigation bgImg={bgImg} />
            <Flash />
                { children }
            <Footer bgImg={bgImg} specificStyles={specificStyles} />
        </>
    );
}
