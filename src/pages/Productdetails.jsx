import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addtoCart } from '../services/actions/actions';
import Loading from '../components/loading';
import { toast } from 'react-toastify';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactStars from "react-rating-stars-component";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const mapStateToProps = state => ({
    Data: state.cardItems
});
const mapDispatchToProps = dispatch => ({
    addtoCartHandler: data => dispatch(addtoCart(data))
});

const Productdetails = (props) => {
    const { Id } = useParams();
    const [loading, setLoading] = useState(true);
    const [countervalue, setCountervalue] = useState(1);
    const [itemexist, setItemexist] = useState(false);
    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);
    const [previousratings, setPreviousratings] = useState([]);
    const [rating, setRating] = useState({
        ratings: 1,
        description: '',
        userId: '',
        productId: Id
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                const id = authObject._id;
                const user = await axios.get(`https://us-store-backend.vercel.app/api/getsingleaccount/${id}`);
                const previousratings = await axios.get(`https://us-store-backend.vercel.app/api/getProductrating/${Id}`);
                setPreviousratings(previousratings?.data);
                setUser(user.data);
                setRating({
                    ...rating,
                    userId: id
                })
                const response = await axios.get(`https://us-store-backend.vercel.app/api/getProduct/${Id}`);
                setProduct({
                    title: response.data.title,
                    description: response.data.description,
                    price: response.data.price,
                    image: response.data.image,
                    id: response.data._id
                })
                setLoading(false);
                document.title = "US-Store - Product Details";
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const ratingChanged = (newRating) => {
        setRating({ ...rating, ratings: newRating });
    };

    const submitRating = async () => {
        try {
            await axios.post('https://us-store-backend.vercel.app/api/addRating', rating);
            window.location.reload(true);
        }
        catch {
            console.log("Failed to post rating");
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://us-store-backend.vercel.app/api/deleteRating/${id}`);
            window.location.reload(true);
        } catch {
            console.log("Error Deleting Rating");
        }
    }

    return (
        <div>
            <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', margin: '93px 50px' }} className='product-details-section'>
                <div style={{ display: 'flex', justifyContent: 'center', width: '50%' }} className='product-details-div-1'>
                    <img src={product?.image} style={{ width: '70%' }} />
                </div>
                {loading ?
                    <Loading />
                    :
                    <>
                        <div style={{ width: '50%' }} className='product-details-div-2'>
                            <h2 className="card-title">{product?.title}</h2>
                            <br />
                            <h3 className="card-title">${product?.price}</h3>
                            <br />
                            <p className="card-text" style={{ lineHeight: '30px' }}>{product?.description}</p>
                            <br />
                            <div className="d-flex flex-row">
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
                            {admin ? <a href="#" className="btn btn-secondary disabled" >Add to Cart</a> :
                                (
                                    itemexist ? <a href="#" className="btn btn-secondary disabled" >Added to Cart</a> : < a href="#" className="btn btn-success" onClick={() => {
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
                                                <h5 className="card-title">{product?.title}</h5>
                                                <br />
                                                <h4 className="card-title">${product?.price}</h4>
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
            <div className="table-responsive" style={{ display: 'flex', alignItems: 'center', margin: '93px 50px' }}>
                <table className="table">
                    <thead>
                        <tr style={{ border: '0px' }}>
                            <th scope="col" className="h3" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", borderBottom: 0 }}>
                                <div style={{ display: 'flex' }}>
                                    Product Reviews {"   "} <h6 style={{ paddingTop: '10px', paddingLeft: '10px' }}>{previousratings?.length} reviews</h6>
                                </div>
                                <button
                                    className="form-control my-3 btn btn-success"
                                    style={{ width: "15%" }}
                                    onClick={handleOpen}
                                >
                                    <CreateIcon style={{ fontSize: 22, marginRight: '10px' }} />
                                    Write a Review
                                </button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontFamily: 'Poppins', display: 'flex', justifyContent: 'center' }}>
                                            US-Store
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Poppins' }}>
                                            <div style={{ display: 'flex', gap: '20px', alignItems: "center" }}>
                                                <div><AccountCircleIcon style={{ fontSize: "50px" }} /></div>
                                                <div style={{ lineHeight: 0.5 }}>
                                                    <h6> {user?.name && user?.name} </h6>
                                                    <div style={{ fontSize: '14px' }}> Review will be visible publicly</div>
                                                </div>
                                            </div>
                                        </Typography>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={40}
                                                value={1}
                                                isHalf={false}
                                                emptyIcon={<i className="far fa-star"></i>}
                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                fullIcon={<i className="fa fa-star"></i>}
                                                activeColor="#FABB0A"
                                            />
                                        </div>
                                        <textarea placeholder='Share your experience with this product' required style={{ width: '100%', height: '80px', marginTop: '25px' }}
                                            onChange={(e) => {
                                                setRating({ ...rating, description: e.target.value });
                                            }} />

                                        <Link

                                            onClick={submitRating}
                                            className="btn btn-success"
                                            style={{ marginTop: '40px' }}
                                        >
                                            Post Review
                                        </Link>
                                    </Box>
                                </Modal>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {previousratings?.length > 0 ? (
                            previousratings.map((data, index) => (
                                <div className="card shadow-2-strong" style={{ borderRadius: '16px', margin: '20px 0px' }} key={index}>
                                    <div className="card-body p-4">
                                        <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className="col-md-6 col-lg-6 col-xl-6">
                                                <div className="row" style={{ gap: '20px' }}>
                                                    <div style={{ display: 'flex', gap: '20px', alignItems: "center" }}>
                                                        <div><AccountCircleIcon style={{ fontSize: "50px" }} /></div>
                                                        <div style={{ lineHeight: 0.5 }}>
                                                            <h6>{data?.userId?.name && data?.userId?.name}</h6>
                                                        </div>
                                                    </div>
                                                    <div style={{ paddingLeft: '80px' }}>
                                                        <p>{data?.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-xl-4">
                                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <ReactStars
                                                        count={5}
                                                        size={40}
                                                        value={data?.ratings}
                                                        isHalf={false}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#FABB0A"
                                                        edit={false}
                                                    />
                                                </div>
                                                {data?.userId?._id === user?._id ? (
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '10px' }}>
                                                        <button className="btn btn-danger ms-2" onClick={() => handleDelete(data?._id)}>
                                                            <DeleteIcon style={{ fontSize: 22, paddingRight: '3px' }} />
                                                            Remove
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}><h5>No reviews found</h5></div>
                        )}

                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Productdetails)