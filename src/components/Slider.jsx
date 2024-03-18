import React from 'react';
import Slider from "react-slick";
import Html from "../assets/html.png";
import Css from "../assets/css.png";
import Bootstrap from "../assets/bootstrap.png";
import Js from "../assets/javascript.webp";
import Reactjs from "../assets/reactjs.webp";
import Mongo from "../assets/mongodb.png";
import Node from "../assets/nodejs.webp";
import "../App.css";

const Sliders = () => {
    const settings = {
        className: "logo-slider center",
        centerMode: true,
        dots: false,
        slidesToScroll: 1,
        centerPadding: "60px",
        slidesToShow: 4,
        autoplay: true,
        speed: 3000,
        pauseOnHover: false,
        autoplaySpeed: 3000,
        cssEase: "customEase",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <img src={Html} />
                </div>
                <div>
                    <img src={Css} />
                </div>
                <div>
                    <img src={Bootstrap} />
                </div>
                <div>
                    <img src={Js} />
                </div>
                <div>
                    <img src={Reactjs} />
                </div>
                <div>
                    <img src={Mongo} />
                </div>
                <div>
                    <img src={Node} />
                </div>
                <div>
                    <img src={Html} />
                </div>
                <div>
                    <img src={Css} />
                </div>
                <div>
                    <img src={Bootstrap} />
                </div>
                <div>
                    <img src={Js} />
                </div>
                <div>
                    <img src={Reactjs} />
                </div>
                <div>
                    <img src={Mongo} />
                </div>
                <div>
                    <img src={Node} />
                </div>
            </Slider>
        </div>
    )
}

export default Sliders