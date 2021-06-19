import Image from 'next/image';
import styles from "../../../styles/scss/projectPages/_projectPages.module.scss";

interface Type{
    projects: any;
}

export default function stills( {projects}: Type ):JSX.Element{
    return(
        <>
            <section className={styles.projectPageSection}>
                <div className={styles.projectStills}>
                    {projects.stills.map((item, i)=>(
                        <Image
                        unoptimized
                        className={styles.stills}
                        src={ `https://kidstudio.co${projects.stills[i]}` }
                        alt="Project image stills"
                        width={300}
                        height={337.8}
                        key={i}
                        />
                    ))}
                </div>
            </section>
    </>
    )
}
