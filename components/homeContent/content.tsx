import styles from "../../styles/scss/homePage/_home.module.scss";
import Carousel from "./carousel";
import React, { useState } from "react";

interface Type{
    homeProjects: any;
    projects: any;
}

export default function Content({ homeProjects, projects }: Type):JSX.Element{
    
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
        const addCount = count + 1;
        const addCarouselX = carouselX + 100;
        count > 1 ? setCount(0) : setCount(addCount);
        carouselX  < 200 ? setCarouselX(addCarouselX) : setCarouselX(0);
        setSlideNext(true);
        setTimeout(() => setSlideNext(false), 1000);
    }
    
    // handles previous button functionality and logic for state used in carousel
    const goPrevious = () => {
        const minusCount = (count - 1);
        const minusCarouselX = (carouselX  - 100);
        count < 1 ? setCount(2) : setCount(minusCount);
        carouselX  < 100 ? setCarouselX(200) : setCarouselX(minusCarouselX);
        setSlidePrevious(true);
        setTimeout(() => setSlidePrevious(false), 1000);
    }

    return(
        <>
            <section className={styles.noScroll}>
                <article className={styles.homeContentSection}>
                <Carousel homeProjects={homeProjects} count={count} carouselX={ carouselX } slideNext={slideNext} slidePrevious={slidePrevious} projects={projects} goNext={goNext} goPrevious={goPrevious} />
                </article>
                <p className={styles.nextButton} id={"next"} onClick={goNext}>NEXT</p>
                <p className={styles.previousButton} id={"previous"} onClick={goPrevious}>PREVIOUS</p>
                <p className ={styles.counter}>{count + 1}&nbsp;/&nbsp;3</p>
                {/* <style jsx>{`
                    @keyframes slideNext {
                      from {
                          transform : translateX(1000%);
                          -webkit-transform : translateX(1000%);
                          -ms-transform : translateX(1000%);
                      }
                      to {
                          transform : translateX(0%);
                          -webkit-transform : translateX(0%);
                          -ms-transform : translateX(0%);
                      }
                  }
                  @-webkit-keyframes slideNext {
                      from {
                          transform : translateX(1000%);
                          -webkit-transform : translateX(1000%);
                          -ms-transform : translateX(1000%);
                      }
                      to {
                          transform : translateX(0%);
                          -webkit-transform : translateX(0%);
                          -ms-transform : translateX(0%);
                      }
                  }
                  @keyframes slidePrevious {
                      from {
                          transform : translateX(-1000%);
                          -webkit-transform : translateX(-1000%);
                          -ms-transform : translateX(-1000%);
                      }
                      to {
                          transform : translateX(0%);
                          -webkit-transform : translateX(0%);
                          -ms-transform : translateX(0%);
                      }
                  }
                  @-webkit-keyframes slidePrevious {
                      from {
                          transform : translateX(-1000%);
                          -webkit-transform : translateX(-1000%);
                          -ms-transform : translateX(-1000%);
                      }
                      to {
                          transform : translateX(0%);
                          -webkit-transform : translateX(0%);
                          -ms-transform : translateX(0%);
                      }
                  }
                  .slider {
                      margin: auto;
                      display: flex;
                      overflow-x: hidden;
                      position: fixed;
                      transition: 1.5s ease-in-out;
                      .sliderWrapper{
                          width: 100vw;
                          .carousel{
                              height: 100vh;
                              width: 100vw;
                              animation: none;
                              .homeScene{
                                  @include fullviewPort();
                              }
                              .carouselImage, .carouselImage1, .carouselImage2, .carouselImage3{
                                      overflow-x: hidden;
                                  &.slideNext{
                                      animation: slideNext 0.9s none;
                                      -webkit-animation: slideNext 0.9s none;
                                      -ms-animation: slideNext 0.9s none;
                                  }
                                  &.slidePrevious{
                                      animation: slidePrevious 0.9s none;
                                      -webkit-animation: slidePrevious 0.9s none;
                                      -ms-animation: slidePrevious 0.9s none;
                                  }
                              }
                          }
                      }
                  }
                `}</style> */}
            </section>
        </>
    )
}