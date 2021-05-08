import {useState} from 'react';
import styles from "../../styles/scss/homePage/_carousel.module.scss";

export default function carousel({count}): JSX.Element{

interface Type{
    projects: any;
}
        
        const projects = [
            {
                video:"Bryson Tiller 'Always Forever'",
                path:"/1-alwaysforever-2.gif",
                count: 1
            },
            {   video:"Disclosure 'Energy",
                path:"/2-energy.gif",
                count: 2
            },
            {
                video:"Big Sean 'Wolves' ft. Post Malone",
                path:"/3-wolves.gif",
                count: 3
            }
        ];

        // onChange add classname to add transition changing styles
    return(
        <>
            <div className={styles.gallery}>
                <div className={styles.carousel}>
                        <img
                            className={styles.carouselImage}
                            src={"https://kidstudio.co/content/2-home" + `${projects[count].path}`}
                            alt={"Video Project screenshot"}
                            height={200}
                            width={330}
                        />
                    </div>
            </div>
        </>
    )
}