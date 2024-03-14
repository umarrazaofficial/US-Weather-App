import React, { useEffect } from 'react'
import Carousel from '../components/Carousel'
import Products from './Products'
import Sliders from '../components/Slider'
import { Link } from 'react-router-dom'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Home = () => {
    useEffect(() => {
        document.title = "US-Store";
    })
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
                <Products type='latest' />
            </div>
            <div style={{ margin: '10px 0px 100px 0px', display: 'flex', justifyContent: 'center' }}>
                <Link to={`/products`} style={{ textDecoration: 'none' }}>
                    <button className="btn btn-success btn-lg">
                        View All Products <ArrowCircleRightIcon style={{ fontSize: '30px' }} />
                    </button>
                </Link>
            </div>
        </>
    )
}

export default Home