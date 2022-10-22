import React, {useEffect} from "react";
import Navigation from "../components/common/header/navigation";
import Footer from "../components/common/footer";
import Flash from "../components/common/flash";
import {commonPageTypes} from "../components/props/propTypes";

interface Types {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string;
    commonAssets: any;
    // commonAssets: commonPageTypes;
}

const Layout:React.FC<Types> = ({ children, bgImg, specificStyles, commonAssets }):JSX.Element =>{

    const LogoBlack = commonAssets.siteLogos[0].fields.file.url;
    const LogoWhite = commonAssets.siteLogos[1].fields.file.url;
    const FlashImages = commonAssets.flashAssets;

    const fetchCommonAssest = async () => {
         fetch('https://rickandmortyapi.com/graphql').then((res) => {
            if (res.ok) {
              console.log("success");
              return res.json();
            } else {
              throw res;
            }
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error)
          })
    }

    useEffect(()=>{
        fetchCommonAssest();
    },[]);

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