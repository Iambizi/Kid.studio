import styles from "../../styles/scss/common/_flash.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { GetRandoNum } from "../common/utils/getRandoNum";

interface Type {
    FlashImages: any;
}

const Flash: React.FC<Type> = ({ FlashImages }): JSX.Element => {

    const [flashed, setFlashed] = useState(false);
    const componentMounted = useRef(true);

    const flash = () => {
        const flashObj = document.getElementById("flash");
        
        const intervalID = setInterval(() => {

            const randomNumber = GetRandoNum(0, 8);
            const imgLink = FlashImages[randomNumber].url;
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
    };

    useEffect(() => {
        if (componentMounted.current) {
            flash();
        }
        return () => {
            // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        };
    }, []);

    return (
        <>
            <div className={flashed ? `${styles.flash}` : `${styles.flash} ${styles.hideFlash}`} id="flash"></div>
        </>
    )
};

export default Flash;