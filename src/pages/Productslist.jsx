import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/loading';

const Productslist = () => {
    const [loading, setLoading] = useState(true);
    const { Id } = useParams();
    const [products, setProducts] = useState([])
    useEffect(() => {
        document.title = "US-Store - Products List";
        axios.get('https://us-store-backend.vercel.app/api/getProducts')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const deleteProduct = (id) => {
        try {
            axios.delete(`https://us-store-backend.vercel.app/api/deleteProduct/${id}`);
            toast.success('Image Deleted Successfully. Please Refresh the Page!')
        } catch {
            toast.error('Error Deleting Image!!!')
        }
    }
    return (
        <div style={{ minHeight: '541px' }}>
            {loading ?
                <Loading />
                :
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingTop: '50px', paddingBottom: '50px', gap: '30px' }}>
                    {products?.map((product, index) => (
                        <div className="card" style={{ width: '22rem' }} key={index}>
                            <img className="card-img-top" style={{ height: '15rem' }} src={product.image} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <h6 className="card-title">${product.price}</h6>
                                <p className="card-text">{product.description}</p>
                                <Link to={
                                    `/editProduct/${product._id}`
                                } className="btn btn-success" style={{ marginRight: '5px' }}>Edit Product</Link>
                                <button className="btn btn-danger" onClick={() => {
                                    deleteProduct(product._id)
                                }}>Delete Product</button>
                            </div>
                        </div>

                    )
                    )}
                </div>
            }

        </div>

    )
}

export default Productslist