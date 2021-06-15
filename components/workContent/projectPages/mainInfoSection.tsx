import styles from "../../../styles/scss/projectPages/_projectPages.module.scss";
interface Type{
    projects: any;
}
export default function mainInfoSection( {projects} ):JSX.Element{
    const projectDetails = [
        {
            
        }
    ]
    return(
        <>
            <section className={styles.projectPageSection}>
                <h3 className={styles.projectTitle}>
                    {projects.title}
                </h3>
                <p className={styles.projectCreds}>
                    
                </p>
            </section>
        </>
    )

}