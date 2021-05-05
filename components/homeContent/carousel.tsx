import styles from "../../styles/scss/homePage/_home.module.scss";
export default function carousel():JSX.Element{
    const videos = [
        "Bryson Tiller 'Always Forever'",
        "Disclosure 'Energy",
        "Big Sean 'Wolves' ft. Post Malone"
    ];
    return(
        <>
            <h1 className={styles.carouselTitle}>{videos[0]}</h1>
            <section className={styles.homeContentSection}>
                
                <p className={styles.previousButton}>PREVIOUS</p>
                <p className={styles.nextButton}>NEXT</p>
            </section>
        </>
    )
}