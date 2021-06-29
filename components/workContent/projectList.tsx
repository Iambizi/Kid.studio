import Link from "next/link";
import styles from "../../styles/scss/workPage/_work.module.scss";
import React, { useEffect } from "react";
import { useRouter } from 'next/router'

interface Type{
    bgImg: boolean;
    setbgImg: any;
    projects: any;
}

export default function work( { bgImg, setbgImg, projects }:Type ){

  // removes needsScroll class set in project pages from vertical scroll
  // projectPage useEffect hook needs refactoring to avoid calling it again here.
  useEffect(()=>{
    const bg = document.body;
    bg.classList.remove("needsScroll");
},[]);
  
  const router = useRouter();

    // rewrote okHover plugin mouse over functionality
    const handleMouseOver = (e) => {
        const bg = document.body;
        const okGif= e.target.getAttribute('data-okimage');
        const link = document.getElementsByClassName("Link");

        const pathName = router.pathname;
        const comparison = pathName === "/work/[project]";

        setbgImg(true);
        
        bg.style.backgroundImage = `url(${okGif})`;

        // Because link constant returns htmlCollection, we need to iterate through using a for loop to make changes
        // for loop for function on mousemove event adds: backgroundPosition, z-index

        for(var i = 0; i < link.length; i++) {
            ((index)=> {
              link[index].addEventListener("mousemove", ()=> {
                bg.style.backgroundPosition = `${e.pageX}px ${e.pageY}px`;
                bg.style.zIndex = "420";
               })
            })(i);
          }

        //function that removes styles on mouseout and click
          const removeStyles = () => {
            bg.removeAttribute("style");
            setbgImg(false)
        }

        // on mouseOut event: removes all styles 
        for(var i = 0; i < link.length; i++) {
            ((index)=> {
              link[index].addEventListener("mouseout", removeStyles, false);
            })(i);
          }

        // on click event: removes all styles
          for(var i = 0; i < link.length; i++) {
            ((index)=> {
              link[index].addEventListener("click", removeStyles, false);
            })(i);
          }

        // Ensures bg does not remain styled once we click to projectPages  
          if(comparison){
            removeStyles();
          }
    }
    return(
        <>
            <section className={styles.projectListSection}>
                <div className={styles.projectLinks}>
                    {projects.map((item, i)=>(
                        <Link href={ process.env.NEXT_PUBLIC_APP_DOMAIN + "/work" + item.path } key={i}>
                            <a data-okimage={ "http://kidstudio.co/work" + item.hoverImage } className={ bgImg ? `${styles.projectLink} ${styles.hoverColor } Link`: `${styles.projectLink} Link` } onMouseMove={handleMouseOver}>{item.title}</a>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}