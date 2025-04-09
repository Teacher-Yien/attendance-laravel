import { ImgHTMLAttributes } from 'react';  

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {  
    return (  
        <img   
            {...props}   
            className=''   
            src="image/rupp_logo.png"   
            alt=""   
        />  
    );  
}  