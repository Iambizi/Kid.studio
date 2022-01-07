import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useTexture } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';


interface Type{
    count: number;
    projects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
    goNext: any;
    goPrevious: any;
}

export default function warpedImage({ count, projects, carouselX, slideNext, slidePrevious, goNext, goPrevious }:Type):JSX.Element{

    const src1 = projects[0]?.fields.featuredProjectImage.fields ? projects[0].fields.featuredProjectImage.fields.file.url : null;
    const src2 = projects[1]?.fields.featuredProjectImage.fields ? projects[1].fields.featuredProjectImage.fields.file.url : null;
    const src3 = projects[2]?.fields.featuredProjectImage.fields ? projects[2].fields.featuredProjectImage.fields.file.url : null;

    const homePlaneControls = useRef<HTMLElement | any>(null!);
    const router = useRouter();
    const homePath = /\/$/gm;

    const HomePlane = (props: any) =>{
        
        const homePlaneRef = useRef<THREE.Mesh>();

        let hover_dist = 0.3;
        let i = 0;
        let timerx = 500;
        let hovering = false;
        let snapping = false;

        const loader = new THREE.TextureLoader();

        const texture1 = loader.load(`${src1}`);
        // const texture1 = useTexture(`${src1}`);
        const texture2 = loader.load(`${src2}`);
        const texture3 = loader.load(`${src3}`);

        texture1.minFilter = THREE.LinearFilter;
        texture2.minFilter = THREE.LinearFilter;
        texture3.minFilter = THREE.LinearFilter;

        const width = isMobile ? 3.1 : 9;
        const height = isMobile ? 1.7 : 5;

        useFrame((state) => {
            animateMesh(state);
        });

        const animateMesh = (state) => {
            if(homePlaneRef && homePlaneRef.current !== undefined){
                const onMouseDown = (e) => {
                    snapping = true;                    
                }
                const onMouseUp = (e) => {
                    setTimeout(() => snapping = false, 950);
                }
                const onDocumentMouseMove = (e)=> {
                    hovering = false;
                    state.mouse.x = e.clientX / window.innerWidth; 
                    state.mouse.y = e.clientY / window.innerHeight;
                }
                const hoverMove = () => {
                    state.mouse.x > 0.5 ? homePlaneRef.current.rotation.y < hover_dist && (homePlaneRef.current.rotation.y += 0.002) : state.mouse.x < 0.5 && homePlaneRef.current.rotation.y > -hover_dist && (homePlaneRef.current.rotation.y -= 0.002),
                    state.mouse.y > 0.5 ? homePlaneRef.current.rotation.x < hover_dist && (homePlaneRef.current.rotation.x += 0.002) : state.mouse.y < 0.5 && homePlaneRef.current.rotation.x > -hover_dist && (homePlaneRef.current.rotation.x -= 0.002);
                    (homePlaneRef.current.rotation.y > hover_dist || homePlaneRef.current.rotation.y < -hover_dist) && (homePlaneRef.current.rotation.x > hover_dist || homePlaneRef.current.rotation.x < -hover_dist) && (hovering = true);
                }
                const snapBack = () => {
                    let speed = 0.005
                    if (homePlaneRef.current.rotation.x < 0) homePlaneRef.current.rotation.x += speed;
                    if (homePlaneRef.current.rotation.x > 0) homePlaneRef.current.rotation.x -= speed;
                    if (homePlaneRef.current.rotation.y < 0) homePlaneRef.current.rotation.y += speed;
                    if (homePlaneRef.current.rotation.y > 0) homePlaneRef.current.rotation.y -= speed;
                }
                const hover = () => {
                    i == timerx && (i = 0);
                    timerx / 2 > i ? ((homePlaneRef.current.rotation.x += 3e-4), (homePlaneRef.current.rotation.y -= 3e-4)) : ((homePlaneRef.current.rotation.x -= 3e-4), (homePlaneRef.current.rotation.y += 3e-4));
                    i++;
                }

                snapping ? snapBack() : hovering ? hover() : hoverMove();
                

            }
        }

            return(
                <>
                    <mesh onPointerMissed={() => console.log('move outside')} onPointerMove={(e) => console.log('move')} ref={homePlaneRef}>
                        <planeGeometry args={[width, height]} />
                        <meshBasicMaterial map={texture1} />
                    </mesh>
                </>
            )
    }

    const next = () =>{
        goNext();
    }
    const previous = ()=>{
        goPrevious();
    }
    homePlaneControls.current = { next, previous }

    return(
        <>
            <div className={`${styles.homeScene} homeScene`}>
                <p className={styles.nextButton} onClick={homePlaneControls.current.next}>NEXT</p>
                <p className={styles.previousButton} onClick={homePlaneControls.current.previous}>PREVIOUS</p>
                <Canvas onPointerMove={(e) => console.log('mov')} id={"mesh"} camera={{ position: [0, 0, 5]}}>
                    <HomePlane position={[0, 0, 0]} /> 
                    <HomePlane position={[100, 0, 0]} />
                    <HomePlane position={[200, 0, 0]} /> 
                </Canvas>
            </div>
        </>
    )
}