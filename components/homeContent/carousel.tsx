import styles from '../../styles/scss/homePage/_carousel.module.scss';
import Link from 'next/link';
import HomePlaneCanvas from './homePlaneCanvas';
import { homePageTypes } from '../props/propTypes';

interface Types {
  carouselX: number;
  goPrevious?: any;
  goNext?: any;
  slideNext: boolean;
  slidePrevious: boolean;
  loaderLink: string;
  homePageData: homePageTypes;
}

const Carousel: React.FC<Types> = ({
  carouselX,
  slideNext,
  slidePrevious,
  loaderLink,
  homePageData,
}): JSX.Element => {
  return (
    <>
      <div className={styles.titles} style={{ left: `${-carouselX}%` }}>
        {homePageData.map((item, i) => (
          <div className={styles.titleWrapper} key={i}>
            <Link href={homePageData[i].slug}>
              {/* <h2 className={`${styles.videoTitle} videoTitle`}>{homeProjects[i].fields.title}</h2> */}
              <h2 className={`${styles.videoTitle} videoTitle`}>
                {homePageData[i].title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
      <HomePlaneCanvas
        carouselX={carouselX}
        homePageData={homePageData}
        slideNext={slideNext}
        slidePrevious={slidePrevious}
        loaderLink={loaderLink}
      />
    </>
  );
};

export default Carousel;
