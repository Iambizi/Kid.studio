import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";
import WarpedIMG from "./homeWarpedPlan";

interface Type {
    homeProjects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
    count: number;
    projects: any;
}

export default function carousel({ homeProjects, carouselX, slideNext, slidePrevious, count, projects }:Type): JSX.Element{
    {
        carouselX  < -200 ?  `${styles.sliderWrapper} ${styles.slidePrevious}` : carouselX < -100 ? `${styles.sliderWrapper} ${styles.slideNext}` : `${styles.sliderWrapper}`
    }
    // className={
    //     (slideNext) ? 
    //     `${styles[homeProjects[i].imageClassName]} ${styles.slideNext}` : 
    //     (slidePrevious) ?
    //     `${styles[homeProjects[i].imageClassName]} ${styles.slidePrevious}` :
    //     `${styles[homeProjects[i].imageClassName]}`
    // }
    // src={"https://kidstudio.co/content/2-home" + `${homeProjects[i].imgSrc}`}
    // alt={"Video Project screenshot"}

    {/* <img
            className={
                (slideNext) ? 
                `${styles[homeProjects[i].imageClassName]} ${styles.slideNext}` : 
                (slidePrevious) ?
                `${styles[homeProjects[i].imageClassName]} ${styles.slidePrevious}` :
                `${styles[homeProjects[i].imageClassName]}`
            }
            src={"https://kidstudio.co/content/2-home" + `${homeProjects[i].imgSrc}`}
            alt={"Video Project screenshot"}
            height={200}
            width={330}
        /> */}
    return(
        <>
            <div className={styles.titles} style={{left: `${ -carouselX }%`}}>
                {projects && projects.length > 0 ? projects.map((item, i)=>(
                        <div className={styles.titleWrapper} key={i}>
                        <Link href={ projects[i].fields.slug }>
                            <h2 className={styles.videoTitle}>{ projects[i].fields.title}</h2>
                        </Link>
                    </div>
                )) : ""}
            </div>
            <div className={styles.slider} style={{left: `${ -carouselX }%`}}>
                {homeProjects.map((p,i)=>
                    (
                        <div className={`${styles.sliderWrapper}`} key={i}>
                            <div className={`${styles.carousel}`}>
                                <div className={
                                    (slideNext) ? 
                                    `${styles[homeProjects[i].imageClassName]} ${styles.slideNext}` : 
                                    (slidePrevious) ?
                                    `${styles[homeProjects[i].imageClassName]} ${styles.slidePrevious}` :
                                    `${styles[homeProjects[i].imageClassName]}`
                                }>
                                <WarpedIMG count={count} slideNext={slidePrevious} slidePrevious={slidePrevious} carouselX={carouselX} projects={projects} />
                                 </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    )
}