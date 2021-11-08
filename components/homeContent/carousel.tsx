import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";
import WarpedIMG from "./homeWarpedR3f";

interface Type {
    homeProjects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
    count: number;
    projects: any;
    goPrevious?: any;
}

export default function carousel({ homeProjects, carouselX, slideNext, slidePrevious, count, projects, goPrevious }:Type): JSX.Element{
    {
        carouselX  < -200 ?  `${styles.sliderWrapper} ${styles.slidePrevious}` : carouselX < -100 ? `${styles.sliderWrapper} ${styles.slideNext}` : `${styles.sliderWrapper}`
    }
    return(
        <div>
            <div className={styles.titles} style={{left: `${ -carouselX }%`}}>
                {projects && projects.length > 0 ? projects.map((item, i)=>(
                        <div className={styles.titleWrapper} key={i}>
                            <Link href={ projects[i].fields.slug }>
                                <h2 className={styles.videoTitle}>{ projects[i].fields.title}</h2>
                            </Link>
                        </div>
                )) : ""}
            </div>
            <WarpedIMG count={count} slideNext={slideNext} slidePrevious={slidePrevious} carouselX={carouselX} projects={projects} />
        </div>
    )
}