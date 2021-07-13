import Navigation from "../components/common/header/navigation"
import Footer from "../components/common/footer";
import React, { useState, useEffect } from "react";
import projectPages from "../pages/work/[project]";
import styles from "../styles/scss/common/_layout.module.scss";
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
    const [ flashed, setFlashed ] = useState(false);

    // useEffect(() => {
    //     setTransitionStage("fadeIn");
    //   }, []);

    //   useEffect(() => {
    //     if (children !== displayChildren) setTransitionStage("fadeOut");
    //   }, [children, setDisplayChildren, displayChildren]);

    const flashImg = [
        "/assets/images/flash/1.png",
        "/assets/images/flash/2.png",
        "/assets/images/flash/3.png",
        "/assets/images/flash/4.png",
        "/assets/images/flash/5.png",
        "/assets/images/flash/6.png",
        "/assets/images/flash/7.png",
        "/assets/images/flash/8.png",
        "/assets/images/flash/9.png"
    ];
    const flash = ()=>{
        const item = flashImg[Math.floor(Math.random()*flashImg.length)];
        const flashObj = document.getElementById("flash");
        const imgLink = `https://kidstudio.co${item}`;
        
        setInterval(() => {
            flashObj.style.backgroundImage = `url(${imgLink})`;
            flashObj.style.zIndex = "5656565656565656565656";
            setFlashed(true);
			setTimeout(()=> {
                setFlashed(false);
			}, 100);
        }, 15000);
    }


    useEffect(()=>{
        flash();
        console.log(flashed);
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