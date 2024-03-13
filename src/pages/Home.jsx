import React from 'react'
import Carousel from '../components/Carousel'
import Products from './Products'
import Sliders from '../components/Slider'

const Home = () => {
    return (
        <>
            <Carousel />
            <div style={{ marginTop: '70px', marginBottom: '70px' }}>
                <Sliders />
            </div>
            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
                <h1 className='heading'>Latest Products:</h1>
            </div>
            <div style={{ marginTop: '20px', position: 'relative' }}>
                <Products />
            </div>
        </>
    )
}

export default Home