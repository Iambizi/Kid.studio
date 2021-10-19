

import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { isMobile } from 'react-device-detect';
import gsap from 'gsap';

interface Type{
    count: number;
    projects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
    goPrevious: any;
}

export default function warpedImage({ count, projects, carouselX, slideNext, slidePrevious, goPrevious }:Type):JSX.Element{

    const src1 = projects[0]?.fields.featuredProjectImage.fields ? projects[0].fields.featuredProjectImage.fields.file.url : null;
    const src2 = projects[1]?.fields.featuredProjectImage.fields ? projects[1].fields.featuredProjectImage.fields.file.url : null;
    const src3 = projects[2]?.fields.featuredProjectImage.fields ? projects[2].fields.featuredProjectImage.fields.file.url : null;
    
    const ref = useRef<HTMLElement | any>(null!);

    useEffect(()=>{

        if (!ref.current) {
            return
        }
        const screenWidth = window.innerWidth;
        
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
        let scale = 1;
        let a = !1;


        const scene = new THREE.Scene();

        const group = new THREE.Group();
        
        const loader = new THREE.TextureLoader();

        const texture1 = loader.load(`${src1}`);
        const texture2 = loader.load(`${src2}`);
        const texture3 = loader.load(`${src3}`);

        texture1.minFilter = THREE.LinearFilter;
        texture2.minFilter = THREE.LinearFilter;
        texture3.minFilter = THREE.LinearFilter;
        
        const width = 5.4;
        const height = 2.9;

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const canvas = document.querySelector('.homeScene');
        const renderer = new THREE.WebGLRenderer({
            div: canvas,
            antialias: true,
            alpha: !0
        });

        ref.current.appendChild(renderer.domElement);
        
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e4);

        const  resizeRender = () =>{
            window.addEventListener('resize', () =>
            {
                // Update sizes
                sizes.width = window.innerWidth
                sizes.height = window.innerHeight

                // Update renderer
                renderer.setSize(sizes.width, sizes.height);

                // Update camera
                camera.aspect = sizes.width / sizes.height;
                camera.updateProjectionMatrix();
            })
        }

        for (
               let loopityLoop = 0;
               loopityLoop < 3;
               loopityLoop++
        ){
        
        let planes = [
            new THREE.Mesh(
                new THREE.PlaneGeometry(width * scale, height * scale),
                new THREE.MeshBasicMaterial({ map: texture1 })
            ),
            new THREE.Mesh(
                new THREE.PlaneGeometry(width * scale, height * scale),
                new THREE.MeshBasicMaterial({ map: texture2 })
            )
            ,
            new THREE.Mesh(
                new THREE.PlaneGeometry(width * scale, height * scale),
                new THREE.MeshBasicMaterial({ map: texture3 })
            ),
        ]

        group.add(planes[loopityLoop]);
        

        camera.position.z = screenWidth >= 1200 ? 3 : 8;
        
        renderer.setClearColor( 0x000000, 0 );
        
        renderer.setSize(window.innerWidth, window.innerHeight);

        ref.current.appendChild( renderer.domElement );

        //pixel ratio: corresponds to how many physical pixels you have on the screen for one pixel unit on the software part.
        // Device pixel ratio: allows us to adjust the pixel ratio of our scene to pixel ratio of our device

        // Hide this if you want to achieve exact textured look as OG site
        renderer.setPixelRatio(Math.min(window.devicePixelRatio),2);

        // Animations loop function
        const animationLoop = () =>
        {   
            // Handles geometry resize
            resizeRender();
            /** End Makes canvas responsive canvas **/
            
            /** Warped tilt hover functionality **/

            const onMouseDown = (e) => {
                (mouseDown = !0), (prevMouse.x = mouse.x), (prevMouse.y = mouse.y);
                e.stopImmediatePropagation();
            }
            const onMouseUp = () => {
                (mouseDown = !1), (snapping = !0), (snapback.x = planes[0].rotation.x / 60), (snapback.y = planes[0].rotation.y / 60);
            }
            const onDocumentMouseMove = (a)=> {
                (hovering = !1), (mouse.x = a.clientX / window.innerWidth), (mouse.y = a.clientY / window.innerHeight);
            }

            const hoverMove = () => {
                for (var a = 0; a < planes.length; a++)
                mouse.x > 0.5 ? planes[a].rotation.y < hover_dist && (planes[a].rotation.y += 0.003) : mouse.x < 0.5 && planes[a].rotation.y > -hover_dist && (planes[a].rotation.y -= 0.003),
                    mouse.y > 0.5 ? planes[a].rotation.x < hover_dist && (planes[a].rotation.x += 0.003) : mouse.y < 0.5 && planes[a].rotation.x > -hover_dist && (planes[a].rotation.x -= 0.003);
            (planes[0].rotation.y > hover_dist || planes[0].rotation.y < -hover_dist) && (planes[0].rotation.x > hover_dist || planes[0].rotation.x < -hover_dist) && (hovering = !0);
            }
            const snapBack = () => {
                planes[0].rotation.x < 0.003 && planes[0].rotation.x > -0.003 && planes[0].rotation.y < 0.003 && planes[0].rotation.y > -0.003 && (snapping = !1);
                for (var a = 0; a < planes.length; a++) (planes[a].rotation.x -= snapback.x), (planes[a].rotation.y -= snapback.y);
            }
            const hover = () => {
                i == timerx && (i = 0);
            for (var a = 0; a < planes.length; a++) timerx / 2 > i ? ((planes[a].rotation.x += 3e-4), (planes[a].rotation.y -= 3e-4)) : ((planes[a].rotation.x -= 3e-4), (planes[a].rotation.y += 3e-4));
            i++;
            }
            window.requestAnimationFrame(animationLoop);

            snapping ? snapBack() : hovering ? hover() : hoverMove();
            mouseDown && ((prevMouse.y = mouse.y), (prevMouse.x = mouse.x));

            
            /** End Warped tilt hover functionality **/

            /** controls mouse and hover effects **/
                scene.add(group);

                (planes[1].position.x = 100);
                (planes[2].position.x = 200);

                

                // const slideReachedEnd = tl.fromTo(camera.position,{duration: .9, x: 200 },{duration: .9, x: 0});

                // const slideBackToStart = tl.fromTo(camera.position,{duration: .9, x: 0 },{duration: .9, x: 200});

                

                // YOOO Reverse works, your conditions are just a little wrong right now //

                goPrevious > 3 ? slide.reversed() : '';
                
                // console.log(slide.reverse());
                // slidePrevious ? gsap.from(camera.position, { duration: .5, delay: .02, x: -10 }) : '';
                // camera.position.x < 10 ? gsap.to(camera.position, { duration: .5, delay: .02, x: 20 }) : '';
                            
                document.addEventListener("mousemove", onDocumentMouseMove, !1);
                document.addEventListener("mousedown", onMouseDown, !1);
                document.addEventListener("mouseup", onMouseUp, !1);
            /** End controls mouse and hover effects **/

            // Render
            renderer.render(scene, camera);
        }
        animationLoop();

        {/* 
            In order to avoid having the 'return' statement stop the planes from looping we need to check that we're done looping 
            through the cubes before we proceed with this clean up code
        */}

        if(planes.length - 1 === loopityLoop) {
            return () => {
                if( ref.current){
                    window.removeEventListener("resize", resizeRender);
                    ref.current.removeChild(renderer.domElement);
                    scene.remove(scene.children[0]);
                }else{
                    return null;
                }
                
            };
        }


        }
        // return () => {
        //     if(ref.current){
        //         window.removeEventListener("resize", resizeRender);
        //     ref.current.removeChild(renderer.domElement);
        //     scene.remove(scene.children[0]);
        //     }else{
        //         return null;
        //     }
            
        // };
        const tl = gsap.timeline();
                const slide = tl.to(camera.position, { duration: .9, x: carouselX });
        slideNext && camera.position.x < 200 ? slide.play() : '';
    },[])
    
    return(

        // In order for line 131 to work we need to renderer.Element to return an actual DOM Element.
        //Canvas won't work because it's just a container for graphics.
        <>
            <div ref={ref} className={`${styles.homeScene} homeScene`}>
            </div>
        </>
    )
}