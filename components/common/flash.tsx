import styles from "../../styles/scss/common/_flash.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { GetRandoNum } from "../common/utils/getRandoNum";


export default function Flash(): JSX.Element {

    const [flashed, setFlashed] = useState(false);
    const componentMounted = useRef(true);

    const flash = () => {
        const flashObj = document.getElementById("flash");
        const intervalID = setInterval(() => {

            const rando = GetRandoNum(1, 9);
            const imgLink = `https://kidstudio.co/assets/images/flash/${rando}.png`;
            flashObj.style.backgroundImage = `url(${imgLink})`;
            flashObj.style.zIndex = "5656565656565656565656";

            setFlashed(true);

            setTimeout(() => {
                setFlashed(false);
            }, 100);

        }, 15000);
        return () => {
            clearInterval(intervalID);
        };
    }

    useEffect(() => {
        if (componentMounted.current) {
            flash();
        }
    }, []);



    return (
        <>
            <div className={flashed ? `${styles.flash}` : `${styles.flash} ${styles.hideFlash}`} id="flash"></div>
        </>
    )
}