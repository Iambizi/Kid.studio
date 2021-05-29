import styles from "../../styles/scss/homePage/_home.module.scss";
import WarpedImage from "./warpedImage";
import Carousel from "./carousel";
import React, {useState, useRef} from "react";



export default function content():JSX.Element{
    
    const homeProjects = [
        {
            videoTitle:"Bryson Tiller 'Always Forever'",
            path:"/1-alwaysforever-2.gif",
            className: "videoTitle1"

        },
        {   videoTitle:"Disclosure 'Energy",
            path:"/2-energy.gif",
            className: "videoTitle2"
        },
        {
            videoTitle:"Big Sean 'Wolves' ft. Post Malone",
            path:"/3-wolves.gif",
            className: "videoTitle3"
        }
    ];
    const [count, setCount] = useState(0);
    // SET CAROUSEL DEFAULTS
    let [currentPosition, setCurrentPosition] = useState(0); // Initial slide index value
    let currentSlide = homeProjects[currentPosition]; // variable index value we can reference later
    // State for carousel position on slide
    let [ carouselX , setCarouselX ] = useState(0);
    // State for title position on slide
    let [ titleX , setTitleX ] = useState(0);
    
    const goNext = () => {

        count > 1 ? setCount(0) : setCount(count + 1);
        
        // titleX  < 200 ? setTitleX(titleX + 100) : setTitleX(0);
        // setTitleX(titleX + 100) 
        // if you reach end of slides go back to 1st position
        carouselX  < 200 ? setCarouselX(carouselX + 100) : setCarouselX(0);
        
    }

    const goPrevious = () => {
        count < 1 ? setCount(2) : setCount(count - 1);
        // if you at 1st position and hit previous go back to last slide
        // titleX  < 100 ? setTitleX(215) : setTitleX(titleX  - 100);
        // setTitleX(titleX + 100) 
        carouselX  < 100 ? setCarouselX(200) : setCarouselX(carouselX  - 100);

    }

    return(
        <>
            <WarpedImage />
            <section className={styles.noScroll}>
                <article className={styles.homeContentSection}>
                <Carousel homeProjects={homeProjects} carouselX={ carouselX } titleX={titleX}/>
                </article>
                <p className={styles.nextButton} onClick={goNext}>NEXT</p>
                <p className={styles.previousButton} onClick={goPrevious}>PREVIOUS</p>
                <p className ={styles.counter}>{count + 1}&nbsp;/&nbsp;3</p>
            </section>
        </>
    )
}