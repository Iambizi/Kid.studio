import {useState} from 'react';
import styles from "../../styles/scss/homePage/_home.module.scss";

export default function carousel(): JSX.Element{

        const [index, setIndex] = useState(0);
      
        const handleSelect = (selectedIndex, e): void => {
          setIndex(selectedIndex);
        }
        const handleNext = ():void =>{
            
        }
        const handlePrevious  = ():void =>{

        }
        
        const projects = [
            {
                video:"Bryson Tiller 'Always Forever'",
                path:"/1-alwaysforever-2.gif",
                count: 1
            },
            {   video:"Disclosure 'Energy",
                path:"/2-energy.gif",
                count: 2
            },
            {
                video:"Big Sean 'Wolves' ft. Post Malone",
                path:"/3-wolves.gif",
                count: 3
            }
        ];
    return(
        //activeIndex={index} onSelect={handleSelect}
        <>
            <div className={styles.gallery}>
                {projects.map((project,i)=>(
                    <div className={styles.carousel} key={i}>
                        <img
                            className={styles.carouselImage}
                            src={"https://kidstudio.co/content/2-home" + `${projects[i].path}`}
                            alt={"Video Project screenshot"}
                            height={200}
                            width={330}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}