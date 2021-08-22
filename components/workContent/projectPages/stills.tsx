import Image from 'next/image';
import styles from "../../../styles/scss/projectPages/_projectPages.module.scss";
import {shuffle} from "../../common/utils/shuffle";

import React, { useEffect } from "react";

interface Type{
    projectStills: any;
}

export default function stills( { projectStills }: Type ):JSX.Element{

    console.log(projectStills);
    useEffect(()=>{
        const screenWidth = window.innerWidth;
        
        const position = [
            30, 50, 30, 10, 30, 10, 50, 30, 10, 30,
            10, 30, 30, 50, 30, 30, 10, 30, 50, 10, 30  
        ];
        shuffle(position);

        if(screenWidth >= 1200){
            const stills = Array.from(document.getElementsByClassName("stills") as HTMLCollectionOf<HTMLElement>);
            for(let i = 0; i < stills.length; i++) {
                stills[i].style.marginLeft = `${position[i]}%`;
            }
        }
    },[]);
    return(
        <>
            <section className={styles.projectPageSection}>
                <div className={styles.projectStills}>
                    {projectStills.map((item, i)=>(
                        // <Image
                        //     className={styles.stills}
                        //     src={`https:${projectStills[i].fields.file.url}`}
                        //     alt="Project image stills"
                        //     width={projectStills[i].fields.file.details.image.width}
                        //     height={projectStills[i].fields.file.details.image.height}
                        //         layout="responsive"
                        //     key={i}
                        // />
                        <img className={`${styles.stills} stills`}
                        src={`${projectStills[i].fields.file.url}`}
                        alt="Project image stills"
                        key={i} />
                    ))}
                </div>
            </section>
    </>
    )
}
