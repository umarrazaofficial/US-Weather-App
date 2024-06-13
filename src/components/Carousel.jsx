import React from 'react';
import Banner from "../assets/banner.jpg";

const Carousel = () => {
    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Banner} className="d-block w-100" alt="..." />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carousel