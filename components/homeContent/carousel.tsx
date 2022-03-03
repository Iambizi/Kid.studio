import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";
import WarpedIMG from "./homePlaneR3f3";

interface Type {
    carouselX: number;
    projects: any;
    goPrevious?: any;
    goNext?: any;
}

export default function Carousel({ carouselX, projects, goPrevious, goNext }: Type): JSX.Element {

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
            <WarpedIMG carouselX={carouselX} projects={projects} goNext={goNext} goPrevious={goPrevious} />
        </>
    )
}