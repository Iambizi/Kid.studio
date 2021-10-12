

import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import Link from "next/link";
import { TextureLoader } from 'three';
import { isMobile } from 'react-device-detect';
import { useTexture } from "@react-three/drei";
import { Plane } from "@react-three/drei";


interface Type{
    count: number;
    projects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
}

export default function warpedImage({ count, projects, carouselX, slideNext, slidePrevious }:Type):JSX.Element{

    const src1 = projects[0]?.fields.featuredProjectImage.fields ? projects[0].fields.featuredProjectImage.fields.file.url : null;
    const src2 = projects[1]?.fields.featuredProjectImage.fields ? projects[1].fields.featuredProjectImage.fields.file.url : null;
    const src3 = projects[2]?.fields.featuredProjectImage.fields ? projects[2].fields.featuredProjectImage.fields.file.url : null;

    const Planee = (props: any) =>{
        
        const ref = useRef<HTMLElement | any>(null!);
        const current = ref?.current;

        let hover_dist = 0.3;
        let mouse = { x: 0, y: 0 };
        let snapback = { x: 0, y: 0 };
        let prevMouse = { x: 0, y: 0 };
        let distMouse = { x: 0, y: 0 };
        let i = 0;
        let timerx = 500;
        let leftScroll = !1;
        let dLeftScroll = !1;
        let dRightScroll = !1;
        let rightScroll = !1;
        let transitionFrames = 31;
        let transitionCounter = 0;
        let hovering = !1;
        let snapping = !1;
        let mouseDown = !1;
        let scale = 1;


        const loader = new THREE.TextureLoader();
        const texture1 = loader.load(`${src1}`);
        const texture2 = loader.load(`${src2}`);
        const texture3 = loader.load(`${src3}`);

        texture1.minFilter = THREE.LinearFilter;
        texture2.minFilter = THREE.LinearFilter;
        texture3.minFilter = THREE.LinearFilter;

        // let scale = 1;
        // const width = 5.4;
        // const height = 2.9;
        // const width = 6.4;
        // const height = 3.4;
        const width = isMobile ? 3.1 : 9;
        const height = isMobile ? 1.7 : 5;

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e4);

            
        useFrame((state, delta) => {
            // ref.current.rotation.x = ref.current.rotation.y += 0.0001
            if(ref && ref!== null && ref!== undefined && ref.current && ref.current!== null && ref.current!== undefined  ){
                
                const onMouseDown = (e) => {
                    (mouseDown = !0), (prevMouse.x = mouse.x), (prevMouse.y = mouse.y);
                    e.stopImmediatePropagation();
                }
                const onMouseUp = () => {
                    (mouseDown = !1), (snapping = !0), (snapback.x = ref?.current.rotation.x / 60), (snapback.y = ref?.current.rotation.y / 60);
                }
                const onDocumentMouseMove = (e)=> {
                    (hovering = !1), (mouse.x = e.clientX / window.innerWidth), (mouse.y = e.clientY / window.innerHeight);
                }
                const dragMove = () => {
                    (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
                    (ref.current.rotation.y -= 2 * distMouse.x), (ref.current.rotation.x -= 2 * distMouse.y);
                }
                const hoverMove = () => {
                        mouse.x > 0.5 ? ref.current.rotation.y < hover_dist && (ref.current.rotation.y += 0.002) : mouse.x < 0.5 && ref.current.rotation.y > -hover_dist && (ref.current.rotation.y -= 0.002),
                        mouse.y > 0.5 ? ref.current.rotation.x < hover_dist && (ref.current.rotation.x += 0.002) : mouse.y < 0.5 && ref.current.rotation.x > -hover_dist && (ref.current.rotation.x -= 0.002);
                    (ref.current.rotation.y > hover_dist || ref.current.rotation.y < -hover_dist) && (ref.current.rotation.x > hover_dist || ref.current.rotation.x < -hover_dist) && (hovering = !0);
                }
                const snapBack = () => {
                    ref.current.rotation.x < 0.002 && ref.current.rotation.x > -0.002 && ref.current.rotation.y < 0.002 && ref.current.rotation.y > -0.002 && (snapping = !1);
                    (ref.current.rotation.x -= snapback.x), (ref.current.rotation.y -= snapback.y);
                }
                const hover = () => {
                    i == timerx && (i = 0);
                    timerx / 2 > i ? ((ref.current.rotation.x += 3e-4), (ref.current.rotation.y -= 3e-4)) : ((ref.current.rotation.x -= 3e-4), (ref.current.rotation.y += 3e-4));
                    i++;
                }
                hovering ? hover() : hoverMove();
                document.addEventListener("mousemove", onDocumentMouseMove, !1)
            }
            })

            return(
                <mesh {...props} ref={ref}>
                    <planeGeometry args={[width, height]} />
                    <meshBasicMaterial map={texture1} />
                </mesh>
            )
    }

    return(
        <>
            <div className={`${styles.homeScene} homeScene`}>
                <div className={styles.titles} style={{left: `${ -carouselX }%`}}>
                    {projects && projects.length > 0 ? projects?.map((item, i)=>(
                            <div className={styles.titleWrapper} key={i}>
                                <Link href={ projects[i].fields.slug }>
                                    <h2 className={styles.videoTitle}>{ projects[i].fields.title}</h2>
                                </Link>
                            </div>
                    )) : ""}
                </div>
                {/* <Canvas frameloop="demand"  dpr={[1, 2]}> */}
                <Canvas dpr={[1, 2]}>
                   { isMobile ? <Planee position={[0, .1, 0]} /> : <Planee position={[0, 0, 0]} /> }
                   { isMobile ? <Planee position={[20, .1, 0]} /> : <Planee position={[20, 0, 0]} /> }
                   { isMobile ? <Planee position={[30, .1, 0]} /> : <Planee position={[30, 0, 0]} /> }
                </Canvas>
            </div>
        </>
    )
}