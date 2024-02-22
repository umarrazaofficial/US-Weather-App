import axios from 'axios';
import { button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Productslist = () => {
    const { Id } = useParams();
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://us-store-backend.vercel.app/api/getProducts')
            .then(response => {
                setProducts(response.data);
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
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingTop: '50px', paddingBottom: '50px', gap: '30px' }}>
                {products?.map((product, index) => (
                    <div class="card" style={{ width: '22rem' }} key={index}>
                        <img class="card-img-top" style={{ height: '15rem' }} src={product.image} alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">{product.title}</h5>
                            <h6 class="card-title">${product.price}</h6>
                            <p class="card-text">{product.description}</p>
                            <Link to={
                                `/editProduct/${product._id}`
                            } class="btn btn-success" style={{ marginRight: '5px' }}>Edit Product</Link>
                            <button class="btn btn-danger" onClick={() => {
                                deleteProduct(product._id)
                            }}>Delete Product</button>
                        </div>
                    </div>

                )
                )}
            </div>
        </div>

    )
}

export default Productslist