import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addtoCart } from '../services/actions/actions';
import Loading from '../components/loading';
import { toast } from 'react-toastify';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
                const previousratings = await axios.get(`https://us-store-backend.vercel.app/api/getRating`);
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

    console.log(previousratings)

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
            <div className="table-responsive" style={{ display: 'flex', alignItems: 'center', margin: '93px 50px' }}>
                <table className="table">
                    <thead>
                        <th scope="col" className="h3" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                            Product Reviews
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
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <textarea placeholder='Share your experience with this product' style={{ width: '100%', height: '80px', marginTop: '25px' }}
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
                    </thead>
                    <tbody>
                        {previousratings?.map((data, index) => (
                            <div className="card shadow-2-strong" style={{ borderRadius: '16px', margin: '20px 0px' }} key={index}>
                                <div className="card-body p-4">

                                    <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="col-md-6 col-lg-6 col-xl-6">
                                            <div className="row">
                                                <div style={{ display: 'flex', gap: '20px', alignItems: "center" }}>
                                                    <div><AccountCircleIcon style={{ fontSize: "50px" }} /></div>
                                                    <div style={{ lineHeight: 0.5 }}>
                                                        <h6> {data?.userId?.name && data?.userId?.name} </h6>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-xl-6">
                                                    <ReactStars
                                                        count={5}
                                                        size={40}
                                                        value={data?.ratings}
                                                        isHalf={false}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#ffd700"
                                                        edit={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="col-lg-6 col-xl-4">
                                                <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                    <p className="mb-2">Subtotal</p>
                                                    <p className="mb-2">${totalPrice}</p>
                                                </div>

                                                <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                    <p className="mb-0">Shipping</p>
                                                    <p className="mb-0">$0.00</p>
                                                </div>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-4" style={{ fontWeight: 500 }}>
                                                    <p className="mb-2">Total (tax included)</p>
                                                    <p className="mb-2">${totalPrice}</p>
                                                </div>

                                            </div> */}
                                    </div>
                                </div>
                            </div>

                        )
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Productdetails)