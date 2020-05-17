import React,{useState} from "react";
import { Carousel } from 'react-responsive-carousel'
import {Picture} from "../../indexMain";
import "react-responsive-carousel/lib/styles/carousel.min.css"

const PollCarousel = ()=>{

    const [data,setData] = useState([{
        title:'title',
        link:'https://aospa.co/assets/wallpapers/2018/submerged_desktop_thumb.jpg'
    },{
        title:'title',
        link:'https://aospa.co/assets/wallpapers/2018/submerged_desktop_thumb.jpg'
    }]);


    const filmsInfo = ()=>{
        let arr = data.map((elem:Picture)=>{
            return(
                <div>
                    <h1>{elem.title}</h1>
                    <img src={elem.link} alt={elem.title}/>
                </div>
            )}
        );
        return arr
    };

    return (
        <Carousel autoPlay showThumbs={false} showStatus={false} infiniteLoop={true} className='container'>
            {filmsInfo()}
        </Carousel>
    );
};

export default PollCarousel