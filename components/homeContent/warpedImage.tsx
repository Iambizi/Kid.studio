

import React, {useEffect} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from "../../styles/scss/homePage/_carousel.module.scss";
interface Type{
    homeProjects: any;
    carouselX : number;
    slideNext: boolean;
    slidePrevious: boolean;
}

export default function warpedImage({slideNext, slidePrevious, homeProjects, carouselX}:Type):JSX.Element{
    useEffect(()=>{
        //Creat your scene, (your movie set)
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0x000000 );
        const texture = new THREE.TextureLoader().load( "https://kidstudio.co/content/2-home" + `${homeProjects[0].path}` );

        const img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
            map:THREE.ImageUtils.loadTexture("https://kidstudio.co/content/2-home" + `${homeProjects[0].path}`)
        });
        img.map.needsUpdate = true; //ADDED

        const geometry = new THREE.PlaneGeometry(1,1);
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        const Mesh = new THREE.Mesh( geometry, material );
        scene.add( Mesh );

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
         //camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);

        
        //Renderer
        const canvas = document.querySelector('.scene');

        camera.position.z = 3
        Mesh.position.z = 3

        camera.lookAt(Mesh.position);
        // Control
        // const controls = new OrbitControls(camera, canvas)
        
        // // Damping: allows for smoother controls. Gives a sense of weight to the controls
        // controls.enableDamping = true;

        // //Controls speed at which damping will happen 
        // controls.autoRotateSpeed = 3;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        })
        renderer.setClearColor( 0x000000, 0 );
        renderer.render(scene, camera);
    },[]);
    return(
        <>
            <canvas className={"scene"}>
                <div className={styles.slider} style={{left: `${ -carouselX }%`}}>
                    {homeProjects.map((p,i)=>
                        <div className={`${styles.sliderWrapper}`} key={i}>
                            <div className={`${styles.carousel}`}>
                                <img
                                    className={
                                        (slideNext) ? 
                                        `${styles[homeProjects[i].imageClassName]} ${styles.slideNext}` : 
                                        (slidePrevious) ?
                                        `${styles[homeProjects[i].imageClassName]} ${styles.slidePrevious}` :
                                        `${styles[homeProjects[i].imageClassName]}`
                                    }
                                    src={"https://kidstudio.co/content/2-home" + `${homeProjects[i].path}`}
                                    alt={"Video Project screenshot"}
                                    height={200}
                                    width={330}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </canvas>
        </>
    )
}