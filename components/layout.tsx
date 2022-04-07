import Navigation from "../components/common/header/navigation";
import Footer from "../components/common/footer";
import Flash from "../components/common/flash";
import React from "react";

interface Type {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string;
    commonAssets: any;
}

export default function Layout( { children, bgImg, specificStyles, commonAssets }:Type ):JSX.Element{

    const LogoBlack = commonAssets.siteLogos[0].fields.file.url;
    const LogoWhite = commonAssets.siteLogos[1].fields.file.url;
    const FlashImages = '';

    return(
        <>
            <Navigation LogoBlack={LogoBlack} LogoWhite={LogoWhite} bgImg={bgImg} />
            <Flash />
                { children }
            <Footer bgImg={bgImg} specificStyles={specificStyles} />
        </>
    );
}
