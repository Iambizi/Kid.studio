import Layout from '../components/layout';
import Meta from '../components/common/meta';
import styles from '../styles/scss/common/_error.module.scss';
import Error from '../components/common/errorComponent';

export default function Custom404({ errorCode }) {
    if(errorCode){
        return (
            <>
                <Meta page={"404"} />
                <Layout>
                    <>
                        <div className={styles.error}>
                            <h1>404 NAH B.</h1>
                            <img src="http://media.giphy.com/media/Kavm9lxU8Ljc4/giphy.gif" />
                        </div>
                    </>
                </Layout>
            </>
        )
    }
}

export async function getServerSideProps() {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const errorCode = res.ok ? false : res.statusCode
    const json = await res.json()

    return {
        props: { errorCode, stars: json.stargazers_count },
    }
}