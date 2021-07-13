import Navigation from "../components/common/header/navigation";
import Footer from "../components/common/footer";
import React, { useState, useEffect } from "react";
import projectPages from "../pages/work/[project]";
import styles from "../styles/scss/common/_layout.module.scss";
import Router from "next/router";
import { getRandoNum } from "./common/utils/getRandoNum";

interface Type {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string;
    flashImgData?: string[];
}

export default function layout({ children, bgImg, setbgImg, specificStyles }:Type):JSX.Element{
    const [ displayChildren, setDisplayChildren ] = useState(children);
    const [ transitionStage, setTransitionStage ] = useState("fadeOut");
    const [ flashed, setFlashed ] = useState(false);

    // useEffect(() => {
    //     setTransitionStage("fadeIn");
    //   }, []);

    //   useEffect(() => {
    //     if (children !== displayChildren) setTransitionStage("fadeOut");
    //   }, [children, setDisplayChildren, displayChildren]);

    const flash = () => {
        const flashObj = document.getElementById("flash");
        setInterval(() => {
            const rando = getRandoNum(1,9);
            const imgLink = `https://kidstudio.co/assets/images/flash/${rando}.png`;
            flashObj.style.backgroundImage = `url(${imgLink})`;
            flashObj.style.zIndex = "5656565656565656565656";
            setFlashed(true);
            console.log(imgLink);
			setTimeout(()=> {
                setFlashed(false);
			}, 100);
        }, 15000);
    }

    useEffect(() =>{
        flash();
    },[]);

    return(
        <>
            <Navigation bgImg={bgImg} />
            <div className={ flashed ? `${styles.flash}` : `${styles.flash} ${styles.hideFlash}` } id="flash"></div>
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
