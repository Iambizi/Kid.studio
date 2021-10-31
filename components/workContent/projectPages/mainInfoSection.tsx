import Image from 'next/image';
import styles from "../../../styles/scss/projectPages/_projectPages.module.scss";
import React, { useState, useEffect } from "react";
import Loader from "../../common/loader";

interface Type{
    title: any;
    details: any;
    videoCover: any;
    playButton: any;
    projectVideo: any;
}

export default function mainInfoSection( { title, details, videoCover, playButton, projectVideo }: Type ):JSX.Element{
    // hook for handling z-index state
    const [toggleIndex, setToggleIndex] = useState(false);
    
console.log(videoCover);
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
    if(!videoCover){
        return(
            <Loader />
        )
    }
    return(
        <>
            <section className={styles.projectPageSection}>
                <div className={styles.projectDetailsWrapper}>
                    <h3 className={`${styles.projectTitle} title`}>
                        {title}
                    </h3>
                    <div className={styles.projectCredsWrapper}>
                        <p className={styles.projectCreds}>
                            {details}
                        </p>
                    </div>
                </div>
                <div className={ toggleIndex ? `${styles.projectVideo} ${styles.toggleIndex} video` : `${styles.projectVideo} video`}>
                    <div onClick={ overlayPlay } className={`${styles.videoOverlay} overlay`} style={{backgroundImage: `url(${videoCover.fields.file.url})`}}>
                        <div  className={`${styles.videoOverlay} overlay`} style={{backgroundImage: `url(${playButton})`}}>
                            <Image
                            className={styles.videoCover}
                            src={ `https:${videoCover.fields.file.url}` }
                            alt="Main video/image still"
                            width={videoCover.fields.file.details.image.width}
                            height={videoCover.fields.file.details.image.height}
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