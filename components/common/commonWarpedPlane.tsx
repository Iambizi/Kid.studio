

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
import { isMobile } from 'react-device-detect';
import gsap from 'gsap';
import { useRouter } from 'next/router';

interface Type{
    count?: number;
    projects?: any;
    carouselX?: number;
    slideNext?: boolean;
    slidePrevious?: boolean;
    goNext?: any;
    goPrevious?: any;
    infoSrcTexture?: string;
}

export default function CommonWarpedImage({ count, projects, carouselX, slideNext, slidePrevious, goNext, goPrevious, infoSrcTexture  }:Type):JSX.Element{

    const homePlaneRef = useRef<HTMLElement | any>(null!);
    const homePlaneControls = useRef<HTMLElement | any>(null!);
    const router = useRouter();
    const homePath = /\/$/gm;
    const infoPath = /\/info$/gm;
    const isHomePage = router.pathname.match(homePath);
    const isInfoPage = router.pathname.match(infoPath);

    const src1 = isHomePage && projects[0]?.fields.featuredProjectImage.fields ? projects[0].fields.featuredProjectImage.fields.file.url : null;
    const src2 = isHomePage && projects[1]?.fields.featuredProjectImage.fields ? projects[1].fields.featuredProjectImage.fields.file.url : null;
    const src3 = isHomePage && projects[2]?.fields.featuredProjectImage.fields ? projects[2].fields.featuredProjectImage.fields.file.url : null;


    // slideNext ? console.log("click farwud") : null;
    // slideNext && carouselX <= 100 ? "'nother click farwud" : "back to 1st";
    // slidePrevious ? console.log("click Previas") : null;
    // slidePrevious && carouselX == 100 ? "back to 1st": "'nother click backwuads";
    
    // const tl = gsap.timeline();
    // const slide = tl.to(camera.position, { duration: .9, x: carouselX });
    // slideNext && camera.position.x < 200 ? slide.play() : '';

    useEffect(()=>{
        init();
    },[]);

    const group = new THREE.Group();
    let init = () =>{
        let hover_dist = 0.3;
        let mouse = { x: 0, y: 0 };
        let snapback = { x: 0, y: 0 };
        let prevMouse = { x: 0, y: 0 };
        let i = 0;
        let timerx = 500;
        let hovering = !1;
        let snapping = !1;
        let mouseDown = !1;
        let scale = 1;
        let transitionFrames = 31;
        let transitionCounter = 0;
        let leftScroll = !1;
        let dLeftScroll = !1;
        let dRightScroll = !1;
        let rightScroll = !1;
        let distMouse = { x: 0, y: 0 };

        const scene = new THREE.Scene();
        
        const loader = new THREE.TextureLoader();

        const infoTexture = loader.load(`${infoSrcTexture}`);
        const texture1 = loader.load(`${src1}`);
        const texture2 = loader.load(`${src2}`);
        const texture3 = loader.load(`${src3}`);

        texture1.minFilter = THREE.LinearFilter;
        texture2.minFilter = THREE.LinearFilter;
        texture3.minFilter = THREE.LinearFilter;

        
        const width = 5.4;
        const height = 2.9;

        const geometry = new THREE.PlaneGeometry(width * scale, height * scale);
        const material = new THREE.MeshBasicMaterial({ map: infoTexture });

        const mesh = new THREE.Mesh( geometry, material );


        const canvas = document.querySelector('.homeScene');
        const renderer = new THREE.WebGLRenderer({
            div: canvas,
            antialias: true,
            alpha: !0
        });

        homePlaneRef.current.appendChild(renderer.domElement);
        
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

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
        
        // Home plane mesh
        let planes = [
            new THREE.Mesh(
                geometry,
                new THREE.MeshBasicMaterial({ map: texture1 })
            ),
            new THREE.Mesh(
                geometry,
                new THREE.MeshBasicMaterial({ map: texture2 })
            )
            ,
            new THREE.Mesh(
                geometry,
                new THREE.MeshBasicMaterial({ map: texture3 })
            ),
        ]

        router.pathname.match(homePath) ? group.add(planes[loopityLoop]) : scene.add(mesh) ;
        

        camera.position.z = isMobile ? 8 : 3;
        
        renderer.setClearColor( 0x000000, 0 );
        
        renderer.setSize(window.innerWidth, window.innerHeight);

        // homePlaneRef.current.appendChild( renderer.domElement );

        //pixel ratio: corresponds to how many physical pixels you have on the screen for one pixel unit on the software part.
        // Device pixel ratio: allows us to adjust the pixel ratio of our scene to pixel ratio of our device

        // Hide this if you want to achieve exact textured look as OG site
        isMobile || router.pathname.match(infoPath) ? renderer.setPixelRatio(Math.min(window.devicePixelRatio),2) : null;

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
                (mouseDown = !1), (snapping = !0), (snapback.x = isHomePage? planes[0].x / 60 : mesh.rotation.x / 60), (snapback.y = isHomePage? planes[0].rotation.y / 60 : mesh.rotation.y / 60);
            }
            const onDocumentMouseMove = (a)=> {
                (hovering = !1), (mouse.x = a.clientX / window.innerWidth), (mouse.y = a.clientY / window.innerHeight);
            }

            // function dragMove() {
            //     (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
            //     for (var a = 0; a < planes.length; a++) (planes[a].rotation.y -= 2 * distMouse.x), (planes[a].rotation.x -= 2 * distMouse.y);
            // }

            const hoverMove = () => {
                for (var a = 0; a < planes.length; a++)
                mouse.x > 0.5 ? planes[a].rotation.y < hover_dist && (planes[a].rotation.y += 0.002) : mouse.x < 0.5 && planes[a].rotation.y > -hover_dist && (planes[a].rotation.y -= 0.002),
                    mouse.y > 0.5 ? planes[a].rotation.x < hover_dist && (planes[a].rotation.x += 0.002) : mouse.y < 0.5 && planes[a].rotation.x > -hover_dist && (planes[a].rotation.x -= 0.002);
            (planes[0].rotation.y > hover_dist || planes[0].rotation.y < -hover_dist) && (planes[0].rotation.x > hover_dist || planes[0].rotation.x < -hover_dist) && (hovering = !0);
            }
            const snapBack = () => {
                planes[0].rotation.x < 0.002 && planes[0].rotation.x > -0.002 && planes[0].rotation.y < 0.002 && planes[0].rotation.y > -0.002 && (snapping = !1);
                for (var a = 0; a < planes.length; a++) (planes[a].rotation.x -= snapback.x), (planes[a].rotation.y -= snapback.y);
            }
            const hover = () => {
                i == timerx && (i = 0);
            for (var a = 0; a < planes.length; a++) timerx / 2 > i ? ((planes[a].rotation.x += 3e-4), (planes[a].rotation.y -= 3e-4)) : ((planes[a].rotation.x -= 3e-4), (planes[a].rotation.y += 3e-4));
            i++;
            }
            window.requestAnimationFrame(animationLoop);

            // mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove();
            // leftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 62.5), transitionCounter++) : ((transitionCounter = 0), (leftScroll = !1)));
            // dLeftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 125), transitionCounter++) : ((transitionCounter = 0), (dLeftScroll = !1)));
            // rightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 62.5), transitionCounter++) : ((transitionCounter = 0), (rightScroll = !1)));
            // dRightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 125), transitionCounter++) : ((transitionCounter = 0), (dRightScroll = !1)));
            // mouseDown && ((prevMouse.y = mouse.y), (prevMouse.x = mouse.x));

            document.addEventListener("mousemove", onDocumentMouseMove, !1);
            document.addEventListener("mousedown", onMouseDown, !1);
            document.addEventListener("mouseup", onMouseUp, !1);

            snapping ? snapBack() : hovering ? hover() : hoverMove();
            mouseDown && ((prevMouse.y = mouse.y), (prevMouse.x = mouse.x));

            
            /** End Warped tilt hover functionality **/

            /** controls mouse and hover effects **/
                scene.add(group);
                (planes[1].position.x = 100);
                (planes[2].position.x = 200);
                // camera.position.x = carouselX;
                // const tl = gsap.timeline();
                // const slide = tl.to(camera.position, { duration: .9, x: 100 });
                
                
                // const slideReachedEnd = tl.fromTo(camera.position,{duration: .9, x: 200 },{duration: .9, x: 0});

                // const slideBackToStart = tl.fromTo(camera.position,{duration: .9, x: 0 },{duration: .9, x: 200});

                // YOOO Reverse works, your conditions are just a little wrong right now //
                
                // console.log(slide.reverse());
                // slidePrevious ? gsap.from(camera.position, { duration: .5, delay: .02, x: -10 }) : '';
                // camera.position.x < 10 ? gsap.to(camera.position, { duration: .5, delay: .02, x: 20 }) : '';
                            
            /** End controls mouse and hover effects **/

            // Render
            renderer.render(scene, camera);
        }
        animationLoop();
        }
        // const cleanUp = () => {
        //     if(homePlaneRef.current){
        //         window.removeEventListener("resize", resizeRender);
        //         homePlaneRef.current.removeChild(renderer.domElement);
        //         scene.remove(scene.children[0]);
        //         geometry.dispose();
        //     }
        // }
        //     cleanUp();
        //     router.events.on('beforeHistoryChange', cleanUp);
        //     return () => {
        //       router.events.off('beforeHistoryChange', cleanUp);
        //     };

    }
    
    // Tying click functions to useRef hook to create a controls reference
    group.position.x = carouselX;
    const next = () =>{
        goNext();
        console.log(count);
        console.log(group);
    }
    const previous = ()=>{
        goPrevious();
        console.log(count);
        console.log(group);
    }
    homePlaneControls.current = { next, previous }

    return(

        // In order for line 131 to work we need to renderer.Element to return an actual DOM Element.
        //Canvas won't work because it's just a container for graphics.
        <>
        {router.pathname.match(homePath)? <>
            <p className={styles.nextButton} onClick={homePlaneControls.current.next}>NEXT</p>
            <p className={styles.previousButton} onClick={homePlaneControls.current.previous}>PREVIOUS</p></> : <></> }
            <div ref={homePlaneRef} className={`${styles.homeScene} homeScene`}>
            </div>
        </>
    )
}