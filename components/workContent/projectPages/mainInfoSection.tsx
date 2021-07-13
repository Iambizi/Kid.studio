import Image from 'next/image';
import styles from "../../../styles/scss/projectPages/_projectPages.module.scss";
import React, { useState, useEffect } from "react";

interface Type{
    projects: any;
}

export default function mainInfoSection( {projects}: Type ):JSX.Element{
    // hook for handling z-index state
    const [toggleIndex, setToggleIndex] = useState(false);

    

    const handleIndex = () => {
        // console.log(video);

        // setToggleIndex(true);
        // console.log("yooo");

        // function addClass(){
        //     video.classList.add(`${styles.toggleIndex}`)
        // }
        // function removeClass(){
        //     video.classList.remove(`${styles.toggleIndex}`)
        // }
        
        // video.addEventListener("mouseenter", addClass, false);
        // video.addEventListener("mouseout", removeClass, false);
    }

    const overlayPlay = ()=>{

        const overlay = document.getElementsByClassName('overlay');

        for(let i = 0; i < overlay.length; i++) {
            ((index)=> {
              overlay[index].classList.add(`${styles.hideOverlay}`)
            })(i);
          }
          
    }


    const titleScroll = () => {
        const pageY = window.pageYOffset;        
        const screenWidth = window.innerWidth;
        const title = document.querySelector(".title") as HTMLElement;

        if(screenWidth >= 1200){
            title.style.transform = `translateY(-${pageY}px)`;
        }
    }
    useEffect(()=>{
        window.addEventListener('scroll', titleScroll);
    },[])
    return(
        <>
            <section className={styles.projectPageSection}>
                <div className={styles.projectDetailsWrapper}>
                    <h3 className={`${styles.projectTitle} title`}>
                        {projects.title}
                    </h3>
                    <div className={styles.projectCredsWrapper}>
                        <p className={styles.projectCreds}>
                            {projects.projectInfo}
                        </p>
                    </div>
                </div>
                <div className={ toggleIndex ? `${styles.projectVideo} ${styles.toggleIndex} video` : `${styles.projectVideo} video`}>
                    <div onClick={ overlayPlay } className={`${styles.videoOverlay} overlay`} style={{backgroundImage: `url(https://kidstudio.co${projects.videoCover})`}}>
                        <div  className={`${styles.videoOverlay} overlay`} style={{backgroundImage: `url(https://kidstudio.co/assets/images/play.png)`}}>
                            {/* <Image
                            unoptimized
                            className={styles.videoCover}
                            src={ `https://kidstudio.co${projects.videoCover}` }
                            alt="Main video/image still"
                            width={256}
                            height={144}
                        /> */}
                        <img 
                            className={styles.videoCover}
                            src={ `https://kidstudio.co${projects.videoCover}` }
                            alt="Main video/image still" 
                            />
                        </div>  
                    </div>
                    <iframe onMouseMove={ handleIndex } onClick={ handleIndex } className={styles.video} id="vimeo1aolzk8" src={`${projects.videoPath}`} frameBorder="0" allowFullScreen></iframe>
                </div>
            </section>
        </>
    )
}