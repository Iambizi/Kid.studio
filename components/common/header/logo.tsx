import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/scss/common/_navigation.module.scss';

interface Type {
    bgImg?: boolean;
}

export default function logo( { bgImg }:Type ):JSX.Element{
    return(
        <>
            <div className={styles.logo}>
                <Link href={"/"}>
                    <a>
                        {/* <Image 
                        src="/assets/images/kid.png"
                        alt="Kid Studio logo"
                        width={85}
                        height={46.3}
                        /> */}
                        <img src={ bgImg ? "https://kidstudio.co/assets/images/kidwhite.png" : "https://kidstudio.co/assets/images/kid.png" } alt="Kid Studio logo" width={85}
                        height={46.3} />
                    </a>
                </Link>
            </div>
        </>
    )
}