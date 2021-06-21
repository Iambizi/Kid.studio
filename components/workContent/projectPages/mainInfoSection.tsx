import Image from 'next/image';
import styles from "../../../styles/scss/projectPages/_projectPages.module.scss";
interface Type{
    projects: any;
}
export default function mainInfoSection( {projects}: Type ):JSX.Element{
    const overlayPlay = ()=>{

        const overlay = document.getElementsByClassName('overlay');

        console.log("yoo");
        console.log(overlay);

        // overlay.classList.add(`${styles.hideOverlay}`);

        for(var i = 0; i < overlay.length; i++) {
            ((index)=> {
              overlay[index].classList.add(`${styles.hideOverlay}`)
            })(i);
          }
    }
    return(
        <>
            <section className={styles.projectPageSection}>
                <h3 className={styles.projectTitle}>
                    {projects.title}
                </h3>
                <div className={styles.projectDetailsWrapper}>
                    <p className={styles.projectDetails}>
                        {projects.projectInfo}
                    </p>
                </div>
                <div className={`${styles.projectVideo}`}>
                    <div onClick={overlayPlay} className={`${styles.videoOverlay} overlay`} style={{backgroundImage: `url(https://kidstudio.co${projects.videoCover})`}}>
                        <div  className={`${styles.videoOverlay} overlay`} style={{backgroundImage: `url(https://kidstudio.co/assets/images/play.png)`}}>
                            {/* <Image
                            unoptimized
                            className={styles.videoCover}
                            src={ `https://kidstudio.co${projects.videoCover}` }
                            alt="Main video/image still"
                            width={256}
                            height={144}
                        /> */}
                        <img 
                            className={styles.videoCover}
                            src={ `https://kidstudio.co${projects.videoCover}` }
                            alt="Main video/image still" 
                            />
                        </div>  
                    </div>
                    <iframe className={styles.video} id="vimeo1aolzk8" src={`${projects.videoPath}`} frameBorder="0" allowFullScreen></iframe>
                </div>
            </section>
        </>
    )
}