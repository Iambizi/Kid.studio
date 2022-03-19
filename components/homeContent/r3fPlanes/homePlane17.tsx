import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { isMobile } from 'react-device-detect';


interface Type {
    projects: any;
    snapping: boolean;
    hover_dist: number;
    i: number;
    timerx: number;
    hovering: boolean;
    mouse: {
        x:number,
        y: number
    };
}

export const  HomePlane3 = ( { projects, snapping, hover_dist, i, timerx, hovering, mouse }: Type): JSX.Element => {

    const src1 = projects[2]?.fields.featuredProjectImage.fields ? projects[0].fields.featuredProjectImage.fields.file.url : null;
    

    const homePlaneRef = useRef<THREE.Mesh>();

    const textures = useTexture(src1);

    textures.minFilter = THREE.LinearFilter;

    const width = isMobile ? 3.26 : 9;
    const height = isMobile ? 1.76 : 5;
    
    const animateMesh = (state) => {

        const hoverMove = () => {
            mouse.x > 0.5 ? homePlaneRef.current.rotation.y < hover_dist && (homePlaneRef.current.rotation.y += 0.002) : mouse.x < 0.5 && homePlaneRef.current.rotation.y > -hover_dist && (homePlaneRef.current.rotation.y -= 0.002),
                mouse.y > 0.5 ? homePlaneRef.current.rotation.x < hover_dist && (homePlaneRef.current.rotation.x += 0.002) : mouse.y < 0.5 && homePlaneRef.current.rotation.x > -hover_dist && (homePlaneRef.current.rotation.x -= 0.002);
            (homePlaneRef.current.rotation.y > hover_dist || homePlaneRef.current.rotation.y < -hover_dist) && (homePlaneRef.current.rotation.x > hover_dist || homePlaneRef.current.rotation.x < -hover_dist) && (hovering = true);
        }

        const snapBack = () => {
            let speed = 0.005;
            if (homePlaneRef.current.rotation.x < 0) homePlaneRef.current.rotation.x += speed;
            if (homePlaneRef.current.rotation.x > 0) homePlaneRef.current.rotation.x -= speed;
            if (homePlaneRef.current.rotation.y < 0) homePlaneRef.current.rotation.y += speed;
            if (homePlaneRef.current.rotation.y > 0) homePlaneRef.current.rotation.y -= speed;
        }
        const hover = () => {
            i === timerx && (i = 0);
            timerx / 2 > i ? ((homePlaneRef.current.rotation.x += 3e-4), (homePlaneRef.current.rotation.y -= 3e-4)) : ((homePlaneRef.current.rotation.x -= 3e-4), (homePlaneRef.current.rotation.y += 3e-4));
            i++;
        }
        
        snapping ? snapBack() : hovering ? hover() : hoverMove();
    }

    useFrame((state) => {
        animateMesh(state);
    });


    useEffect(() => {

        const onMouseDown = (e) => {
            snapping = true;
            e.stopImmediatePropagation();
        }

        const onMouseUp = (e) => {
            setTimeout(() => snapping = false, 950);
        }
        const onDocumentMouseMove = (e) => {
            hovering = false;
            mouse.x = e.clientX / window.innerWidth;
            mouse.y = e.clientY / window.innerHeight;
            console.log("mouse moviiing");
        }

        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("mousedown", onMouseDown, false);
        document.addEventListener("mouseup", onMouseUp, false);

        return () => {
            document.removeEventListener("mousemove", onDocumentMouseMove, false);
            document.removeEventListener("mousedown", onMouseDown, false);
            document.removeEventListener("mouseup", onMouseUp, false);
        };
    })

    return (
        <>
            <mesh  ref={homePlaneRef} position={[200,0,.1]}>
                <planeBufferGeometry args={[width, height]} />
                <meshBasicMaterial map={textures} />
            </mesh>
        </>
    )
}

