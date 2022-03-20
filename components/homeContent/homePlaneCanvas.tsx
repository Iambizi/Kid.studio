import React, { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { HomePlane1 } from "./r3fPlanes/homePlane15";
import { HomePlane2 } from "./r3fPlanes/homePlane16";
import { HomePlane3 } from "./r3fPlanes/homePlane17";
import Loader from "../common/loaderR3F";
import R3FWrapper from '../common/R3fWrapper';
import { isMobile } from 'react-device-detect';



interface Type {
    projects?: any;
    carouselX: number;
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

export const WarpedImage = ({ projects, carouselX }: Type): JSX.Element => {

    const container = useRef<THREE.Mesh>();

    const plane1 = useRef<THREE.Mesh>();
    const plane2 = useRef<THREE.Mesh>();
    const plane3 = useRef<THREE.Mesh>();

    let hovering = false;

    let snapping = false;
    let mouseDown = false
    let prevMouse = { x: 0, y: 0 };
    let snapback = { x: 0, y: 0 };

    let hover_dist = 0.3;
    let i = 0;
    let timerx = 500;
    let mouse = { x: 0, y: 0 };

    // useEffect(() => {
        
    //     const onPointerUp = (e) => {
    //         snapping = true;
    //         e.stopImmediatePropagation();
    //         console.log(snapping + " mouse down plane 1");
    //     }

    //     const onPointerDown = (e) => {
    //         setTimeout(() => snapping = false, 950);
    //         console.log("mouse up plane 1");
    //     }
    //     const onPointerMove = (e) => {
    //         hovering = false;
    //         mouse.x = e.clientX / window.innerWidth;
    //         mouse.y = e.clientY / window.innerHeight;
    //         console.log("mouse moviiing");
    //     }
      
    //     container.current?.addEventListener('pointerup', onPointerUp);
    //     container.current?.addEventListener('pointerdown', onPointerDown);
    //     container.current?.addEventListener('pointermove', onPointerMove);
      
    //     return () => {
    //       container.current?.removeEventListener('pointerup', onPointerUp);
    //       container.current?.removeEventListener('pointerdown', onPointerDown);
    //       container.current?.removeEventListener('pointermove', onPointerMove);
    //     }
    //   }, []);

    return (
        <>
            <div className={`${styles.homeScene}`}>
                <Canvas dpr={isMobile ? [1, 2] : [0, 1]}>
                    <Suspense fallback={<Loader />}>
                        <SliderContainer carouselX={carouselX}>
                            <HomePlane1 ref={plane1} projects={projects} />
                            <HomePlane2 ref={plane2} projects={projects} />
                            <HomePlane3 ref={plane3} projects={projects} />
                            {/* <HomePlane1 projects={projects} />
                            <HomePlane2 projects={projects} />
                            <HomePlane3 projects={projects} /> */}
                        </SliderContainer>
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}