import React from "react";
import Navigation from "../components/common/header/navigation";
import Footer from "../components/common/footer";
import Flash from "../components/common/flash";
import { commonPageTypes } from "../components/props/propTypes";

interface Types {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string;
    // commonData: commonPageTypes;
    commonData: any;
}

const Layout:React.FC<Types> = ({ children, bgImg, specificStyles, commonData }):JSX.Element =>{

    const LogoBlack = commonData.siteLogosCollection?.items[0].url;
    const LogoWhite = commonData.siteLogosCollection?.items[1].url;
    const FlashImages = commonData.flashAssetsCollection.items;

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