import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";
import axios from 'axios';

const Reviewsslider = () => {
    const [previousratings, setPreviousratings] = useState([]);
    const [rating, setRating] = useState(4);

    const settings = {
        className: "review-slider",
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 1000,
        pauseOnHover: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 840,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const previousratings = await axios.get(`https://us-store-backend.vercel.app/api/getRating`);
                setPreviousratings(previousratings?.data);
                let totalRatings = 0;

                for (let index = 0; index < previousratings?.data.length; index++) {
                    let rating = 0;
                    rating = parseInt(previousratings?.data[index]?.ratings);
                    if (!isNaN(rating)) {
                        totalRatings += rating;
                    }
                }

                setRating(totalRatings / previousratings?.data?.length);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);


    return (
        <section style={{ color: "#fff" }}>
            <div class="container py-5">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-10 col-xl-8 text-center">
                        <h3 class="fw-bold mb-4 heading">Testimonials</h3>
                    </div>
                    <div class="col-md-10 col-xl-8 text-center">
                        <h5 class="mb-2">US-Weather-App</h5>
                    </div>

                </div>
                <div style={{ width: '100%', overflow: "hidden", textAlign: 'center' }}>
                    <Slider {...settings}>
                        <div class="card">
                            <div class="card-body py-4 mt-2">
                                <div class="d-flex justify-content-center mb-4">
                                    <div style={{ width: '80px', height: '80px', backgroundColor: '#007bff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold' }}>
                                        T
                                    </div>
                                </div>
                                <h5 class="font-weight-bold">Teresa May</h5>
                                <ul class="list-unstyled d-flex justify-content-center">
                                    <ReactStars
                                        count={5}
                                        size={30}
                                        value={5}
                                        isHalf={false}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#FABB0A"
                                        edit={false}
                                    />
                                </ul>
                                <p class="mb-2">
                                    <i class="fas fa-quote-left pe-2"></i>Absolutely thrilled with my purchase from US-Weather-App! The quality of the products surpassed my expectations, and the customer service was exceptional. Will definitely be shopping here again!
                                </p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body py-4 mt-2">
                                <div class="d-flex justify-content-center mb-4">
                                    <div style={{ width: '80px', height: '80px', backgroundColor: '#FF5722', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold' }}>
                                        M
                                    </div>
                                </div>
                                <h5 class="font-weight-bold">Maggie McLoan</h5>
                                <ul class="list-unstyled d-flex justify-content-center">
                                    <ReactStars
                                        count={5}
                                        size={30}
                                        value={5}
                                        isHalf={false}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#FABB0A"
                                        edit={false}
                                    />
                                </ul>
                                <p class="mb-2">
                                    <i class="fas fa-quote-left pe-2"></i>US-Weather-App has become my go-to for all things fashion. Not only do they offer a wide selection of trendy items, but their delivery is always prompt, and the items arrive exactly as described. Highly recommend!
                                </p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body py-4 mt-2">
                                <div class="d-flex justify-content-center mb-4">
                                    <div style={{ width: '80px', height: '80px', backgroundColor: '#512DA8', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold' }}>
                                        J
                                    </div>
                                </div>
                                <h5 class="font-weight-bold">Jessica M</h5>
                                <ul class="list-unstyled d-flex justify-content-center">
                                    <ReactStars
                                        count={5}
                                        size={30}
                                        value={5}
                                        isHalf={false}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#FABB0A"
                                        edit={false}
                                    />
                                </ul>
                                <p class="mb-2">
                                    <i class="fas fa-quote-left pe-2"></i>As a busy mom, I appreciate how convenient it is to shop at US-Weather-App. Their mobile app makes browsing and purchasing a breeze, and I love that I can trust the quality of their products. Shopping here has simplified my life!
                                </p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body py-4 mt-2">
                                <div class="d-flex justify-content-center mb-4">
                                    <div style={{ width: '80px', height: '80px', backgroundColor: '#388E3C', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold' }}>
                                        A
                                    </div>
                                </div>
                                <h5 class="font-weight-bold">Alexa Horwitz</h5>
                                <ul class="list-unstyled d-flex justify-content-center">
                                    <ReactStars
                                        count={5}
                                        size={30}
                                        value={5}
                                        isHalf={false}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#FABB0A"
                                        edit={false}
                                    />
                                </ul>
                                <p class="mb-2">
                                    <i class="fas fa-quote-left pe-2"></i>I'm constantly amazed by the variety of products available at US-Weather-App. From everyday essentials to unique finds, they have it all. Plus, their sales and promotions make shopping even more enjoyable. Keep up the great work!
                                </p>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Reviewsslider