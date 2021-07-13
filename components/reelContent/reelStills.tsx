import Image from 'next/image';
import styles from "../../styles/scss/projectPages/_projectPages.module.scss";


import React, { useEffect } from "react";

interface Type{
    reels: any;
}

export default function stills( {reels}: Type ):JSX.Element{
    useEffect(()=>{
        const screenWidth = window.innerWidth;
        
        // Fisher-Yates (aka Knuth) Shuffle
        // function that shuffles values in positions array
        const shuffle = (array)=>{
            let currentIndex = array.length,  randomIndex;
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
            return array;
        }

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
                    {reels.stills.map((item, i)=>(
                        // <Image
                        //     unoptimized
                        //     className={styles.stills}
                        //     src={`https://kidstudio.co${projects.stills[i]}`}
                        //     alt="Project image stills"
                        //     width={300}
                        //     height={337.8}
                        //     key={i}
                        // />
                        <img className={`${styles.stills} stills`}
                        src={`${reels.stills[i]}`}
                        alt="Project image stills"
                        key={i}  />
                    ))}
                </div>
            </section>
    </>
    )
}
