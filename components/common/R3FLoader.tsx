import styles from "../../styles/scss/common/_loader.module.scss";
import React from "react";
import { Html } from '@react-three/drei';

interface Type{
    loaderLink: string;
}

const Loader: React.FC<Type> = ({loaderLink}): JSX.Element => {
    return (
        <>
            <Html
                prepend
                center>
                <img className={styles.loader} src={`https:${loaderLink}`} alt="loader"/>
            </Html>
        </>
    )
};

export default Loader;