import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from "../components/loading"


const Products = () => {
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://us-store-backend.vercel.app/api/getProducts')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [])
    return (
        <div style={{ minHeight: '541px' }}>
            {loading ?
                <Loading />
                :
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingTop: '50px', paddingBottom: '50px', gap: '30px' }}>
                    {products?.map((product, index) => (
                        <Link to={
                            `/productDetails/${product._id}`} style={{ textDecoration: 'none' }} key={index}>
                            <>
                                <div class="card" style={{ width: '22rem' }}>
                                    <img class="card-img-top" src={product.image} style={{ height: '15rem', overflow: 'hidden' }} alt="Card image cap" />
                                    <div class="card-body">
                                        <h5 class="card-title">{product?.title?.length > 30 ? product?.title.substr(0, 25) + '...' : product?.title}</h5>
                                        <h6 class="card-title">${product?.price}</h6>
                                        <p class="card-text">{product?.description?.length > 100 ? product?.description.substr(0, 90) + ' ... ' : product.description}</p>
                                        <a href="#" class="btn btn-success" >View Details</a>
                                    </div>
                                </div>
                            </>
                        </Link>
                    )
                    )}
                </div>

            }

        </div >

    )
}

export default Products