import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";
import WarpedIMG from "./homeWarpedPla";

interface Type {
    homeProjects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
    count: number;
    projects: any;
}

export default function Carousel({ homeProjects, carouselX, slideNext, slidePrevious, count, projects }:Type): JSX.Element{
    {
        carouselX  < -200 ?  `${styles.sliderWrapper} ${styles.slidePrevious}` : carouselX < -100 ? `${styles.sliderWrapper} ${styles.slideNext}` : `${styles.sliderWrapper}`
    }
    return(
        <>
            {/* <WarpedIMG count={count} slideNext={slideNext} slidePrevious={slidePrevious} carouselX={carouselX} projects={projects} /> */}
        </>
    )
}