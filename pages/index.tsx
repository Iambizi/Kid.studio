import Head from 'next/head';
import styles from '../styles/scss/homePage/_home.module.scss';
import Layout from '../components/layout';
import Meta  from '../components/common/meta';
import Navigation from '../components/common/header/navigation';
import Footer from '../components/common/footer';
import Carousel from '../components/homeContent/content'

export default function home():JSX.Element {
  return (
    <>
        <Meta page={"Home"} />
          <Layout>
            <Carousel />
          </Layout>
    </>
  )
}