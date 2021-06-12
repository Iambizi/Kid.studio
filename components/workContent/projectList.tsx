import Link from "next/link";
import styles from "../../styles/scss/workPage/_work.module.scss";

interface Type{
    bgImg: boolean;
    setbgImg: any;
    projects: any;
}

export default function work( {bgImg, setbgImg, projects}:Type ){
    // rewrote okHover plugin mouse over functionality
    const handleMouseOver = (e) => {
        const bg = document.body;
        const okGif= e.target.getAttribute('data-okimage');
        const link = document.getElementsByClassName("Link");

        setbgImg(true)
        
        bg.style.backgroundImage = `url(${okGif})`;

        // Because link constant returns htmlCollection, we need to iterate through using a for loop to make changes
        {
            /*
                for loop for function on mousemove event
                adds: 
                backgroundPosition
                z-index
            */
       }

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