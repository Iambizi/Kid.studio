import Navigation from "../components/common/header/navigation";
import Footer from "../components/common/footer";
import Flash from "../components/common/flash";
import React from "react";

interface Types {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string;
    commonAssets: any;
}

const Layout:React.FC<Types> = ({ children, bgImg, specificStyles, commonAssets }):JSX.Element =>{

    const LogoBlack = commonAssets.siteLogos[0].fields.file.url;
    const LogoWhite = commonAssets.siteLogos[1].fields.file.url;
    const FlashImages = commonAssets.flashAssets;

    return(
        <>
            <Navigation LogoBlack={LogoBlack} LogoWhite={LogoWhite} bgImg={bgImg} />
            <Flash FlashImages={FlashImages} />
                { children }
            <Footer bgImg={bgImg} specificStyles={specificStyles} />
        </>
    );
}

export default Layout;