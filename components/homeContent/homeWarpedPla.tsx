

import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { Canvas, useFrame } from '@react-three/fiber';
import Link from "next/link";
import { TextureLoader } from 'three';
import { isMobile } from 'react-device-detect';
import { useTexture } from "@react-three/drei";


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
    // useEffect(()=>{

    //     const scene = new THREE.Scene();

    //     const group = new THREE.Group();
        
    //     const loader = new THREE.TextureLoader();

    //     const texture1 = loader.load(`${src1}`);
    //     const texture2 = loader.load(`${src2}`);
    //     const texture3 = loader.load(`${src3}`);

    //     texture1.minFilter = THREE.LinearFilter;
    //     texture2.minFilter = THREE.LinearFilter;
    //     texture3.minFilter = THREE.LinearFilter;
        
    //     const width = 5.4;
    //     const height = 2.9;

    //     const sizes = {
    //         width: window.innerWidth,
    //         height: window.innerHeight
    //     }
        
        
    //     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e4);
        
    //     for (
    //            let looptyLoop = 0;
    //            looptyLoop < 3;
    //            looptyLoop++
    //     ){
        
    //     let cubes = [
    //         new THREE.ref.current(
    //             new THREE.PlaneGeometry(width * scale, height * scale),
    //             new THREE.MeshBasicMaterial({ map: texture1 })
    //         ),
    //         new THREE.ref.current(
    //             new THREE.PlaneGeometry(width * scale, height * scale),
    //             new THREE.MeshBasicMaterial({ map: texture2 })
    //         )
    //         ,
    //         new THREE.ref.current(
    //             new THREE.PlaneGeometry(width * scale, height * scale),
    //             new THREE.MeshBasicMaterial({ map: texture3 })
    //         ),
    //     ]

    //     group.add(cubes[looptyLoop]);
    //     const canvas = document.querySelector('.homeScene');

    //     camera.position.z = screenWidth >= 1200 ? 3 : 8;

    //     const renderer = new THREE.WebGLRenderer({
    //         canvas: canvas,
    //         antialias: true,
    //         alpha: !0
    //     })

    //     const  resizeRender = () =>{
    //         window.addEventListener('resize', () =>
    //         {
    //             // Update sizes
    //             sizes.width = window.innerWidth
    //             sizes.height = window.innerHeight

    //             // Update renderer
    //             renderer.setSize(sizes.width, sizes.height);

    //             // Update camera
    //             camera.aspect = sizes.width / sizes.height;
    //             camera.updateProjectionMatrix();
    //         })
    //     }

    //     renderer.setClearColor( 0x000000, 0 );
        
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //     //pixel ratio: corresponds to how many physical pixels you have on the screen for one pixel unit on the software part.
    //     // Device pixel ratio: allows us to adjust the pixel ratio of our scene to pixel ratio of our device
    //     renderer.setPixelRatio(Math.min(window.devicePixelRatio),2);
    
    //     // Animations loop function
    //     const animationLoop = () =>
    //     {   
    //         // Handles geometry resize
    //         resizeRender();
    //         /** End Makes canvas responsive canvas **/
            
    //         /** Warped tilt hover functionality **/

    //         const onMouseDown = (e) => {
    //             (mouseDown = !0), (prevMouse.x = mouse.x), (prevMouse.y = mouse.y);
    //             e.stopImmediatePropagation();
    //         }
    //         const onMouseUp = () => {
    //             (mouseDown = !1), (snapping = !0), (snapback.x = cubes[0].rotation.x / 60), (snapback.y = cubes[0].rotation.y / 60);
    //         }
    //         const onDocumentMouseMove = (a)=> {
    //             (hovering = !1), (mouse.x = a.clientX / window.innerWidth), (mouse.y = a.clientY / window.innerHeight);
    //         }
    //         const dragMove = () => {
    //             (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
    //         for (var a = 0; a < cubes.length; a++) (cubes[a].rotation.y -= 2 * distMouse.x), (cubes[a].rotation.x -= 2 * distMouse.y);
    //         }
    //         const hoverMove = () => {
    //             for (var a = 0; a < cubes.length; a++)
    //             mouse.x > 0.5 ? cubes[a].rotation.y < hover_dist && (cubes[a].rotation.y += 0.002) : mouse.x < 0.5 && cubes[a].rotation.y > -hover_dist && (cubes[a].rotation.y -= 0.002),
    //                 mouse.y > 0.5 ? cubes[a].rotation.x < hover_dist && (cubes[a].rotation.x += 0.002) : mouse.y < 0.5 && cubes[a].rotation.x > -hover_dist && (cubes[a].rotation.x -= 0.002);
    //         (cubes[0].rotation.y > hover_dist || cubes[0].rotation.y < -hover_dist) && (cubes[0].rotation.x > hover_dist || cubes[0].rotation.x < -hover_dist) && (hovering = !0);
    //         }
    //         const snapBack = () => {
    //             cubes[0].rotation.x < 0.002 && cubes[0].rotation.x > -0.002 && cubes[0].rotation.y < 0.002 && cubes[0].rotation.y > -0.002 && (snapping = !1);
    //             for (var a = 0; a < cubes.length; a++) (cubes[a].rotation.x -= snapback.x), (cubes[a].rotation.y -= snapback.y);
    //         }
    //         const hover = () => {
    //             i == timerx && (i = 0);
    //         for (var a = 0; a < cubes.length; a++) timerx / 2 > i ? ((cubes[a].rotation.x += 3e-4), (cubes[a].rotation.y -= 3e-4)) : ((cubes[a].rotation.x -= 3e-4), (cubes[a].rotation.y += 3e-4));
    //         i++;
    //         }
    //         window.requestAnimationFrame(animationLoop);

    //         mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove()
    //         leftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 62.5), transitionCounter++) : ((transitionCounter = 0), (leftScroll = !1)));
    //         dLeftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 125), transitionCounter++) : ((transitionCounter = 0), (dLeftScroll = !1)));
    //         rightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 62.5), transitionCounter++) : ((transitionCounter = 0), (rightScroll = !1)));
    //         dRightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 125), transitionCounter++) : ((transitionCounter = 0), (dRightScroll = !1)));
    //         mouseDown && ((prevMouse.y = mouse.y), (prevMouse.x = mouse.x))

            
    //         /** End Warped tilt hover functionality **/

    //         /** controls mouse and hover effects **/
    //             scene.add(group);
    //             (cubes[1].position.x = 10);
    //             (cubes[2].position.x = 20);

    //             const smoothness= 0.1 // 0 to 1 only

    //             const targetPosition = group.position.clone();
    //             const next = targetPosition.x -= 10;
    //             const nextLast = targetPosition.x -= 20;
    //             const previous = targetPosition.x = 10;

    //             function lerp() {
    //                 group.position.lerp(targetPosition, smoothness);
    //             }
                
    //             count > 0 ? group.position.x = -10 : '';

    //             // count > 0 ? next : '';

    //             count === 2? group.position.x = -20 : '';

    //             // count === 2? nextLast : '';

    //             count < 0 ? group.position.x = 10 : '';

    //             // count < 0 ? previous : '';

    //             console.log('im runninnn')
                            
    //             document.addEventListener("mousemove", onDocumentMouseMove, !1)
    //             document.addEventListener("mousedown", onMouseDown, !1)
    //             document.addEventListener("mouseup", onMouseUp, !1)
    //         /** End controls mouse and hover effects **/

    //         // Render
    //         renderer.render(scene, camera);
    //     }
    //     animationLoop()
    //     }
    // },[count])




    const Plane = (props: any) =>{
        
        const ref = useRef<HTMLElement | any>(null);
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
        // const texture1 = useLoader(TextureLoader, `${src1}`)

        // const images = useTexture([`${src1}`, `${src2}`, `${src3}`]);

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
                // hovering ? hover() : hoverMove();
                mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove();
                document.addEventListener("mousemove", onDocumentMouseMove, !1)
                // document.addEventListener("mousedown", onMouseDown, !1)
                // document.addEventListener("mouseup", onMouseUp, !1)
            }
            

            // mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove();

            // Old logic for carousel transitions on next or previous button click
            // leftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 62.5), transitionCounter++) : ((transitionCounter = 0), (leftScroll = !1)));
            // dLeftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 125), transitionCounter++) : ((transitionCounter = 0), (dLeftScroll = !1)));
            // rightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 62.5), transitionCounter++) : ((transitionCounter = 0), (rightScroll = !1)));
            // dRightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 125), transitionCounter++) : ((transitionCounter = 0), (dRightScroll = !1)));
            // mouseDown && ((prevMouse.y = mouse.y), (prevMouse.x = mouse.x));
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
                    {projects && projects.length > 0 ? projects.map((item, i)=>(
                            <div className={styles.titleWrapper} key={i}>
                                <Link href={ projects[i].fields.slug }>
                                    <h2 className={styles.videoTitle}>{ projects[i].fields.title}</h2>
                                </Link>
                            </div>
                    )) : ""}
                </div>
                {/* <Canvas frameloop="demand"  dpr={[1, 2]}> */}
                <Canvas dpr={[1, 2]}>
                   { isMobile ? <Plane position={[0, .1, 0]} /> : <Plane position={[0, 0, 0]} /> }
                   { isMobile ? <Plane position={[20, .1, 0]} /> : <Plane position={[20, 0, 0]} /> }
                   { isMobile ? <Plane position={[30, .1, 0]} /> : <Plane position={[30, 0, 0]} /> }
                </Canvas>
            </div>
        </>
    )
}