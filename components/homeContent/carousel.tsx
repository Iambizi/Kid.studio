import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";
import React from "react";
import WarpedIMG from "./homeWarpedPlane";

interface Type {
    homeProjects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
}

export default function carousel({ homeProjects, carouselX, slideNext, slidePrevious }:Type): JSX.Element{
    {
        carouselX  < -200 ?  `${styles.sliderWrapper} ${styles.slidePrevious}` : carouselX < -100 ? `${styles.sliderWrapper} ${styles.slideNext}` : `${styles.sliderWrapper}`
    }
    // className={
    //     (slideNext) ? 
    //     `${styles[homeProjects[i].imageClassName]} ${styles.slideNext}` : 
    //     (slidePrevious) ?
    //     `${styles[homeProjects[i].imageClassName]} ${styles.slidePrevious}` :
    //     `${styles[homeProjects[i].imageClassName]}`
    // }
    // src={"https://kidstudio.co/content/2-home" + `${homeProjects[i].imgSrc}`}
    // alt={"Video Project screenshot"}
    return(
        <>
            <div className={styles.titles} style={{left: `${ -carouselX }%`}}>
                {homeProjects && homeProjects.length > 0 ? homeProjects.map((item, i)=>(
                    <div className={styles.titleWrapper} key={i}>
                        <Link href={ process.env.NEXT_PUBLIC_APP_DOMAIN + "/work" + homeProjects[i].path }>
                            <h2 className={`${styles[homeProjects[i].titleClassName]}`}>{ homeProjects[i].videoTitle}</h2>
                        </Link>
                    </div>
                )) : ""}
            </div>
            <div className={styles.slider} style={{left: `${ -carouselX }%`}}>
                {homeProjects.map((p,i)=>
                    (
                        <div className={`${styles.sliderWrapper}`} key={i}>
                            <div className={`${styles.carousel}`}>
                                <div className={
                                    (slideNext) ? 
                                    `${styles[homeProjects[i].imageClassName]} ${styles.slideNext}` : 
                                    (slidePrevious) ?
                                    `${styles[homeProjects[i].imageClassName]} ${styles.slidePrevious}` :
                                    `${styles[homeProjects[i].imageClassName]}`
                                }>
                                    <WarpedIMG slideNext={slidePrevious} slidePrevious={slidePrevious} homeProjects={homeProjects} index={i} carouselX={carouselX} />
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    )
}