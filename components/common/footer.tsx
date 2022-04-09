import styles from '../../styles/scss/common/_footer.module.scss';
import Link from 'next/link';

interface Type {
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string; 
}

const Footer = ({ bgImg, specificStyles }:Type):JSX.Element =>{
    return(
        <>
            <footer className={`${styles.footer} ${specificStyles}`}>
                <div className={ bgImg ? `${styles.footerLinks} ${styles.hoverColor}` : `${styles.footerLinks}` }>
                    <a className={styles.footerLink} href={"http://instagram.com/kidstudio_"}>INSTAGRAM</a>
                    /
                    <Link href={"/work/reel"}>
                        <a className={styles.footerLink}>REEL</a>
                    </Link>
                    /
                    <a className={styles.footerLink} href={"mailto:email@kidstudio.co"}>EMAIL@KIDSTUDIO.CO</a>
                </div>
            </footer>
        </>
    )
}

export default Footer;