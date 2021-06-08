import Link from "next/link";
import styles from "../../styles/scss/workPage/_work.module.scss";

export default function work(){
    

    const projectList = [
        {
            projectTitle: "BRYSON TILLER 'ALWAYS FOREVER'",
            projectPath: "/bryson-tiller-always-forever",
            hoverImage: "/bryson-tiller-always-forever/alwaysforever.gif"
        },
        {
            projectTitle: "BIG SEAN 'WOLVES' FT. POST MALONE",
            projectPath: "/wolves",
            hoverImage: "/wolves/wolves.gif"
        },
        {
            projectTitle: "MUSTAFA 'AIR FROCES'",
            projectPath: "/mustafa-air-forces",
            hoverImage: "/mustafa-air-forces/airforces.gif"
        },
        {
            projectTitle: "DISCLOSURE 'ENERGY'",
            projectPath: "/disclosure-energy",
            hoverImage: "/disclosure-energy/energy.gif"
        },
        {
            projectTitle: "DISCLOSURE 'BIRTHDAY' FT.KEHLANI & SYD",
            projectPath: "/disclosure-birthday",
            hoverImage: "/disclosure-birthday/birthday.gif"
        },
        {
            projectTitle: "DISCLOSURE WATCH YOUR STEP FT. KELIS",
            projectPath: "/disclosure-wys",
            hoverImage: "/disclosure-wys/wys.gif"
        },
        {
            projectTitle: "THE WEEKEND 'KING OF THE FALL",
            projectPath: "/king-of-the-fall",
            hoverImage: "/king-of-the-fall/featured1.png"
        },
        {
            projectTitle: "THE WEEKEND 'REMINDER'",
            projectPath: "/reminder",
            hoverImage: "/reminder/reminder.gif"
        },
        {
            projectTitle: "FRENCH MONTANA FT. DRAKE 'NO STYLIST'",
            projectPath: "/no-stylist",
            hoverImage: "/no-stylist/stylist.gif"
        },
        {
            projectTitle: "BIG SEAN 'BOUNCE BACK'",
            projectPath: "/bounce-back",
            hoverImage: "/bounce-back/bb.gif"
        },
        {
            projectTitle: "FUTURE FT. THE WEEKEND 'COMIN OUT STRONG'",
            projectPath: "/cos",
            hoverImage: "/cos/cos.gif"
        },
        {
            projectTitle: "HARD TO KILL 'SLIME'",
            projectPath: "/slime",
            hoverImage: "/slime/htk.gif"
        },
        {
            projectTitle: "NIKE REACT HYPERDUNK (CAMPAIGN DIRECTION)",
            projectPath: "/nikereact",
            hoverImage: "/nikereact/nike.gif"
        },
        {
            projectTitle: "CYBER69 X NOWNESS (SHORT)",
            projectPath: "/cyber69",
            hoverImage: "/cyber69/cyber.gif"
        },
        {
            projectTitle: "NIKE AF1 X SAINTWOODS",
            projectPath: "/nike-af1-x-saintwoods",
            hoverImage: "/nike-af1-x-saintwoods/hover-img.png"
        },
        {
            projectTitle: "RIFF CANABIS (SHORT)",
            projectPath: "/riff",
            hoverImage: "/riff/hover.gif"
        },
        {
            projectTitle: "GOD BLESS TORONTO (COMPILATION)",
            projectPath: "/god-bless-toronto",
            hoverImage: "/god-bless-toronto/gbt-bmp.jpg"
        },
        {
            projectTitle: "PIQUE",
            projectPath: "/pique",
            hoverImage: "/pique/pique-bmp.gif"
        }
    ]
    return(
        <>
            <section className={styles.projectListSection}>
                <div className={styles.projectLinks}>
                    {projectList.map((item, i)=>(
                            <Link href={ "http://kidstudio.co/work" + item.projectPath } key={i}>
                                <a data-okimage={ "http://kidstudio.co/work" + item.hoverImage } className={styles.projectLink}>{item.projectTitle}</a>
                            </Link>
                    ))}
                </div>
            </section>
        </>
    )
}