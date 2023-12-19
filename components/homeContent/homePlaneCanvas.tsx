import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import styles from '../../styles/scss/homePage/_carousel.module.scss';
import HomePlanes from './r3fPlanes/planes';
import Loader from '../common/R3FLoader';
import { isMobile } from 'react-device-detect';
import { homePageTypes } from '../props/propTypes';

interface CanvasTypes {
  carouselX: number;
  slidePrevious: boolean;
  slideNext: boolean;
  loaderLink: string;
  homePageData: homePageTypes;
}

interface SLiderType {
  carouselX: number;
  children?: React.ReactNode;
}

const SliderContainer: React.FC<SLiderType> = ({ children, carouselX }) => {
  const items = useRef<THREE.Mesh>();

  useFrame((state, delta) => {
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      carouselX,
      7,
      delta
    );
  });

  return <group ref={items}>{children}</group>;
};

export const HomePlaneCanvas: React.FC<CanvasTypes> = ({
  carouselX,
  slideNext,
  slidePrevious,
  loaderLink,
  homePageData,
}): JSX.Element => {
  return (
    <>
      <div className={`${styles.homeScene}`}>
        <Canvas dpr={isMobile ? [1, 2] : [0, 1]}>
          <Suspense fallback={<Loader loaderLink={loaderLink} />}>
            <SliderContainer carouselX={carouselX}>
              <HomePlanes
                position={0}
                projectIndex={0}
                homePageData={homePageData}
                slideNext={slideNext}
                slidePrevious={slidePrevious}
              />
              <HomePlanes
                position={100}
                projectIndex={1}
                homePageData={homePageData}
                slideNext={slideNext}
                slidePrevious={slidePrevious}
              />
              <HomePlanes
                position={200}
                projectIndex={2}
                homePageData={homePageData}
                slideNext={slideNext}
                slidePrevious={slidePrevious}
              />
            </SliderContainer>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default HomePlaneCanvas;
