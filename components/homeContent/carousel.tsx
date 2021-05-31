import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Type{
    homeProjects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
}
export default function carousel({ homeProjects, carouselX, slideNext, slidePrevious }:Type): JSX.Element{

    return(
        <>
            <div className={styles.titles} style={{left: `${ -carouselX }%`}}>
                {homeProjects.map((p,i)=>
                     <div className={styles.titleWrapper} key={i}>
                        <Link href={"/work/[project]"}>
                            <h2 className={`${styles[homeProjects[i].className]}`}>{homeProjects[i].videoTitle}</h2>
                        </Link>
                     </div>
                )}
            </div>
            <div className={styles.slider} style={{left: `${ -carouselX }%`}}>
                {homeProjects.map((p,i)=>
                    <div className={styles.sliderWrapper} key={i}>
                        <div className={`${styles.carousel}`}>
                            <img
                                className={slideNext ? `${styles.carouselImage} ${styles.slideNext}` : `${styles.carouselImage}`}
                                src={"https://kidstudio.co/content/2-home" + `${homeProjects[i].path}`}
                                alt={"Video Project screenshot"}
                                height={200}
                                width={330}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}