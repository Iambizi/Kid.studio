import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";
// import WarpedIMG from "./homeWarpedPla";
// import WarpedIMG from "./homeWarpedR3f2";
import WarpedIMG from "./homePlaneR3f3";
// import WarpedIMG from "../common/commonWarpedPlane";

interface Type {
    homeProjects: any;
    carouselX: number;
    slideNext: boolean;
    slidePrevious: boolean;
    count: number;
    projects: any;
    goPrevious?: any;
    goNext?: any;
}

export default function Carousel({ homeProjects, carouselX, slideNext, slidePrevious, count, projects, goPrevious, goNext }: Type): JSX.Element {
    {
        carouselX < -200 ? `${styles.sliderWrapper} ${styles.slidePrevious}` : carouselX < -100 ? `${styles.sliderWrapper} ${styles.slideNext}` : `${styles.sliderWrapper}`
    }
    return (
        <>
            <div className={styles.titles} style={{ left: `${-carouselX}%` }}>
                {/* {projects && projects.length > 0 ? projects.map((item, i) => (
                    <>
                        <div className={styles.titleWrapper} key={i}>
                            <Link href={projects[i].fields.slug}>
                                <h2 className={styles.videoTitle}>{projects[i].fields.title}</h2>
                            </Link>
                            <p>{`${-carouselX}%`}</p>
                        </div>
                    </>
                )) : ""} */}
                {projects.map((item, i) => (
                    <div className={styles.titleWrapper} key={i}>
                        <Link href={projects[i].fields.slug}>
                            <h2 className={styles.videoTitle}>{projects[i].fields.title}</h2>
                        </Link>
                        {/* <p>{`${-carouselX}%`}</p>
                        <p>{projects[i].fields.title}</p> */}
                    </div>
                ))}
            </div>
            <WarpedIMG carouselX={carouselX} projects={projects} goNext={goNext} goPrevious={goPrevious} />
        </>
    )
}