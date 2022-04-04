import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { isMobile } from 'react-device-detect';


interface Type {
    projects: any;
    position: number;
    projectIndex: number;
    slideNext: boolean;
    slidePrevious: boolean;
}

const HomePlanes = ( { projects, position, projectIndex, slideNext, slidePrevious, ...props}: Type): JSX.Element => {

    const src = projects[projectIndex]?.fields.featuredProjectImage.fields ? projects[projectIndex].fields.featuredProjectImage.fields.file.url : null;
    
    let hovering = false;
    let snapping = false;
    let mouseDown = false;
    let hover_dist = 0.3;
    let i = 0;
    let timerx = 500;
    let mouse = { x: 0, y: 0 };
    let prevMouse = { x: 0, y: 0 };
    let snapback = { x: 0, y: 0 };

    const homePlaneRef = useRef<THREE.Mesh>();

    const textures = useTexture(src);

    textures.minFilter = THREE.LinearFilter;

    const width = isMobile ? 3.26 : 8.7;
    const height = isMobile ? 1.76 : 5;
    
    const animateMesh = (state, delta) => {

        const hoverMove = () => {
            mouse.x > 0.5 ? homePlaneRef.current.rotation.y < hover_dist && (homePlaneRef.current.rotation.y += 0.002) : mouse.x < 0.5 && homePlaneRef.current.rotation.y > -hover_dist && (homePlaneRef.current.rotation.y -= 0.002),
                mouse.y > 0.5 ? homePlaneRef.current.rotation.x < hover_dist && (homePlaneRef.current.rotation.x += 0.002) : mouse.y < 0.5 && homePlaneRef.current.rotation.x > -hover_dist && (homePlaneRef.current.rotation.x -= 0.002);
            (homePlaneRef.current.rotation.y > hover_dist || homePlaneRef.current.rotation.y < -hover_dist) && (homePlaneRef.current.rotation.x > hover_dist || homePlaneRef.current.rotation.x < -hover_dist) && (hovering = true);
        }

        const hover = () => {
            i === timerx && (i = 0);
            timerx / 2 > i ? ((homePlaneRef.current.rotation.x += 3e-4), (homePlaneRef.current.rotation.y -= 3e-4)) : ((homePlaneRef.current.rotation.x -= 3e-4), (homePlaneRef.current.rotation.y += 3e-4));
            i++;
        }
        
        const snapBack = () => {
            homePlaneRef.current.rotation.x < 0.002 && homePlaneRef.current.rotation.x > -0.002 && homePlaneRef.current.rotation.y < 0.002 && homePlaneRef.current.rotation.y > -0.002 && (snapping = false);
            homePlaneRef.current.rotation.x -= snapback.x; 
            homePlaneRef.current.rotation.y -= snapback.y;
        }

        const slideSnapBack = () => {
            homePlaneRef.current.rotation.x = THREE.MathUtils.damp(homePlaneRef.current.rotation.x, 0, 7, delta); 
            homePlaneRef.current.rotation.y = THREE.MathUtils.damp(homePlaneRef.current.rotation.y, 0, 7, delta);
        }

        slideNext || slidePrevious ? slideSnapBack() : null;
        mouseDown ? hover() : snapping ? snapBack() : hovering ? hover() : hoverMove();
    }

    useFrame((state, delta) => {
        animateMesh(state, delta);        
    });

    useEffect(() => {

        const onMouseDown = () => {
            mouseDown = true;
            prevMouse.x = mouse.x; 
            prevMouse.y = mouse.y;
        }

        const onMouseUp = () => {
            mouseDown = false;
            snapping = true; 
            snapback.x = homePlaneRef.current.rotation.x / 60; 
            snapback.y = homePlaneRef.current.rotation.y / 60;
        }

        const onDocumentMouseMove = (e) => {
            hovering = false;
            mouse.x = e.clientX / window.innerWidth;
            mouse.y = e.clientY / window.innerHeight;
        }

        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("mousedown", onMouseDown, false);
        document.addEventListener("mouseup", onMouseUp, false);

        return () => {
            document.removeEventListener("mousemove", onDocumentMouseMove, false);
            document.removeEventListener("mousedown", onMouseDown, false);
            document.removeEventListener("mouseup", onMouseUp, false);
        };

    });

    return (
        <>
            <mesh {...props} ref={homePlaneRef} position={[position, 0, .1]}>
                <planeBufferGeometry args={[width, height]} />
                <meshBasicMaterial map={textures} />
            </mesh>
        </>
    )
}

export default HomePlanes;