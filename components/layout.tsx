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

    // useEffect(() => {
    //     setTransitionStage("fadeIn");
    //   }, []);

    //   useEffect(() => {
    //     if (children !== displayChildren) setTransitionStage("fadeOut");
    //   }, [children, setDisplayChildren, displayChildren]);

    "https://kidstudio.co"

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
    ]
    const flash = ()=>{
        const item = flashImg[Math.floor(Math.random()*flashImg.length)];
        const flashObj = document.getElementById("flash");
        const imgLink = `https://kidstudio.co${item}`;
        
        console.log(flashObj);
        console.log(imgLink);

        setInterval(() => {
            flashObj.style.backgroundImage = imgLink;
			flashObj.classList.remove('hide-flash');
            console.log("flash!!!!!");
            console.log(flashObj);
			setTimeout(()=> {
				flashObj.classList.add('hide-flash');
			}, 100);
        }, 15000);
    }
    //link[index].addEventListener("mousemove", ()=> {
    // bg.style.backgroundPosition = `${e.pageX}px ${e.pageY}px`;
    // bg.style.zIndex = "420";

    useEffect(()=>{
        flash();
    },[]);
    return(
        <>
            <Navigation bgImg={bgImg} />
            <div className={`${styles.flash}`} id="flash"></div>
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