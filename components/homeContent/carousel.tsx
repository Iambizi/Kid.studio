import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";
import React from "react";
import WarpedIMG from "./warpedImage";

interface Type{
    homeProjects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
}

export default function carousel({ homeProjects, carouselX, slideNext, slidePrevious }:Type): JSX.Element{

    {
        carouselX  < -200 ?  `${styles.sliderWrapper} ${styles.slidePrevious}` : carouselX < -100 ? `${styles.sliderWrapper} ${styles.slideNext}` : `${styles.sliderWrapper}`
    }
    //carouselX === -100 * (homeProjects.length - 1) ?
    return(
        <>
            <div className={styles.titles} style={{left: `${ -carouselX }%`}}>
                {homeProjects.map((p,i)=>
                     <div className={styles.titleWrapper} key={i}>
                        <Link href={"/work/project"}>
                            <h2 className={`${styles[homeProjects[i].titleClassName]}`}>{homeProjects[i].videoTitle}</h2>
                        </Link>
                     </div>
                )}
            </div>
            <div className={styles.slider} style={{left: `${ -carouselX }%`}}>
                {homeProjects.map((p,i)=>
                    <div className={`${styles.sliderWrapper}`} key={i}>
                        <div className={`${styles.carousel}`}>
                            <img
                                className={
                                    (slideNext) ? 
                                    `${styles[homeProjects[i].imageClassName]} ${styles.slideNext}` : 
                                    (slidePrevious) ?
                                    `${styles[homeProjects[i].imageClassName]} ${styles.slidePrevious}` :
                                    `${styles[homeProjects[i].imageClassName]}`
                                }
                                src={"https://kidstudio.co/content/2-home" + `${homeProjects[i].path}`}
                                alt={"Video Project screenshot"}
                                height={200}
                                width={330}
                            />
                        </div>
                    </div>
                )}
            </div>
            {/* <WarpedIMG slideNext={slidePrevious} slidePrevious={slidePrevious} homeProjects={homeProjects} carouselX={carouselX} /> */}
        </>
    )
}