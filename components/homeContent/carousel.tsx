import styles from "../../styles/scss/homePage/_carousel.module.scss";
import React from 'react';

interface Type{
    homeProjects: any;
    count: number;
    goNext: any;
    goPrevious: any;
    x: number;
}
export default function carousel({count, homeProjects, goNext, goPrevious, x}:Type): JSX.Element{
    return(
        <>
        {/* onChange add classname to add transition changing styles */}
            <div className={styles.slider} style={{left: `${-x}%`}}>
                {homeProjects.map((p,i)=>
                    <div className={`${styles.carousel}`} key={i}>
                        <img
                            className={styles.carouselImage}
                            src={"https://kidstudio.co/content/2-home" + `${homeProjects[i].path}`}
                            alt={"Video Project screenshot"}
                            height={200}
                            width={330}
                        />
                    </div>
                )}
            </div>
        </>
    )
}