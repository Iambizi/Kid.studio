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

const ReelInfoSection = ({ reelTitle, reelDetails, videoCover, playButton, projectVideo }: Type): JSX.Element => {

    const [overLayClick, setOverLayClick] = useState(false);

    const ref = useRef<HTMLElement | any>(null!);
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
    }, [])

    return (
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
                <div className={`${styles.projectVideo} video`}>
                    <div onClick={() => { setOverLayClick(true) }} className={overLayClick ? `${styles.videoOverlay} ${styles.hideOverlay} overlay` : `${styles.videoOverlay} overlay`} style={{ backgroundImage: `url(${videoCover?.fields.file.url})` }}>
                        <div className={overLayClick ? `${styles.videoOverlay} ${styles.hideOverlay} overlay` : `${styles.videoOverlay} overlay`} style={{ backgroundImage: `url(${playButton})` }}>
                            <Image
                                className={styles.videoCover}
                                src={`https:${videoCover?.fields.file.url}`}
                                alt="Main video/image still"
                                width={videoCover?.fields.file.details.image.width}
                                height={videoCover?.fields.file.details.image.height}
                            />
                        </div>
                    </div>
                    <iframe className={styles.video} id="vimeo1aolzk8" src={`${projectVideo}`} frameBorder="0" allowFullScreen></iframe>
                </div>
            </section>
        </>
    )
}

export default ReelInfoSection;