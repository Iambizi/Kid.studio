import Link from "next/link";
import styles from "../../styles/scss/workPage/_work.module.scss";
import React, { useEffect } from "react";
import { isMobile } from 'react-device-detect';

interface Type {
  bgImg: boolean;
  setbgImg: any;
  projectList: any;
}

const ProjectList = ({ bgImg, setbgImg, projectList }: Type): JSX.Element => {

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

  // removes needsScroll class set in project pages from vertical scroll
  // projectPage useEffect hook needs refactoring to avoid calling it again here.
  useEffect(() => {
    const bg = document.body;
    // bg.classList.remove("needsScroll");
  }, []);

  return (
    <>
      <section className={styles.projectListSection}>
        <div className={`${styles.projectLinks}`}>
          {projectList?.map((item, i) => (
            <Link href={item.fields.projectLink} key={i}>
              <a data-okimage={item.fields.hoverImage.fields.file.url} className={bgImg ? `${styles.projectLink} ${styles.hoverColor} Link` : `${styles.projectLink} Link`} onMouseMove={handleMouseOver}>{item.fields.projectName}</a>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default ProjectList;