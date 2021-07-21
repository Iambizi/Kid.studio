import styles from "../../styles/scss/homePage/_home.module.scss";
import Carousel from "./carousel";
import React, { useState } from "react";

interface Type{
    homeProjects: any;
    projects: any;
}

export default function content({ homeProjects, projects }: Type):JSX.Element{
    console.log(projects[0].fields)
    
    // State for counter
    const [count, setCount] = useState(0);
    
    // State for carousel position on slide
    let [ carouselX , setCarouselX ] = useState(0);

    //State for adding slideNext class name for image slide animations
    const [ slideNext, setSlideNext ] = useState(false);

    // state for adding SlidePrevious class name for image slide animations
    const [ slidePrevious, setSlidePrevious ] = useState(false);

    // handles next button functionality and logic for state used in carousel
    const goNext = () => {
        count > 1 ? setCount(0) : setCount(count + 1);
        carouselX  < 200 ? setCarouselX(carouselX + 100) : setCarouselX(0);
        setSlideNext(true);
        setTimeout(() => setSlideNext(false), 1000);
    }
    
    // handles previous button functionality and logic for state used in carousel
    const goPrevious = () => {
        count < 1 ? setCount(2) : setCount(count - 1);
        carouselX  < 100 ? setCarouselX(200) : setCarouselX(carouselX  - 100);
        setSlidePrevious(true);
        setTimeout(() => setSlidePrevious(false), 1000);
    }

    return(
        <>
            <section className={styles.noScroll}>
                <article className={styles.homeContentSection}>
                <Carousel homeProjects={homeProjects} count={count} carouselX={ carouselX } slideNext={slideNext} slidePrevious={slidePrevious} projects={projects}/>
                </article>
                <p className={styles.nextButton} onClick={goNext}>NEXT</p>
                <p className={styles.previousButton} onClick={goPrevious}>PREVIOUS</p>
                <p className ={styles.counter}>{count + 1}&nbsp;/&nbsp;3</p>
            </section>
        </>
    )
}