import styles from "../../../styles/scss/projectPages/_projectPages.module.scss";
interface Type{
    projects: any;
}
export default function mainInfoSection( {projects} ):JSX.Element{

    return(
        <>
            <section className={styles.mainInfo}>
                <h1>
                    {projects.title}
                </h1>
            </section>
        </>
    )

}