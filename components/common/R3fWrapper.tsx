import styles from "../../styles/scss/homePage/_carousel.module.scss";
import React from "react";
import { Html } from '@react-three/drei'

export default function R3FWrapper({children}) {
    return (
        <>
            <Html>
                <div className={`${styles.homeScene} plane1 wrapper`}>
                    {children}
                </div>
            </Html>
        </>
    )
}