import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
// import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { useRouter } from 'next/router';

import Link from "next/link";

import { isMobile } from 'react-device-detect';
import { useTexture } from "@react-three/drei";
import { Plane } from "@react-three/drei";


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

    const homePlaneRef = useRef<HTMLElement | any>(null!);
    const homePlaneControls = useRef<HTMLElement | any>(null!);
    const router = useRouter();
    const homePath = /\/$/gm;

    const Planee = (props: any) =>{
        
        const homePlaneRef = useRef<HTMLElement | any>(null!);
        const texture = new THREE.Texture();

        let hover_dist = 0.3;
        let mouse = { x: 0, y: 0 };
        let snapback = { x: 0, y: 0 };
        let prevMouse = { x: 0, y: 0 };
        let distMouse = { x: 0, y: 0 };
        let i = 0;
        let timerx = 500;
        let hovering = !1;
        let snapping = !1;
        let mouseDown = !1;

        const loader = new THREE.TextureLoader();

        const texture1 = loader.load(`${src1}`);
        const texture2 = loader.load(`${src2}`);
        const texture3 = loader.load(`${src3}`);

        const textures = ()=>{
            for(
                let loopityLoop = 0;
                loopityLoop < 3;
                loopityLoop++){
                    return `texture${loopityLoop}`
            }
        }
        
        texture1.minFilter = THREE.LinearFilter;
        texture2.minFilter = THREE.LinearFilter;
        texture3.minFilter = THREE.LinearFilter;

        const width = isMobile ? 3.1 : 9;
        const height = isMobile ? 1.7 : 5;

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
            
        useFrame((state, delta) => {

            if(homePlaneRef.current && homePlaneRef.current !== undefined){
                const onMouseDown = (e) => {
                    (mouseDown = !0), (prevMouse.x = mouse.x), (prevMouse.y = mouse.y);
                    e.stopImmediatePropagation();
                }
                const onMouseUp = () => {
                    (mouseDown = !1), (snapping = !0), (snapback.x = homePlaneRef.current.rotation.x / 60), (snapback.y = homePlaneRef.current.rotation.y / 60);
                }
                const onDocumentMouseMove = (e)=> {
                    (hovering = !1), (mouse.x = e.clientX / window.innerWidth), (mouse.y = e.clientY / window.innerHeight);
                }
                const dragMove = () => {
                    (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
                    (homePlaneRef.current.rotation.y -= 2 * distMouse.x), (homePlaneRef.current.rotation.x -= 2 * distMouse.y);
                }
                const hoverMove = () => {
                        mouse.x > 0.5 ? homePlaneRef.current.rotation.y < hover_dist && (homePlaneRef.current.rotation.y += 0.002) : mouse.x < 0.5 && homePlaneRef.current.rotation.y > -hover_dist && (homePlaneRef.current.rotation.y -= 0.002),
                        mouse.y > 0.5 ? homePlaneRef.current.rotation.x < hover_dist && (homePlaneRef.current.rotation.x += 0.002) : mouse.y < 0.5 && homePlaneRef.current.rotation.x > -hover_dist && (homePlaneRef.current.rotation.x -= 0.002);
                    (homePlaneRef.current.rotation.y > hover_dist || homePlaneRef.current.rotation.y < -hover_dist) && (homePlaneRef.current.rotation.x > hover_dist || homePlaneRef.current.rotation.x < -hover_dist) && (hovering = !0);
                }
                const snapBack = () => {
                    homePlaneRef.current.rotation.x < 0.002 && homePlaneRef.current.rotation.x > -0.002 && homePlaneRef.current.rotation.y < 0.002 && homePlaneRef.current.rotation.y > -0.002 && (snapping = !1);
                    (homePlaneRef.current.rotation.x -= snapback.x), (homePlaneRef.current.rotation.y -= snapback.y);
                }
                const hover = () => {
                    i == timerx && (i = 0);
                    timerx / 2 > i ? ((homePlaneRef.current.rotation.x += 3e-4), (homePlaneRef.current.rotation.y -= 3e-4)) : ((homePlaneRef.current.rotation.x -= 3e-4), (homePlaneRef.current.rotation.y += 3e-4));
                    i++;
                }

                // hovering ? hover() : hoverMove();
                mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove();
                document.addEventListener("mousemove", onDocumentMouseMove, !1);
                document.addEventListener("mousedown", onMouseDown, !1);
                document.addEventListener("mouseup", onMouseUp, !1);

                // homePlaneRef.current = { onMouseDown, onMouseUp};

            }

            // mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove();
            // mouseDown && ((prevMouse.y = mouse.y), (prevMouse.x = mouse.x));
            })

            return(
                <>
                    <mesh {...props} ref={homePlaneRef}>
                        <planeGeometry args={[width, height]} />
                        <meshBasicMaterial  map={texture1} />
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
    

    console.log(homePlaneRef);
    // console.log(homePlaneControls);

    return(
        <>
            <div className={`${styles.homeScene} homeScene`}>
            <p className={styles.nextButton} onClick={homePlaneControls.current.next}>NEXT</p>
            <p className={styles.previousButton} onClick={homePlaneControls.current.previous}>PREVIOUS</p>
                {/* <Canvas ref={homePlaneRef} dpr={[1, 2]}>
                   { isMobile ? <Planee position={[0, .1, 0]} /> : <Planee position={[0, 0, 0]} /> }
                   { isMobile ? <Planee position={[20, .1, 0]} /> : <Planee position={[20, 0, 0]} /> }
                   { isMobile ? <Planee position={[30, .1, 0]} /> : <Planee position={[30, 0, 0]} /> }
                </Canvas> */}
                 <Canvas dpr={[1, 2]}>
                    <Planee position={[0, 0, 0]} /> 
                    <Planee position={[100, 0, 0]} />
                    <Planee position={[200, 0, 0]} /> 
                </Canvas>

            </div>
        </>
    )
}