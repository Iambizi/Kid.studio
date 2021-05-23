import styles from "../../styles/scss/homePage/_carousel.module.scss";
import React from 'react';
import Link from "next/link";

interface Type{
    homeProjects: any;
    count: number;
    carouselX : number;
    titleX : number;
}
export default function carousel({count, homeProjects, carouselX, titleX }:Type): JSX.Element{
    return(
        //style={{ transform: `translateX(${-titleX}%)`}}
        //style={{left: `${15.0005-titleX }%`}}
        <>
        <Link href={"/work/[project]"}>
            <h1 className={styles.carouselTitle} style={{left: `${15.0005-titleX }%`}}>{homeProjects[count].video}</h1>
        </Link>
        {/* onChange add classname to add transition changing styles */}
            <div className={styles.slider} style={{left: `${ -carouselX }%`}}>
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