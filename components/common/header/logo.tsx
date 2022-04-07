import Link from 'next/link';
import styles from '../../../styles/scss/common/_navigation.module.scss';

interface Type {
    bgImg?: boolean;
    LogoBlack: string;
    LogoWhite: string;
}

const Logo = ( { bgImg, LogoBlack, LogoWhite }: Type ): JSX.Element => {
    return(
        <>
            <div className={styles.logo}>
                <Link href={"/"}>
                    <a>
                        {/* <img src={ bgImg ? "https://kidstudio.co/assets/images/kidwhite.png" : "https://kidstudio.co/assets/images/kid.png" } alt="Kid Studio logo" width={85} */}
                        <img src={ bgImg ? `https:${LogoWhite}` : `https:${LogoBlack}` } alt="Kid Studio logo" width={85}
                        height={46.3} />
                    </a>
                </Link>
            </div>
        </>
    )
};

export default Logo;