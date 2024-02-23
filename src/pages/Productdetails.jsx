import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addtoCart } from '../services/actions/actions';
import Loading from '../components/loading';
import { toast } from 'react-toastify';

const mapStateToProps = state => ({
    Data: state.cardItems
});
const mapDispatchToProps = dispatch => ({
    addtoCartHandler: data => dispatch(addtoCart(data))
});

const Productdetails = (props) => {
    const [loading, setLoading] = useState(true);
    const [countervalue, setCountervalue] = useState(1);
    const [itemexist, setItemexist] = useState(false)
    const { Id } = useParams();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        image: '',
        id: ''
    });
    let id = product.id;

    const itemExists = props.Data.some(item => item?.cardData._id === id);

    useEffect(() => {
        setItemexist(itemExists);
    }, [itemExists]);


    const [admin, setAdmin] = useState('');
    const auth = localStorage.getItem('user');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authObject = JSON.parse(auth);
                setAdmin(authObject.isAdmin)
                const response = await axios.get(`https://us-store-backend.vercel.app/api/getProduct/${Id}`);
                setProduct({
                    title: response.data.title,
                    description: response.data.description,
                    price: response.data.price,
                    image: response.data.image,
                    id: response.data._id
                })
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', margin: '93px 50px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                <img src={product?.image} style={{ width: '70%' }} />
            </div>
            {loading ?
                <Loading />
                :
                <>
                    <div style={{ width: '50%' }}>
                        <h2 class="card-title">{product?.title}</h2>
                        <br />
                        <h3 class="card-title">${product?.price}</h3>
                        <br />
                        <p class="card-text" style={{ lineHeight: '30px' }}>{product?.description}</p>
                        <br />
                        <div class="d-flex flex-row">
                            {countervalue == 1 ?
                                <button className="btn btn-sm disabled" style={{ fontSize: '20px', marginLeft: '5px' }} onClick={() => setCountervalue(countervalue - 1)}>
                                    -
                                </button> : <button className="btn btn-sm" style={{ fontSize: '20px', marginLeft: '5px' }} onClick={() => setCountervalue(countervalue - 1)}>
                                    -
                                </button>}

                            <span style={{ width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{countervalue}</span>

                            <button className="btn btn-sm" style={{ fontSize: '20px', marginLeft: '5px' }} onClick={() => setCountervalue(countervalue + 1)}>
                                +
                            </button>

                        </div>
                        <br />
                        {admin ? <a href="#" class="btn btn-secondary disabled" >Add to Cart</a> :
                            (
                                itemexist ? <a href="#" class="btn btn-secondary disabled" >Added to Cart</a> : < a href="#" class="btn btn-success" onClick={() => {
                                    props.addtoCartHandler({
                                        image: product.image,
                                        title: product.title,
                                        price: countervalue * product.price,
                                        description: product.description,
                                        _id: product.id,
                                        quantity: countervalue
                                    });
                                    toast(<div style={{ width: "200px", display: 'flex', flexDirection: 'column', color: 'black', fontFamily: 'poppins' }}>
                                        <div><img src={product?.image} width={150} /></div>
                                        <div>
                                            <h5 class="card-title">{product?.title}</h5>
                                            <br />
                                            <h4 class="card-title">${product?.price}</h4>
                                        </div>

                                    </div>,
                                        { autoClose: 2000, hideProgressBar: true, pauseOnHover: false });
                                }}>Add to Cart</a>
                            )
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Productdetails)