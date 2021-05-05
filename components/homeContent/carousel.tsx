import styles from "../../styles/scss/homePage/_home.module.scss";
import WarpedImage from "../../components/homeContent/warpedImage";
export default function carousel():JSX.Element{
    const videos = [
        "Bryson Tiller 'Always Forever'",
        "Disclosure 'Energy",
        "Big Sean 'Wolves' ft. Post Malone"
    ];
    return(
        <>
            <h1 className={styles.carouselTitle}>{videos[0]}</h1>
            {/* <WarpedImage /> */}
            <section className={styles.homeContentSection}>
            <WarpedImage />
            </section>
            <p className={styles.nextButton}>NEXT</p>
            <p className={styles.previousButton}>PREVIOUS</p>
            
            
            {/* <p className ={styles.counter}></p> */}
        </>
    )
}