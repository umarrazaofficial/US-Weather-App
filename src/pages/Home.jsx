import React from 'react'
import Carousel from '../components/Carousel'
import Products from './Products'

const Home = () => {
    return (
        <>
            <Carousel />
            <div style={{ marginTop: '50px', position: 'relative' }}>
                <Products />
            </div>
        </>
    )
}

export default Home