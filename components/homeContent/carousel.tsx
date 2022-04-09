import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";
import HomePlaneCanvas from "./homePlaneCanvas";

interface Types {
    carouselX: number;
    homeProjects: any;
    goPrevious?: any;
    goNext?: any;
    slideNext: boolean;
    slidePrevious: boolean;
    loaderLink: string;
}

const Carousel:React.FC<Types> = ({ carouselX, homeProjects, slideNext, slidePrevious, loaderLink }): JSX.Element => {

    return (
        <>
            <div className={styles.titles} style={{ left: `${-carouselX}%` }}>
                {homeProjects.map((item, i) => (
                    <div className={styles.titleWrapper} key={i}>
                        <Link href={homeProjects[i].fields.slug}>
                            <h2 className={`${styles.videoTitle} videoTitle`}>{homeProjects[i].fields.title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
            <HomePlaneCanvas carouselX={carouselX} projects={homeProjects} slideNext={slideNext} slidePrevious={slidePrevious} loaderLink={loaderLink} />
        </>
    )
};

export default Carousel;