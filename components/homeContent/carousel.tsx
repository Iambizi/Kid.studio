import styles from "../../styles/scss/homePage/_carousel.module.scss";
import React, {useEffect} from 'react';

interface Type{
    projects: any;
}
export default function carousel({count, projects}): JSX.Element{
    return(
        <>
        {/* onChange add classname to add transition changing styles */}
            <div className={styles.slider}>
                {projects.map((p,i)=>
                    <div className={styles.carousel} key={i}>
                    <img
                        className={styles.carouselImage}
                        src={"https://kidstudio.co/content/2-home" + `${projects[count].path}`}
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