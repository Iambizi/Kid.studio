import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import Meta from '../components/common/meta';
import styles from '../styles/scss/common/_error.module.scss';
import apolloClient from '../pages/api/apollo-client';
import { commonQuery } from '../pages/api/queries';
import { commonPageTypes } from '../components/props/propTypes';

interface Type {
  // commonData: commonPageTypes;
  commonData: any;
}
const Custom404: React.FC<Type> = ({ commonData }): JSX.Element => {
  return (
    <>
      <Meta page={'404'} />
      <Layout commonData={commonData}>
        <>
          <div className={styles.error}>
            <h1>404 NAH B.</h1>
            <img src="http://media.giphy.com/media/Kavm9lxU8Ljc4/giphy.gif" />
          </div>
        </>
      </Layout>
    </>
  );
};

export default Custom404;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apolloClient.query({
    query: commonQuery,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      commonData: data.commonAssetsCollection.items[0]
    }
  };
};
