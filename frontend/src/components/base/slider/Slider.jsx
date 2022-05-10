import React, {useState} from 'react';


import axiosInstance from '../../../axios';


import './css/Slider.css';
import BtnSlider from './BtnSlider';


export default function Slider() {

    const baseUrl = 'http://127.0.0.1:8000';

    const [slideIndex, setSlideIndex] = useState(1);
    const [dataSlider, setDataSlider] = useState([]);


    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }


    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }
    window.addEventListener('load',() =>{
        axiosInstance.get('/galleries/')
        .then(res => {
            setDataSlider(res.data['galleries'])
        })
    });

    return (
        <div className="container-slider">
            {
                dataSlider.map((obj,i)=>{
                        return(
                            <div
                                key={obj.id}
                                className={slideIndex === i + 1 ? "slide active-anim" : "slide"}
                                >
                                    <img 
                                    src={baseUrl+`${obj.image}`} 
                                    />
                            </div>
                        )
                    
                })
            }
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: dataSlider.length}).map((item, index) => (
                    <div key={index}
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )

}