// When Hamburger Menu opened, this handler function allows click outside the menu to close it.
import { useEffect, useState } from 'react';

export const CheckLocation = () => {
    const [path, setPath] = useState(window.location.pathname);
    
    useEffect(() => {
        const listenToPopstate = () => {
            const winPath = window.location.pathname;
            setPath(winPath);
          };
        window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
    },[]);
    return path;
};