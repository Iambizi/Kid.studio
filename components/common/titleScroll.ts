import { useRef, useEffect } from "react";
import { isMobile } from 'react-device-detect';

const ShiftScroll = () => {
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
                
            } , 170);
        }else{
            return null;
        }
    }
    
    useEffect(()=>{
        window.addEventListener('scroll', ShiftedScroll);
    },[]);
};

export default ShiftScroll;

