import styles from "../../styles/scss/common/_loader.module.scss";
import React from "react";

const RegularLoader = ():JSX.Element => {
    return (
        <>
            <div className={styles.loader}>
            </div>
        </>
    )
};

export default RegularLoader;