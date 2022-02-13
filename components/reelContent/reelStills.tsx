import Image from 'next/image';
import styles from "../../styles/scss/projectPages/_projectPages.module.scss";
import { Shuffle } from "../common/utils/shuffle";
import { isMobile } from 'react-device-detect';


import React, { useEffect } from "react";

interface Type{
    reelStills: any;
}

export default function Stills( { reelStills }: Type ):JSX.Element{
    useEffect(()=>{
        const screenWidth = window.innerWidth;
        
        const position = [
            30, 50, 30, 10, 30, 10, 50, 30, 10, 30,
            10, 30, 30, 50, 30, 30, 10, 30, 50, 10, 30  
        ];
        Shuffle(position);

        if(!isMobile){
            const stills = Array.from(document.getElementsByClassName("stills") as HTMLCollectionOf<HTMLElement>);

            for(let i = 0; i < stills.length; i++) {
                stills[i].style.marginLeft = `${position[i]}%`;
            }
        }
    },[]);
    return(
        <>
            <section className={styles.projectStillsSection}>
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
