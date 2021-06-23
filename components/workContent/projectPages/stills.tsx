import Image from 'next/image';
import styles from "../../../styles/scss/projectPages/_projectPages.module.scss";

import React, { useState, useEffect } from "react";

interface Type{
    projects: any;
}

export default function stills( {projects}: Type ):JSX.Element{
    useEffect(()=>{
        const screenWidth = window.innerWidth;
        
        const stills = [document.getElementsByClassName('stills')];

        const positions = [
            
                [ 30, 10, 30, 10, 30, 10, 50, 30, 10, 30 ],
            
                [ 50, 10, 30, 50, 30, 10, 30, 10, 30, 10 ],

                [ 50, 10, 30, 50, 10, 50, 10, 50, 10, 30 ] 
        ];

        if(screenWidth >= 1200){
            console.log("big screen");
        }else{
            console.log("small screen");
        }
        console.log(positions[0]);
        console.log(stills);
        for(var i = 0; i < stills.length; i++) {
            ((index)=> {
            //   stills[index].style.left = positions[0];
            // stills.map((item, i)=>(
            //     item[i].style.left = ""
            // ));
            })(i);
          }
    },[]);
    return(
        <>
            <section className={styles.projectPageSection}>
                <div className={styles.projectStills}>
                    {projects.stills.map((item, i)=>(
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
                        src={`https://kidstudio.co${projects.stills[i]}`}
                        alt="Project image stills"
                        key={i}  />
                    ))}
                </div>
            </section>
    </>
    )
}
