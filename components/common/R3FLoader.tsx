import styles from "../../styles/scss/common/_loader.module.scss";
import React from "react";
import { Html } from '@react-three/drei'

const Loader = (): JSX.Element => {
    return (
        <>
            <Html
                prepend
                center>
                <div className={styles.loader}>
                </div>
            </Html>
        </>
    )
};

export default Loader;