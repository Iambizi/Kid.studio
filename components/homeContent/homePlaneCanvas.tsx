import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { HomePlanez } from "./r3fPlanes/homePlanez"
import Loader from "../common/R3FLoader";
import { isMobile } from 'react-device-detect';



interface Type {
    projects?: any;
    carouselX: number;
    slidePrevious: boolean;
    slideNext: boolean;
}


const SliderContainer = ({ children, carouselX }) => {

    const items = useRef<THREE.Mesh>();

    useFrame((state, delta) => {
        state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, carouselX, 7, delta);
    });

    return (
        <group ref={items}>
            {children}
        </group>
    );
}

export const WarpedImage = ({ projects, carouselX, slideNext, slidePrevious }: Type): JSX.Element => {

    return (
        <>
            <div className={`${styles.homeScene}`}>
                <Canvas dpr={isMobile ? [1, 2] : [0, 1]}>
                        <Suspense fallback={<Loader />}>
                            <SliderContainer carouselX={carouselX}>
                                <HomePlanez projects={projects} position={0} projectIndex={0} slideNext={slideNext} slidePrevious={slidePrevious} />
                                <HomePlanez projects={projects} position={100} projectIndex={1} slideNext={slideNext} slidePrevious={slidePrevious} />
                                <HomePlanez projects={projects} position={200} projectIndex={2} slideNext={slideNext} slidePrevious={slidePrevious} />
                            </SliderContainer>
                        </Suspense>
                    </Canvas>
            </div>
        </>
    )
}