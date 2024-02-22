import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const mapStateToProps = state => ({
    Data: state.cardItems
});

const Checkout = (props) => {
    const navigate = useNavigate();
    const cart = props.Data;
    let totalPrice = 0

    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phone: '',
        products: [{
            productId: '',
            quantity: '',
        }],
    });

    useEffect(() => {
        if (cart && cart.length > 0) {
            const updatedProducts = cart.map((product) => ({
                productId: product?.cardData?._id,
                quantity: product?.cardData?.quantity,
            }));

            setDetails((details) => ({
                ...details,
                products: updatedProducts,
            }));
        }
    }, [cart]);

    for (let index = 0; index < cart.length; index++) {
        let price = 0;
        price = cart[index]?.cardData?.price;
        totalPrice += price;
    }


    const handlesubmit = (e) => {
        e.preventDefault();
        if (Object.values(details).some((value) => value === '')) {
            alert('Please fill in all the fields.');
        } else {
            try {
                axios.post('http://localhost:8000/api/addOrder', details)
                console.log('Form submitted:', details);
                navigate('/thankyou');
            } catch {
                toast.error('Failed to Complete Order')
            }
        }
    }
    console.log(details)
    return (
        <div style={{ marginTop: '50px' }}>
            <form style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }} onSubmit={handlesubmit}>
                <div class="col-md-6 mb-4">
                    <div class="card mb-4">
                        <div class="card-header py-3">
                            <h5 class="mb-0">Biling details</h5>
                        </div>
                        <div class="card-body">
                            <form>

                                <div class="row mb-4">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label" for="form7Example1">First name</label>
                                            <input type="text" id="form7Example1" class="form-control" required placeholder='John' onChange={(e) => setDetails({ ...details, firstName: e.target.value })} />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label" for="form7Example2">Last name</label>
                                            <input type="text" id="form7Example2" class="form-control" required placeholder='Harrison' onChange={(e) => setDetails({ ...details, lastName: e.target.value })} />
                                        </div>
                                    </div>
                                </div>


                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form7Example4">Address</label>
                                    <input type="text" id="form7Example4" class="form-control" required placeholder='8400 Bustleton Ave' onChange={(e) => setDetails({ ...details, address: e.target.value })} />
                                </div>


                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form7Example5">Email</label>
                                    <input type="email" id="form7Example5" class="form-control" required placeholder='johnharrison@gmail.com' onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                                </div>


                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form7Example6">Phone</label>
                                    <input type="number" id="form7Example6" class="form-control" required placeholder='123-456-789' onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-4">
                    <div class="card mb-4">
                        <div class="card-header py-3">
                            <h5 class="mb-0">Summary</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                {cart?.map((product, index) => (
                                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0" key={index}>
                                        {product?.cardData?.title?.length > 16 ? product?.cardData?.title.substr(0, 16) + '...' : product?.cardData?.title}
                                        <span>${product?.cardData?.price}</span>
                                    </li>
                                ))}

                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span>$0.00</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>Total amount</strong>
                                        <strong>
                                            <p class="mb-0">(including VAT)</p>
                                        </strong>
                                    </div>
                                    <span><strong>${totalPrice}</strong></span>
                                </li>
                            </ul>

                            <button type="submit" class="btn btn-success btn-block">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default connect(mapStateToProps)(Checkout)