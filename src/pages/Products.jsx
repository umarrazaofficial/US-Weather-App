import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from "../components/loading"


const Products = ({ type }) => {
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
                (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingTop: '50px', paddingBottom: '50px', gap: '30px' }}>
                        {type === 'latest' ? (
                            products?.slice(-3).map((product, index) => (
                                <Link to={`/productDetails/${product._id}`} style={{ textDecoration: 'none' }} key={index}>
                                    <div className="card" style={{ width: '24rem' }}>
                                        <img className="card-img-top" src={product.image} style={{ height: '15rem', overflow: 'hidden' }} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product?.title?.length > 30 ? product?.title.substr(0, 25) + '...' : product?.title}</h5>
                                            <h6 className="card-title">${product?.price}</h6>
                                            <p className="card-text">{product?.description?.length > 100 ? product?.description.substr(0, 90) + ' ... ' : product.description}</p>
                                            <button className="btn btn-success">View Details</button>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            products?.map((product, index) => (
                                <Link to={`/productDetails/${product._id}`} style={{ textDecoration: 'none' }} key={index}>
                                    <div className="card" style={{ width: '24rem' }}>
                                        <img className="card-img-top" src={product.image} style={{ height: '15rem', overflow: 'hidden' }} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product?.title?.length > 30 ? product?.title.substr(0, 25) + '...' : product?.title}</h5>
                                            <h6 className="card-title">${product?.price}</h6>
                                            <p className="card-text">{product?.description?.length > 100 ? product?.description.substr(0, 90) + ' ... ' : product.description}</p>
                                            <button className="btn btn-success">View Details</button>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
        </div>

    )
}

export default Products