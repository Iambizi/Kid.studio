import Image from 'next/image';
import styles from "../../../styles/scss/projectPages/_projectPages3.module.scss";
import React, { useState, useEffect, useRef } from "react";
import Loader from "../../common/loaderR3F";
import { isMobile } from 'react-device-detect';
import ReactPlayer from 'react-player';
import { RegularLoader } from "../../common/loaderRegular";


interface Type {
    title: any;
    details: any;
    videoCover: any;
    playButton: any;
    projectVideo: any;
}

export default function MainInfoSection({ title, details, videoCover, playButton, projectVideo }: Type): JSX.Element {
    // hook for handling z-index state
    const [toggleIndex, setToggleIndex] = useState(false);
    const [overLayClick, setOverLayClick] = useState(false);

    const handleIndex = () => {

        // setToggleIndex(true);

        // function addClass(){
        //     video.classList.add(`${styles.toggleIndex}`)
        // }
        // function removeClass(){
        //     video.classList.remove(`${styles.toggleIndex}`)
        // }

        // video.addEventListener("mouseenter", addClass, false);
        // video.addEventListener("mouseout", removeClass, false);
    }

    const overlayPlay = () => {
        setOverLayClick(true);
        { projectVideo ? setOverLayClick(true) : setOverLayClick(false) }
    }

    const ref = useRef<HTMLElement | any>(null!);
    // const titleP = document.querySelector(".title") as HTMLElement;

    // functionality for offset page scroll
    const titleScroll = () => {

        let pageY = window.pageYOffset;
        let transY = 0;
        let diff = 0;
        let para = 0!;
        let lastScrollTop = 0;
        if (!isMobile && ref.current) {
            setTimeout(() => {
                if (diff = pageY - transY) {
                    transY += 2 * diff
                }
                ref.current.style.transform = `translateY(${pageY * -0.1}px)`;

            }, 300);
        } else {
            return null;
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', titleScroll);
    }, []);
    return (
        <>
            <section className={styles.projectPageSection}>
                <div className={styles.projectDetailsWrapper}>
                    <h3 className={`${styles.projectTitle} title`} ref={ref}>
                        {title}
                    </h3>
                    <div className={styles.projectCredsWrapper}>
                        <p className={styles.projectCreds}>
                            {details}
                        </p>
                    </div>
                </div>
                <div className={toggleIndex ? `${styles.projectVideo} ${styles.toggleIndex} video` : `${styles.projectVideo} video`}>
                    <div onClick={overlayPlay} className={overLayClick ? `${styles.videoOverlay} ${styles.hideOverlay} overlay` : `${styles.videoOverlay} overlay`} style={{ backgroundImage: `url(${videoCover.fields.file.url})` }}>
                    <div className={overLayClick ? `${styles.videoOverlay} ${styles.hideOverlay} overlay` : `${styles.videoOverlay} overlay`} style={{ backgroundImage: `url(${playButton})` }}>
                        {/* <div onClick={overlayPlay} className={overLayClick ? `${styles.videoOverlay} ${styles.hideOverlay} overlay` : `${styles.videoOverlay} overlay`}>
                        <div className={overLayClick ? `${styles.videoOverlay} ${styles.hideOverlay} overlay` : `${styles.videoOverlay} overlay`}> */}
                            <Image
                                className={styles.videoCover}
                                src={`https:${videoCover.fields.file.url}`}
                                alt="Main video/image still"
                                width={videoCover.fields.file.details.image.width}
                                height={videoCover.fields.file.details.image.height}
                            />
                        </div>
                    </div>
                    {/* <iframe className={styles.video} id="vimeo1aolzk8" src={`${projectVideo}`} frameBorder="0" allowFullScreen></iframe> */}
                    <ReactPlayer controls={true} fallback={<RegularLoader/>}  className={styles.video} url={`${projectVideo}`} />
                </div>
            </section>
        </>
    )
}