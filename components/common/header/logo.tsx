import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/scss/common/_navigation.module.scss';

export default function logo():JSX.Element{
    return(
        <>
            <div className={styles.logo}>
                <Link href={"/index"}>

                    <a>
                        <Image 
                        src="/assets/images/kid.png"
                        alt="Kid Studio logo"
                        width={85}
                        height={46.3}
                        />
                    </a>
                </Link>
            </div>
        </>
    )
}