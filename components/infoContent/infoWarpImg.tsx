import styles from '../../styles/scss/info/_info.module.scss';
import * as THREE from 'three';
import React, { useEffect } from "react";

export default function inforWarpImg():JSX.Element{
    const cors = "https://cors-anywhere.herokuapp.com";
    useEffect(()=>{
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0xFFA500 );
        // this along with code on lines 42 & 43 sets scene color to transparent
        scene.background = null;
        
        const loader = new THREE.TextureLoader();
        // loader.setCrossOrigin("anonymous");
        const texture = loader.load(`https://kidstudio.co/content/3-info/1.png`);

        console.log(texture);
 
        const geometry = new THREE.PlaneGeometry(5.5,3);
        const material = new THREE.MeshBasicMaterial( {color: 0xffa805, side: THREE.DoubleSide} );
        // const material = new THREE.MeshBasicMaterial({ map: texture });
        const Mesh = new THREE.Mesh( geometry, material );
        scene.add( Mesh );

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
         //camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        
        //Renderer
        const canvas = document.querySelector('.sceneInfo');

        camera.position.z = 3

        camera.lookAt(Mesh.position);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        })
        renderer.setClearColor( 0x000000, 0 );
        
        renderer.setSize(sizes.width, sizes.height);
        //pixel ratio: corresponds to how many physical pixels you have on the screen for one pixel unit on the software part.
        // Device pixel ratio: allows us to adjust the pixel ratio of our scene to pixel ratio of our device
        renderer.setPixelRatio(Math.min(window.devicePixelRatio),2);

        // const render = () =>{
        //     renderer.render( scene, camera )
        // }
        renderer.render(scene, camera);

            // Clock
    let clock = new THREE.Clock()
    
    // Animations loop function
    const animationLoop = () =>
    {   
        const elapsedTime = clock.getElapsedTime();

        // Update camera
        // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5
        // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5
        // camera.position.y = cursor.y * 3
        // camera.lookAt(mesh.position)
        // Math.clamp(rotationX, -0, -0.70)
        camera.lookAt(Mesh.position)

        let rotationX = Mesh.rotation.x

        let rotationY = Mesh.rotation.y

        Mesh.rotation.x = - elapsedTime / 10
        Mesh.rotation.y = - elapsedTime / 10

        if(rotationX <= -0.31){
            Mesh.rotation.x = -0.31
            ;
            Mesh.rotation.y = -0.31
            ;
        }

        // Mesh.rotation.x = new THREE.MathUtils.clamp(rotationX, 0, -0.70);
        // Mesh.rotation.y = MathUtils.clamp(rotationY, 0, -0.70);
        
        console.log(Mesh.rotation.y);
        // Render
        renderer.render(scene, camera);
        window.requestAnimationFrame(animationLoop);
    }
    animationLoop()

    },[])

    
    return(
        <>
            <canvas className={`${styles.sceneInfo} sceneInfo`}>
            </canvas>
        </>
    )
}