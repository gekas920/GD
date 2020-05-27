import React, {useEffect, useState} from "react";
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {PropsCarousel} from "./indexCarousel";

export const PollCarousel:React.FC<PropsCarousel> = (props)=>{

    const [data,setData] = useState(['']);

    useEffect(()=>{
        setData(props.images)
    },[props]);

    const filmsInfo = ()=>{
        let arr = data.map((elem:string,index)=>{
            return(
                <div key={index}>
                    <img src={elem} alt='img' style={{
                        width:'auto'
                    }}/>
                </div>
            )}
        );
        return arr
    };

    return (
        <Carousel autoPlay showThumbs={false} showStatus={false} infiniteLoop={true} className='container'>
            {props.images && filmsInfo()}
        </Carousel>
    );
};

