import React, { Suspense, useRef, forwardRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from "@react-three/drei";
import { Canvas, useFrame } from '@react-three/fiber';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import WarpedPlane from "./CustomPlaneR3F/WarpedPlane";
import { Block } from "./CustomPlaneR3F/blocks";



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
        let mouse = { x: 0, y: 0 };

        let onDocumentMouseMove;
        let onMouseDown;
        let onMouseUp;

        const texturez = useTexture([src1, src2, src3]);
        const textures = useTexture([`${src1}`, `${src2}`, `${src3}`]);

        // console.log(textures);

        textures[0].minFilter = THREE.LinearFilter;
        textures[1].minFilter = THREE.LinearFilter;
        textures[2].minFilter = THREE.LinearFilter;

        const width = isMobile ? 3.1 : 9;
        const height = isMobile ? 1.7 : 5;

        useFrame((state) => {
            animateMesh(state);
        });

        const animateMesh = (state) => {
            if(homePlaneRef && homePlaneRef.current !== undefined){
                // const onMouseDown = (e) => {
                //     snapping = true;                    
                // }

                // const onMouseUp = (e) => {
                //     setTimeout(() => snapping = false, 950);
                // }
                // const onDocumentMouseMove = (e)=> {
                //     hovering = false;
                //     state.mouse.x = e.clientX / window.innerWidth; 
                //     state.mouse.y = e.clientY / window.innerHeight;
                // }


                ((state)=>{
                    onDocumentMouseMove = (e) => {
                        hovering = false;
                        mouse.x = e.clientX / window.innerWidth; 
                        mouse.y = e.clientY / window.innerHeight;
                        console.log("mousemooooove");
                    };
                    onMouseDown = (e) => {
                        snapping = true;
                        console.log("mouseDown");                    
                    };
                    onMouseUp = (e) => {
                        setTimeout(() => snapping = false, 950);
                        console.log("mouseUp");
                    }
                })();

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
                // document.addEventListener("mousemove", onDocumentMouseMove, false);
                // document.addEventListener("mousedown", onMouseDown, false);
                // document.addEventListener("mouseup", onMouseUp, false);
            }
        }

        useEffect(()=>{
            document.addEventListener("mousemove", onDocumentMouseMove, false);
            document.addEventListener("mousedown", onMouseDown, false);
            document.addEventListener("mouseup", onMouseUp, false);

            // return () => {
            //     document.removeEventListener("mousemove", onDocumentMouseMove, false);
            //     document.removeEventListener("mousedown", onMouseDown, false);
            //     document.removeEventListener("mouseup", onMouseUp, false); 
            // }
        },[]);

        return(
            <>
                <mesh {...props} ref={homePlaneRef}>
                    <planeGeometry args={[width, height]} />
                    {textures.map((texture, i)=>(
                        <meshBasicMaterial key={i} map={texture} />
                    ))}
                        {/* <meshBasicMaterial map={textures} /> */}
                </mesh>
            </>
        )
    }

    const Plane = (props: any) => {
        const planeRef = useRef<THREE.Mesh>();
        const width = isMobile ? 3.1 : 9;
        const height = isMobile ? 1.7 : 5;
        return(
            <mesh {...props} ref={planeRef}>
                <planeGeometry args={[width, height]} />
            </mesh>
        )
    }

    const Image = ({ img })=> {
        const ref = useRef<THREE.Mesh>();       
        return (
          <group ref={ref}>
            <WarpedPlane map={img} position={[0, 0, 0]} /> 
          </group>
        )
    }
    

    const Content:any = () => {
        
    const textures = useTexture([`${src1}`, `${src2}`, `${src3}`]);
    const texturess = useTexture([src1, src2, src3]);
    textures[0].minFilter = THREE.LinearFilter;
    textures[1].minFilter = THREE.LinearFilter;
    textures[2].minFilter = THREE.LinearFilter;
    textures.map((texture)=>console.log(texture));
    return texturess.map((img:string, index:number) => (
        <Block key={index} factor={1} offset={index}>
            <Image key={index} img={img} />
        </Block>
    ));
    }

    const next = () => {
        goNext();
    }
    const previous = () => {
        goPrevious();
    }
    homePlaneControls.current = { next, previous }

    const texturess = [`${src1}`, `${src2}`, `${src3}`];

    return(
        <>
            <div className={`${styles.homeScene} homeScene`}>
                <p className={styles.nextButton} onClick={homePlaneControls.current.next}>NEXT</p>
                <p className={styles.previousButton} onClick={homePlaneControls.current.previous}>PREVIOUS</p>
                <Canvas id={"mesh"} camera={{ position: [0, 0, 5]}}>
                    <Suspense fallback={null}>
                        {/* <HomePlane position={[0, 0, 0]} /> 
                        <HomePlane position={[10, 0, 0]} />
                        <HomePlane position={[200, 0, 0]} />  */}
                        <Content />
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}