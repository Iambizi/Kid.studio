import styles from "../../styles/scss/homePage/_carousel.module.scss";

interface Type{
    projects: any;
}
export default function carousel({count, projects}): JSX.Element{
        // onChange add classname to add transition changing styles
        console.log(projects[0].path);
    return(
        <>
            <div className={styles.gallery}>
                <div className={styles.carousel}>
                        <img
                            className={styles.carouselImage}
                            src={"https://kidstudio.co/content/2-home" + `${projects[count].path}`}
                            alt={"Video Project screenshot"}
                            height={200}
                            width={330}
                        />
                    </div>
            </div>
        </>
    )
}