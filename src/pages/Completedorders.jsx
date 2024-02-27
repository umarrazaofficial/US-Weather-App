import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../components/loading';

const Completedorders = () => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState();

    useEffect(() => {
        axios.get('https://us-store-backend.vercel.app/api/getcompletedorders')
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [])

    return (
        <section className="h-100 h-custom" style={{ minHeight: '540px' }}>
            <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        {loading ?
                            <Loading />
                            :
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="h4" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                                Completed Orders List
                                                <input
                                                    class="form-control my-3"
                                                    type="search"
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    style={{ width: "30%" }}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                            </th>
                                            {/* <th scope="col" >Quantity</th>
                                        <th scope="col">Price</th> */}
                                        </tr>
                                    </thead>
                                </table>
                                {orders?.filter((data) => {
                                    return (
                                        (search.toLowerCase() === "" ||
                                            (data?.firstName && data?.firstName.toLowerCase().includes(search.toLowerCase())) ||
                                            (data?.lastName && data?.lastName.toLowerCase().includes(search.toLowerCase())) ||
                                            (data?.phone && data?.phone.toLowerCase().includes(search)) ||
                                            (data?.address && data?.address.toLowerCase().includes(search.toLowerCase())))
                                    );
                                }).map((data, index) => {
                                    let totalPrice = 0;
                                    for (let index = 0; index < data?.products?.length; index++) {
                                        let price = 0;
                                        price = data?.products[index]?.productId?.price * data?.products[index]?.quantity;
                                        totalPrice += price;
                                    }
                                    return (
                                        <div className="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: '16px', margin: '20px 0px' }} key={index}>
                                            <div className="card-body p-4">

                                                <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div className="col-md-6 col-lg-6 col-xl-6">
                                                        <div className="row">
                                                            <div className="col-12 col-xl-6">
                                                                <div className="form-outline mb-4 mb-xl-5">
                                                                    <label className="form-label" for="typeName" style={{ fontWeight: 500 }}>First Name:</label>
                                                                    <br />
                                                                    <label className="form-label" for="typeName" style={{ textTransform: 'capitalize' }}>{data?.firstName}</label>
                                                                </div>

                                                                <div className="form-outline mb-4 mb-xl-5">
                                                                    <label className="form-label" for="typeName" style={{ fontWeight: 500 }}>Last Name:</label>
                                                                    <br />
                                                                    <label className="form-label" for="typeExp" style={{ textTransform: 'capitalize' }}>{data?.lastName}</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-xl-6">
                                                                <div className="form-outline mb-4 mb-xl-5">
                                                                    <label className="form-label" for="typeName" style={{ fontWeight: 500 }}>Address:</label>
                                                                    <br />
                                                                    <label className="form-label" for="typeText">{data?.address}</label>
                                                                </div>

                                                                <div className="form-outline mb-4 mb-xl-5">
                                                                    <label className="form-label" for="typeName" style={{ fontWeight: 500 }}>Phone Number:</label>
                                                                    <br />
                                                                    <label className="form-label" for="typeText">{data?.phone}</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-xl-4">
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
                                                        <Link to={
                                                            `/orderDetails/${data._id}`}>
                                                            <button type="button" className="btn btn-success btn-block btn-lg">
                                                                <div className="d-flex justify-content-between">
                                                                    <span>View Details</span>
                                                                </div>
                                                            </button>
                                                        </Link>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    )
                                })}

                            </div>
                        }

                    </div>
                </div>
            </div>
        </section >
    )
}

export default Completedorders