import React, { useState } from 'react'
import { connect } from 'react-redux';
import cardItems from "../services/reducers/reducers";
import CancelIcon from '@mui/icons-material/Cancel';
import { removefromCart } from '../services/actions/actions';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
    Data: state.cardItems
});
const mapDispatchToProps = dispatch => ({
    removefromCartHandler: data => dispatch(removefromCart(data))
});

const Cart = (props) => {
    const cart = props.Data;
    let totalPrice = 0
    for (let index = 0; index < cart.length; index++) {
        let price = 0;
        price = cart[index]?.cardData?.price;
        totalPrice += price;
    }

    return (
        <>
            <section class="h-100 h-custom" style={{ minHeight: '540px' }}>
                <div class="container h-100 py-5">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col">

                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="h5">Shopping Bag</th>
                                            <th scope="col" >Quantity</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart?.map((data, index) => (
                                            <tr key={index}>
                                                <th scope="row" class="border-bottom-0" >
                                                    <div class="d-flex align-items-center">
                                                        <img src={data?.cardData?.image} class="img-fluid rounded-3"
                                                            style={{ width: " 120px" }} alt="Book" />
                                                        <div class="flex-column ms-4">
                                                            <p class="mb-2">{data?.cardData?.title}</p>
                                                            <p class="mb-0">{data?.cardData?.description.length > 20 ? data?.cardData?.description.substr(0, 17) + "..." : data?.cardData?.description}</p>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td class="align-middle border-bottom-0">
                                                    <p class="mb-0" style={{ fontWeight: '500', marginLeft: '20px' }}>{data?.cardData?.quantity}</p>
                                                </td>
                                                <td class="align-middle border-bottom-0">
                                                    <p class="mb-0" style={{ fontWeight: '500' }}>${data?.cardData?.price}</p>
                                                </td>
                                                <td class="align-middle border-bottom-0" onClick={() => props.removefromCartHandler(index)}>
                                                    <CancelIcon style={{ color: 'red', cursor: 'pointer' }} />
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                            <div class="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: "16px" }}>
                                <div class="card-body p-4">

                                    <div class="row">
                                        <div class="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                                        </div>
                                        <div class="col-md-6 col-lg-2 col-xl-6">
                                        </div>
                                        <div class="col-lg-6 col-xl-12">
                                            <div class="d-flex justify-content-between" style={{ fontWeight: '500' }}>
                                                <p class="mb-2">Subtotal</p>
                                                <p class="mb-2">${totalPrice}</p>
                                            </div>

                                            <div class="d-flex justify-content-between" style={{ fontWeight: '500' }}>
                                                <p class="mb-0">Shipping</p>
                                                <p class="mb-0">$0.00</p>
                                            </div>

                                            <hr class="my-4" />

                                            <div class="d-flex justify-content-between mb-4" style={{ fontWeight: '500' }}>
                                                <p class="mb-2">Total (tax included)</p>
                                                <p class="mb-2">${totalPrice}</p>
                                            </div>
                                            {totalPrice == 0 ?
                                                <button type="button" class="btn btn-secondary btn-block btn-lg disabled">
                                                    <div class="d-flex justify-content-between">
                                                        <span>Checkout</span>
                                                        <span style={{ marginLeft: '5px' }}>${totalPrice}</span>
                                                    </div>
                                                </button> :
                                                <Link to="/checkout"> <button type="button" class="btn btn-success btn-block btn-lg">
                                                    <div class="d-flex justify-content-between">
                                                        <span>Checkout</span>
                                                        <span style={{ marginLeft: '5px' }}>${totalPrice}</span>
                                                    </div>
                                                </button>
                                                </Link>}


                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
