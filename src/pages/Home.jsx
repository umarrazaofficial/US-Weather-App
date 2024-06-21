import React, { useEffect } from 'react';
import ReviewSlider from "../components/reviewsSlider";
import Weather from '../components/Weather';

const Home = () => {
    useEffect(() => {
        document.title = "US-Weather-App";
    })
    return (
        <>
            <Weather />
            <ReviewSlider />
        </>
    )
}

export default Home