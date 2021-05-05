import styles from "../../styles/scss/homePage/_home.module.scss";
export default function warpedImage():JSX.Element{
    return(
        <>
            <canvas className={styles.scene}>
            </canvas>
        </>
    )
}