import React from 'react';
import Slider from "react-slick";
import Html from "../assets/html.png";
import Css from "../assets/css.png";
import Bootstrap from "../assets/bootstrap.png";
import Js from "../assets/javascript.webp";
import Reactjs from "../assets/reactjs.webp";
import Mongo from "../assets/mongodb.png";
import Node from "../assets/nodejs.webp";

const Sliders = () => {
    const settings = {
        className: "center",
        centerMode: true,
        dots: false,
        infinite: true,
        slidesToScroll: 5,
        centerPadding: "60px",
        slidesToShow: 4,
        autoplay: true,
        speed: 3000,
        pauseOnHover: false,
        autoplaySpeed: 300,
        cssEase: "linear",
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <img src={Html} style={{ height: '140px', width: '140px' }} />
                </div>
                <div>
                    <img src={Css} style={{ height: '140px', width: '140px' }} />
                </div>
                <div>
                    <img src={Bootstrap} style={{ height: '140px', width: '140px' }} />
                </div>
                <div>
                    <img src={Js} style={{ height: '140px', width: '140px' }} />
                </div>
                <div>
                    <img src={Reactjs} style={{ height: '140px', width: '140px' }} />
                </div>
                <div>
                    <img src={Mongo} style={{ height: '140px', width: '140px' }} />
                </div>
                <div>
                    <img src={Node} style={{ height: '140px', width: '140px' }} />
                </div>
            </Slider>
        </div>
    )
}

export default Sliders