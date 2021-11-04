import Image from 'next/image';
import styles from "../../styles/scss/projectPages/_projectPages.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { isMobile } from 'react-device-detect';

interface Type {
    reelTitle: string;
    reelDetails: string;
    videoCover: any;
    playButton: string;
    projectVideo: string;
}

export default function reelInfoSection( { reelTitle, reelDetails, videoCover, playButton, projectVideo }: Type ):JSX.Element{
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

    const ref = useRef<HTMLElement | any>(null!);

    // const titleScroll = () => {
    //     const pageY = window.pageYOffset;        
        
    //     if(!isMobile && ref){
    //         ref.current.style.transform = `translateY(-${pageY}px)`;
    //     }else{
    //    return null
    //}
    // }
    // useEffect(()=>{
    //     window.addEventListener('scroll', titleScroll);
    // },[])

    return(
        <>
            <section className={styles.projectPageSection}>
                <div className={styles.projectDetailsWrapper}>
                    <h3 ref={ref} className={`${styles.projectTitle} reelTitle title`}>
                        {reelTitle}
                    </h3>
                    <div className={styles.projectCredsWrapper}>
                        <p className={styles.projectCreds}>
                            {reelDetails}
                        </p>
                    </div>
                </div>
                <div className={ toggleIndex ? `${styles.projectVideo} ${styles.toggleIndex} video` : `${styles.projectVideo} video`}>
                    <div onClick={ overlayPlay } className={`${styles.videoOverlay} overlay`} style={{backgroundImage: `url(${videoCover?.fields.file.url})`}}>
                        <div className={`${styles.videoOverlay} overlay`} style={{backgroundImage: `url(${playButton})`}}>
                            <Image
                            className={styles.videoCover}
                            src={ `https:${videoCover?.fields.file.url}` }
                            alt="Main video/image still"
                            width={videoCover?.fields.file.details.image.width}
                            height={videoCover?.fields.file.details.image.height}
                        />
                        {/* <img 
                            className={styles.videoCover}
                            src={ `${videoCover}` }
                            alt="Main video/image still" 
                            /> */}
                        </div>  
                    </div>
                    <iframe onMouseMove={ handleIndex } onClick={ handleIndex } className={styles.video} id="vimeo1aolzk8" src={`${projectVideo}`} frameBorder="0" allowFullScreen></iframe>
                </div>
            </section>
        </>
    )
}