import Layout from '../components/layout';
import Meta from '../components/common/meta';
import styles from '../styles/scss/common/_error.module.scss';

const Custom500 = (): JSX.Element => {
    return (
        <>
            <Meta page={"500"} />
            <Layout>
                <>
                    <div className={styles.error}>
                        <h1>500 NAH B.</h1>
                        <img src="http://media.giphy.com/media/Kavm9lxU8Ljc4/giphy.gif" />
                    </div>
                </>
            </Layout>
        </>
    )
}
export default Custom500;