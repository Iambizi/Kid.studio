import styles from "../../styles/scss/homePage/_home.module.scss";
import WarpedImage from "./warpedImage";
import Carousel from "./carousel";
import Link from "next/link";
import React, {useState, useRef} from "react";



export default function content():JSX.Element{
    
    const homeProjects = [
        {
            video:"Bryson Tiller 'Always Forever'",
            path:"/1-alwaysforever-2.gif"
        },
        {   video:"Disclosure 'Energy",
            path:"/2-energy.gif"
        },
        {
            video:"Big Sean 'Wolves' ft. Post Malone",
            path:"/3-wolves.gif"
        }
    ];
    const [count, setCount] = useState(0);
    // SET CAROUSEL DEFAULTS
    let [currentPosition, setCurrentPosition] = useState(0); // Initial slide index value
    let currentSlide = homeProjects[currentPosition]; // variable index value we can reference later
    let [ x, setX ] = useState(0);
    const goNext = () => {
        // currentPosition !== homeProjects.length -1 ? // Check index length
        // setCurrentPosition(currentPosition + 1) : setCurrentPosition(currentPosition = 0);
        // currentSlide = homeProjects[currentPosition];
        count > 1 ? setCount(0) : setCount(count + 1);
        currentSlide = homeProjects[currentPosition];
        x < 200 ? setX(x + 100) : setX(0);
    }

    const goPrevious = () => {
        count < 1 ? setCount(2) : setCount(count - 1);
        currentSlide = homeProjects[currentPosition];
         x < 100 ? setX(200) : setX(x - 100);
        // setX(x - 100);
        // currentPosition !== 0 ? // Check index length
        // setCurrentPosition(currentPosition - 1) : setCurrentPosition(currentPosition = homeProjects.length - 1);
        // currentSlide = homeProjects[currentPosition];
    }


    return(
        <>
            <WarpedImage />
            <section className={styles.noScroll}>
                <Link href={"/work/[project]"}>
                    <h1 className={styles.carouselTitle}>{homeProjects[count].video}</h1>
                </Link>
                <article className={styles.homeContentSection}>
                <Carousel count={count} homeProjects={homeProjects} goNext={goNext} goPrevious={goPrevious} x={x}/>
                </article>
                <p className={styles.nextButton} onClick={goNext}>NEXT</p>
                <p className={styles.previousButton} onClick={goPrevious}>PREVIOUS</p>
                <p className ={styles.counter}>{count + 1}&nbsp;/&nbsp;3</p>
            </section>
        </>
    )
}