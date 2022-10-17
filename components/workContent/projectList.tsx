import Link from "next/link";
import styles from "../../styles/scss/workPage/_work.module.scss";
import React from "react";
import { workPageTypes } from "../../components/props/propTypes";


interface Type {
  bgImg: boolean;
  setbgImg: any;
  workPageData: workPageTypes;
}

const ProjectList: React.FC<Type> = ({ bgImg, setbgImg, workPageData }): JSX.Element => {

  // rewrote okHover plugin mouse over functionality
  const handleMouseOver = (e) => {
    const bg = document.body;
    const okGif = e.target.getAttribute('data-okimage');
    const link = document.getElementsByClassName("Link");

    setbgImg(true);

    bg.style.backgroundImage = `url(${okGif})`;

    // Because link constant returns htmlCollection, we need to iterate through using a for loop to make changes
    // for loop for function on mousemove event adds: backgroundPosition, z-index

    for (let i = 0; i < link.length; i++) {
      ((index) => {
        link[index].addEventListener("mousemove", () => {
          bg.style.backgroundPosition = `${e.pageX}px ${e.pageY}px`;
          bg.style.zIndex = "420";
          // bg.style.backgroundRepeat = "repeat-y";
        })
      })(i);
    }

    //function that removes styles on mouseout and click
    const removeStyles = () => {
      bg.removeAttribute("style");
      setbgImg(false)
    }

    // on mouseOut event: removes all styles 
    for (let i = 0; i < link.length; i++) {
      ((index) => {
        link[index].addEventListener("mouseout", removeStyles, false);
      })(i);
    }

    // on click event: removes all styles
    for (let i = 0; i < link.length; i++) {
      ((index) => {
        link[index].addEventListener("mouseup", removeStyles, false);
      })(i);
    }
  }

  return (
    <>
      <section className={styles.projectListSection}>
        <div className={`${styles.projectLinks}`}>
          {workPageData?.map((item, i) => (
            <Link href={workPageData[i].projectLink} key={i}>
              <a data-okimage={workPageData[i].hoverImage.url} className={bgImg ? `${styles.projectLink} ${styles.hoverColor} Link` : `${styles.projectLink} Link`} onMouseMove={handleMouseOver}>{workPageData[i].projectName}</a>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default ProjectList;