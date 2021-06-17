import styles from "../../../styles/scss/projectPages/_projectPages.module.scss";
interface Type{
    projects: any;
}
export default function mainInfoSection( {projects} ):JSX.Element{
    return(
        <>
            <section className={styles.projectPageSection}>
                <h3 className={styles.projectTitle}>
                    {projects.title}
                </h3>
                <p className={styles.projectDetails}>
                    {projects.projectInfo}
                </p>
                <div className={styles.videoOverlay} style={{backgroundImage: `url("/assets/images/play.png")`}}>
                    <img src="https://kidstudio.co/work/bryson-tiller-always-forever/vid/alwaysforever.gif" width="256px" height="144px"/>
                </div>
                <iframe className={styles.video} id="vimeo1aolzk8" src="http://player.vimeo.com/video/470421376?color=eef1f3" frameborder="0" allowfullscreen=""></iframe>
            </section>
        </>
    )

}