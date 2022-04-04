import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";
import HomePlaneCanvas from "./homePlaneCanvas";

interface Type {
    carouselX: number;
    projects: any;
    goPrevious?: any;
    goNext?: any;
    slideNext: boolean;
    slidePrevious: boolean;
}

const Carousel = ({ carouselX, projects, slideNext, slidePrevious }: Type): JSX.Element => {

    return (
        <>
            <div className={styles.titles} style={{ left: `${-carouselX}%` }}>
                {projects.map((item, i) => (
                    <div className={styles.titleWrapper} key={i}>
                        <Link href={projects[i].fields.slug}>
                            <h2 className={styles.videoTitle}>{projects[i].fields.title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
            <HomePlaneCanvas carouselX={carouselX} projects={projects} slideNext={slideNext} slidePrevious={slidePrevious} />
        </>
    )
};

export default Carousel;