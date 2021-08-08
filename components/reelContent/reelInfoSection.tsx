import Image from 'next/image';
import styles from "../../styles/scss/projectPages/_projectPages.module.scss";
import React, { useState, useEffect } from "react";

interface Type {
    reels: any;
    title: string;
    details: string;
}

export default function reelInfoSection( { reels, title, details }: Type ):JSX.Element{
    // hook for handling z-index state
    const [toggleIndex, setToggleIndex] = useState(false);

    const handleIndex = () => {
        // const video = document.querySelector("video");
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
        const title = document.querySelector(".reelTitle") as HTMLElement;

        if( title && screenWidth >= 1200){
            title.style.transform = `translateY(-${pageY}px)`;
        }
    }
    useEffect(()=>{
        const title = document.querySelector(".reelTitle") as HTMLElement;
        window.addEventListener('scroll', titleScroll);

    },[])

    return(
        <>
            <section className={styles.projectPageSection}>
                <div className={styles.projectDetailsWrapper}>
                    <h3 className={`${styles.projectTitle} reelTitle`}>
                        {reels.title}
                    </h3>
                    <div className={styles.projectCredsWrapper}>
                        <p className={styles.projectCreds}>
                            {reels.details}
                        </p>
                    </div>
                </div>
                <div className={ toggleIndex ? `${styles.projectVideo} ${styles.toggleIndex} video` : `${styles.projectVideo} video`}>
                    <div onClick={ overlayPlay } className={`${styles.videoOverlay} overlay`} style={{backgroundImage: `url(${reels.videoCover})`}}>
                        <div className={`${styles.videoOverlay} overlay`} style={{backgroundImage: `url(https://kidstudio.co/assets/images/play.png)`}}>
                            {/* <Image
                            unoptimized
                            className={styles.videoCover}
                            src={ `https://kidstudio.co${reels.videoCover}` }
                            alt="Main video/image still"
                            width={256}
                            height={144}
                        /> */}
                        <img 
                            className={styles.videoCover}
                            src={ `${reels.videoCover}` }
                            alt="Main video/image still" 
                            />
                        </div>  
                    </div>
                    <iframe onMouseMove={ handleIndex } onClick={ handleIndex } className={styles.video} id="vimeo1aolzk8" src={`${reels.videoPath}`} frameBorder="0" allowFullScreen></iframe>
                </div>
            </section>
        </>
    )
}