import Navigation from "../components/common/header/navigation"
import Footer from "../components/common/footer";


export default function layout({children}:{children: React.ReactNode}):JSX.Element{
    return(
        <>
            <Navigation />
                {children}
            <Footer />
        </>
    );
}