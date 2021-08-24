import Image from 'next/image';
import styles from "../../styles/scss/projectPages/_projectPages.module.scss";
import { shuffle } from "../common/utils/shuffle";


import React, { useEffect } from "react";

interface Type{
    reelStills: any;
}

export default function stills( { reelStills }: Type ):JSX.Element{
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
                    {reelStills.map((item, i)=>(
                        //     <Image
                        //     className={`${styles.stills} stills`}
                        //     src={`https:${reelStills[i].fields.file.url}`}
                        //     alt="Project image stills"
                        //     width={reelStills[i].fields.file.details.image.width}
                        //     height={reelStills[i].fields.file.details.image.height}
                        //     key={i}
                        // />
                        <img className={`${styles.stills} stills`}
                        src={`${reelStills[i].fields.file.url}`}
                        alt="Project image stills"
                        key={i} />
                    ))}
                </div>
            </section>
    </>
    )
}
