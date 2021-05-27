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
    console.log(count);
    return(
        //style={{ transform: `translateX(${-titleX}%)`}}
        //style={{left: `${-titleX }%`}}
        <>
        
        {/* onChange add classname to add transition changing styles */}
            <div className={styles.slider} style={{left: `${ -carouselX }%`}}>
                {homeProjects.map((p,i)=>
                    <>
                        <Link href={"/work/[project]"}>
                            <h1 className={styles.carouselTitle} >{homeProjects[count].video}</h1>
                        </Link>
                        <div className={`${styles.carousel}`} key={i}>
                        <img
                            className={styles.carouselImage}
                            src={"https://kidstudio.co/content/2-home" + `${homeProjects[i].path}`}
                            alt={"Video Project screenshot"}
                            height={200}
                            width={330}
                        />
                    </div>
                    </>
                )}
            </div>
        </>
    )
}