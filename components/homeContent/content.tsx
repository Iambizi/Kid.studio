import styles from "../../styles/scss/homePage/_home.module.scss";
import WarpedImage from "./warpedImage";
import Carousel from "./carousel";
import React, {useState} from "react";


export default function content():JSX.Element{
    
    const projects = [
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

    return(
        <>
            <h1 className={styles.carouselTitle}>{projects[count].video}</h1>
            <section className={styles.homeContentSection}>
            <WarpedImage />
            {/* <Carousel count={count} projects={projects} /> */}
            </section>
            <p className={styles.nextButton} onClick={()=> count > 1 ? setCount(0) : setCount(count + 1)}>NEXT</p>
            <p className={styles.previousButton} onClick={()=> count < 1 ? setCount(2) : setCount(count - 1)}>PREVIOUS</p>
            <p className ={styles.counter}>{count + 1}&nbsp;/&nbsp;3</p>
        </>
    )
}