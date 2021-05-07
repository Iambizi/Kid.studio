import styles from "../../styles/scss/homePage/_home.module.scss";
import WarpedImage from "./warpedImage";
import Carousel from "./carousel";
import React, {useState} from "react";
export default function content():JSX.Element{
    
    
    const projects = [
        {
            video:"Bryson Tiller 'Always Forever'",
            src:"https://kidstudio.co/content/2-home/2-energy.gif",
            count: 1
        },
        {   video:"Disclosure 'Energy",
            src:"https://kidstudio.co/content/2-home/2-energy.gif",
            count: 2
        },
        {
            video:"Big Sean 'Wolves' ft. Post Malone",
            src:"https://kidstudio.co/content/2-home/3-wolves.gif",
            count: 3
        }
    ];
    const [count, setCount] = useState(1);
    return(
        <>
            <h1 className={styles.carouselTitle}>{projects[0].video}</h1>
            <section className={styles.homeContentSection}>
            {/* <WarpedImage /> */}
            <Carousel />
            </section>
            <p className={styles.nextButton} onClick={()=> count > 2 ? setCount(0) : setCount(count + 1)}>NEXT</p>
            <p className={styles.previousButton} onClick={()=> count < 1 ? setCount(0) : setCount(count - 1)}>PREVIOUS</p>
            <p className ={styles.counter}>{count}&nbsp;/&nbsp;3</p>
        </>
    )
}