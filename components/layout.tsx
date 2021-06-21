import Navigation from "../components/common/header/navigation"
import Footer from "../components/common/footer";
import React, { useState, useEffect } from "react";
import projectPages from "../pages/work/[project]";
import styles from "../styles/scss/common/_transition.module.scss";
import Router from "next/router";

interface Type {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string;
}

export default function layout({ children, bgImg, setbgImg, specificStyles }:Type):JSX.Element{
    const [displayChildren, setDisplayChildren] = useState(children);
    const [transitionStage, setTransitionStage] = useState("fadeOut");

    useEffect(() => {
        setTransitionStage("fadeIn");
      }, []);

      useEffect(() => {
        if (children !== displayChildren) setTransitionStage("fadeOut");
      }, [children, setDisplayChildren, displayChildren]);

    return(
        <>
            <Navigation bgImg={bgImg} />
            {/* <div 
                onClick={() => {
                    if (transitionStage === "fadeOut") {
                        console.log("fading out");
                        setDisplayChildren(children);
                        setTransitionStage("fadeIn");
                    }
        }} className={`${styles.content} ${styles[transitionStage]}`}>
                {displayChildren}
            </div> */}
                {children}
            <Footer bgImg={bgImg} specificStyles={specificStyles} />
        </>
    );
}