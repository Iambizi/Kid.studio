import Navigation from "../components/common/header/navigation"
import Footer from "../components/common/footer";
import React from "react";

interface Type {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
}

export default function layout({ children, bgImg, setbgImg }:Type):JSX.Element{
    return(
        <>
            <Navigation bgImg={bgImg} setbgImg={setbgImg} />
                {children}
            <Footer />
        </>
    );
}