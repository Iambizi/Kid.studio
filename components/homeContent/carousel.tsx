import styles from "../../styles/scss/homePage/_carousel.module.scss";
import Link from "next/link";

interface Type{
    homeProjects: any;
    carouselX : number;
    titleX : number;
}
export default function carousel({ homeProjects, carouselX, titleX  }:Type): JSX.Element{
    
    
    return(
        //style={{ transform: `translateX(${-titleX}%)`}}
        //style={{left: `${15-titleX }%`}}
        <>
        {/* onChange add classname to add transition changing styles */}
            <div className={styles.slider} style={{left: `${ -carouselX }%`}}>
                {homeProjects.map((p,i)=>
                    <div key={i}>
                        <Link href={"/work/[project]"} key={i}>
                            <h2 className={`${styles[homeProjects[i].className]}`}>{homeProjects[i].videoTitle}</h2>
                        </Link>
                        <div className={`${styles.carousel}`}>
                            <img
                                className={styles.carouselImage}
                                src={"https://kidstudio.co/content/2-home" + `${homeProjects[i].path}`}
                                alt={"Video Project screenshot"}
                                height={200}
                                width={330}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}