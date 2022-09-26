import Image from 'next/image';
import styles from "../../../styles/scss/projectPages/_projectPages.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { isMobile } from 'react-device-detect';


interface Type {
    title: any;
    details: any;
    videoCover: any;
    playButton: any;
    projectVideo: any;
}

const MainInfoSection: React.FC<Type> = ({ title, details, videoCover, playButton, projectVideo }): JSX.Element => {
    
    const [overLayClick, setOverLayClick] = useState(false);

    const overlayPlay = () => {
        setOverLayClick(true);
        { projectVideo ? setOverLayClick(true) : setOverLayClick(false) }
    }

    const ref = useRef<HTMLElement | any>(null!);

    // functionality for offset page scroll
    const titleScroll = () => {

        let pageY = window.pageYOffset;
        let transY = 0;
        let diff = 0;
        
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
                <div className={`${styles.projectVideo} video`}>
                    <div onClick={overlayPlay} className={overLayClick ? `${styles.videoOverlay} ${styles.hideOverlay} overlay` : `${styles.videoOverlay} overlay`} style={{ backgroundImage: `url(${videoCover.fields.file.url})` }}>
                    <div className={overLayClick ? `${styles.videoOverlay} ${styles.hideOverlay} overlay` : `${styles.videoOverlay} overlay`} style={{ backgroundImage: `url(${playButton})` }}>
                            <Image
                                className={styles.videoCover}
                                src={`https:${videoCover.fields.file.url}`}
                                alt="Main video/image still"
                                width={videoCover.fields.file.details.image.width}
                                height={videoCover.fields.file.details.image.height}
                            />
                        </div>
                        {/* <ReactPlayer url={`${projectVideo}`} /> */}
                        <iframe className={styles.video} id="vimeo1aolzk8" src={`${projectVideo}`} frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MainInfoSection;