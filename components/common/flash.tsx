import styles from "../../styles/scss/common/_flash.module.scss";
import React, { useState, useEffect } from "react";
import { getRandoNum } from "../common/utils/getRandoNum";


export default function flash():JSX.Element{

    const [ flashed, setFlashed ] = useState(false);

    const flash = () => {
        const flashObj = document.getElementById("flash");
        setInterval(() => {
    
            const rando = getRandoNum(1,9);
            const imgLink = `https://kidstudio.co/assets/images/flash/${rando}.png`;
            flashObj.style.backgroundImage = `url(${imgLink})`;
            flashObj.style.zIndex = "5656565656565656565656";
    
            setFlashed(true);
    
            setTimeout(()=> {
                setFlashed(false);
            }, 100);
    
        }, 15000);
    }
    
    useEffect(() =>{
        flash();
    },[]);

    return(
        <>
            <div className={ flashed ? `${styles.flash}` : `${styles.flash} ${styles.hideFlash}` } id="flash"></div>
        </>
    )
}