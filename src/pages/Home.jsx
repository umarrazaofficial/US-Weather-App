import React, { useEffect } from 'react';
import ReviewSlider from "../components/reviewsSlider";

const Home = () => {
    useEffect(() => {
        document.title = "US-Weather-App";
    })
    return (
        <>
            <ReviewSlider />
        </>
    )
}

export default Home