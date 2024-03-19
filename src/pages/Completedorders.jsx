import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../components/loading';

const Completedorders = () => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState();
    const [searchQuery, setSearchQuery] = useState({
        page: 1,
        limit: 5
    });

    useEffect(() => {
        document.title = "US-Store - Completed Orders";
        axios.get(`https://us-store-backend.vercel.app/api/getcompletedorders?page=${searchQuery?.page}&limit=${searchQuery?.limit}`)
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [searchQuery.page, searchQuery.limit])

    const HandleIncrementPage = () => {
        setSearchQuery(prevState => ({
            ...prevState,
            page: prevState.page + 1
        }));
        setLoading(true)

    };
    const HandleDecrementPage = () => {
        setSearchQuery(prevState => ({
            ...prevState,
            page: prevState.page - 1
        }));
        setLoading(true)

    };



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
                                                    className="form-control my-3"
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
                                {orders?.data?.filter((data) => {
                                    return (
                                        (search.toLowerCase() === "" ||
                                            (data?.firstName && data?.firstName.toLowerCase().includes(search.toLowerCase())) ||
                                            (data?.lastName && data?.lastName.toLowerCase().includes(search.toLowerCase())) ||
                                            (data?.phone && data?.phone.toLowerCase().includes(search)) ||
                                            (data?.address && data?.address.toLowerCase().includes(search.toLowerCase())))
                                    );
                                })
                                    .map((data, index) => {
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
                                                                        <label className="form-label" htmlFor="typeName" style={{ fontWeight: 500 }}>First Name:</label>
                                                                        <br />
                                                                        <label className="form-label" htmlFor="typeName" style={{ textTransform: 'capitalize' }}>{data?.firstName}</label>
                                                                    </div>

                                                                    <div className="form-outline mb-4 mb-xl-5">
                                                                        <label className="form-label" htmlFor="typeName" style={{ fontWeight: 500 }}>Last Name:</label>
                                                                        <br />
                                                                        <label className="form-label" htmlFor="typeExp" style={{ textTransform: 'capitalize' }}>{data?.lastName}</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-xl-6">
                                                                    <div className="form-outline mb-4 mb-xl-5">
                                                                        <label className="form-label" htmlFor="typeName" style={{ fontWeight: 500 }}>Address:</label>
                                                                        <br />
                                                                        <label className="form-label" htmlFor="typeText">{data?.address}</label>
                                                                    </div>

                                                                    <div className="form-outline mb-4 mb-xl-5">
                                                                        <label className="form-label" htmlFor="typeName" style={{ fontWeight: 500 }}>Phone Number:</label>
                                                                        <br />
                                                                        <label className="form-label" htmlFor="typeText">{data?.phone}</label>
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
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
                                    <nav aria-label="..." >
                                        <ul class="pagination pagination-circle">
                                            <li class="page-item" aria-current="page">
                                                <a class="page-link" style={{ color: 'black', fontSize: '18px' }}>Total Pages: {orders?.totalPages} </a>
                                            </li>
                                        </ul>
                                    </nav>
                                    <nav aria-label="..." >
                                        <ul class="pagination pagination-circle">
                                            {orders?.currentPage === 1 ?
                                                <li class="page-item">
                                                    <a class="page-link disabled" style={{ color: 'black', fontSize: '18px', cursor: 'pointer' }} >Previous</a>
                                                </li>
                                                :
                                                <li class="page-item">
                                                    <a class="page-link" href="#" style={{ color: 'black', fontSize: '18px', cursor: 'pointer' }} onClick={HandleDecrementPage}>Previous</a>
                                                </li>
                                            }

                                            <li class="page-item" aria-current="page" style={{ width: '50px', textAlign: 'center' }} >
                                                <a class="page-link" style={{ color: 'black', fontSize: '18px' }}>{orders?.currentPage} </a>
                                            </li>
                                            {orders?.currentPage === orders?.totalPages ?
                                                <li class="page-item" >
                                                    <a class="page-link disabled" href="#" style={{ color: 'black', fontSize: '18px' }}>Next</a>
                                                </li>
                                                :
                                                <li class="page-item" >
                                                    <a class="page-link" href="#" style={{ color: 'black', fontSize: '18px' }} onClick={HandleIncrementPage}>Next</a>
                                                </li>
                                            }

                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Completedorders