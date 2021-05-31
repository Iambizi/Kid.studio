import styles from "../../styles/scss/homePage/_home.module.scss";
import WarpedImage from "./warpedImage";
import Carousel from "./carousel";
import React, { useState } from "react";



export default function content():JSX.Element{
    
    const homeProjects = [
        {
            videoTitle:"Bryson Tiller 'Always Forever'",
            path:"/1-alwaysforever-2.gif",
            className: "videoTitle1"

        },
        {   videoTitle:"Disclosure 'Energy'",
            path:"/2-energy.gif",
            className: "videoTitle2"
        },
        {
            videoTitle:"Big Sean 'Wolves' ft. Post Malone",
            path:"/3-wolves.gif",
            className: "videoTitle3"
        }
    ];

    // State for counter
    const [count, setCount] = useState(0);
    
    // State for carousel position on slide
    let [ carouselX , setCarouselX ] = useState(0);

    //State for adding slideNext class name for image slide animations
    const [ slideNext, setSlideNext ] = useState(false);
    // state for adding SlidePrevious class name for image slide animations
    const [ slidePrevious, setSlidePrevious ] = useState(false);

    const goNext = () => {
        count > 1 ? setCount(0) : setCount(count + 1);
        carouselX  < 200 ? setCarouselX(carouselX + 100) : setCarouselX(0);
        setSlideNext(true);
    }

    const goPrevious = () => {
        count < 1 ? setCount(2) : setCount(count - 1);
        carouselX  < 100 ? setCarouselX(200) : setCarouselX(carouselX  - 100);
        setSlidePrevious(true);
    }

    return(
        <>
            <WarpedImage />
            <section className={styles.noScroll}>
                <article className={styles.homeContentSection}>
                <Carousel homeProjects={homeProjects} carouselX={ carouselX } slideNext={slideNext} slidePrevious={slidePrevious}/>
                </article>
                <p className={styles.nextButton} onClick={goNext}>NEXT</p>
                <p className={styles.previousButton} onClick={goPrevious}>PREVIOUS</p>
                <p className ={styles.counter}>{count + 1}&nbsp;/&nbsp;3</p>
            </section>
        </>
    )
}