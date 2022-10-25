import React, { useEffect, useState } from "react";
import Navigation from "../components/common/header/navigation";
import Footer from "../components/common/footer";
import Flash from "../components/common/flash";
import apolloClient from '../pages/api/apollo-client';
import { commonPageTypes } from "../components/props/propTypes";
import { commonQuery } from '../pages/api/queries';

interface Types {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string;
    commonAssets: any;
}

const Layout:React.FC<Types> = ({ children, bgImg, specificStyles, commonAssets }):JSX.Element =>{

    const [commonData, setCommonData] = useState<commonPageTypes>();

    // const LogoBlack = commonData.siteLogosCollection.items[0].url;
    // const LogoWhite = commonData.siteLogosCollection.items[0].url[1];
    // const FlashImages = commonData.flashAssetsCollection;

    useEffect(()=>{
        fetchCommonAssets();
    },[]);

    const fetchCommonAssets = async () => {
        try {
          const { data } = await apolloClient.query({
            query: commonQuery,
          });
        setCommonData(data.commonAssetsCollection.items[0].url);
        
        console.log(commonData.siteLogosCollection);

        // const LogoBlack = commonData.siteLogosCollection.items[0].url;
        // const LogoWhite = commonData.siteLogosCollection.items[1].url;
        // const FlashImages = commonData.flashAssetsCollection;
        
        } catch (error) {
          console.log({error});
        }
      };

      const LogoBlack = commonAssets.siteLogos[0].fields.file.url;
      const LogoWhite = commonAssets.siteLogos[1].fields.file.url;
      const FlashImages = commonAssets.flashAssets;

      //  const LogoBlack = commonData.siteLogosCollection.items[0].url;
      // const LogoWhite = commonData.siteLogosCollection.items[1].url;
      // const FlashImages = commonData.flashAssetsCollection;

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