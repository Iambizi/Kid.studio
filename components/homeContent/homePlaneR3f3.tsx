import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import HomePlane1 from "./r3fPlanes/homePlane1";
import HomePlane2 from "./r3fPlanes/homePlane2";
import HomePlane3 from "./r3fPlanes/homePlane3";
import Loader from "../common/loaderR3F";
import { isMobile } from 'react-device-detect';



interface Type {
    projects: any;
    carouselX: number;
    goNext: any;
    goPrevious: any;
}

export default function WarpedImage({ projects, carouselX, goNext, goPrevious }: Type): JSX.Element {

    const homePlaneControls = useRef<HTMLElement | any>(null!);
    let hover_dist = 0.3;
    let i = 0;
    let timerx = 500;
    let hovering = false;
    let snapping = false;
    let mouse = { x: 0, y: 0 };

    const SliderContainer = ({ children }) => {
        const items = useRef<THREE.Mesh>();
        useFrame((state, delta) => {
            state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, carouselX, 7, delta);
        })
        return (
            <group ref={items}>
                {children}
            </group>
        );
    }

    return (
        <>
            <div className={`${styles.homeScene} homeScene`}>
                {/* <Canvas dpr={[1, 2]} onPointerMissed={() => console.log(snapping)} id={"mesh"} camera={{ position: [0, 0, 5] }}> */}
                <Canvas dpr={isMobile? [1,2] : [0,1]}>
                    <Suspense fallback={<Loader/>}>
                        <SliderContainer>
                            <HomePlane1 projects={projects} snapping={snapping} />
                            <HomePlane2 projects={projects} snapping={snapping} />
                            <HomePlane3 projects={projects} snapping={snapping} />
                        </SliderContainer>
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}