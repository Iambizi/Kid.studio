import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import Image from 'next/image';
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
                <div className={styles.videoOverlay} style={{backgroundImage: `url(https://kidstudio.co${projects.videoCover})`}}>
                    <div className={styles.videoOverlay} style={{backgroundImage: `url(https://kidstudio.co/assets/images/play.png)`}}>
                        <Image
                        unoptimized
                        className={styles.videoCover}
                        src={ projects.videoCover !="" ? `https://kidstudio.co${projects.videoCover}` : `https://kidstudio.co${projects.stills[0]}` }
                        alt="Main video/image still"
                        width={256}
                        height={144}
                    />
                    </div> 
                </div>
                {/* <iframe className={styles.video} id="vimeo1aolzk8" src="http://player.vimeo.com/video/470421376?color=eef1f3" frameBorder="0" allowFullScreen=""></iframe> */}
                <div className={styles.projectStills}>
                        {projects.stills.map((item, i)=>{
                            <Image
                                unoptimized
                                className={styles.Stills}
                                src={ `https://kidstudio.co${item[i]}` }
                                alt="Project image stills"
                                width={256}
                                height={144}
                                key={i}
                            />
                        })}
                </div>
            </section>
        </>
    )
}