import { useRef, useEffect } from "react";
import { isMobile } from 'react-device-detect';

export const ShiftScroll = () => {
    const ref = useRef<HTMLElement | any>(null!);
        
    const ShiftedScroll = () => {
            
        let pageY = window.pageYOffset;
        let transY = 0;
        let diff = 0;
        if(!isMobile && ref && ref.current){
            setTimeout(()=>{
                if(diff= pageY - transY){
                    transY += 2 * diff
                }
                    ref.current.style.transform = `translateY(${pageY * -0.1}px)`;
                
            } , 300);
        }else{
            return null;
        }
        console.log('im here and im shifting');
    }
    useEffect(()=>{
        window.addEventListener('scroll', ShiftedScroll);
    },[]);
    console.log('im here');
}

