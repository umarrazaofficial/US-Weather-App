import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../components/loading';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const Orderdetails = () => {
    const [loading, setLoading] = useState(false);
    const { Id } = useParams();
    const [details, setDetails] = useState();
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            document.title = "US-Store - Order Details";
            setLoading(true);
            try {
                const response = await axios.get(`https://us-store-backend.vercel.app/api/getOrder/${Id}`);
                setLoading(false);
                setDetails(response.data);
                if (response.data.status == 'pending') {
                    setPending(true);
                }

            } catch {
                console.log("Error Fetching Order Details Api");
            }
        }
        fetchData();
    }, [])

    let totalPrice = 0;
    for (let index = 0; index < details?.products?.length; index++) {
        let price = 0;
        price = details?.products[index]?.productId?.price * details?.products[index]?.quantity;
        totalPrice += price;
    }

    const handleStatus = () => {
        try {
            axios.put(`https://us-store-backend.vercel.app/api/completeOrder/${Id}`);
            toast.success('Order Status Updated Successfully');
            navigate('/completedOrders');
        } catch {
            toast.error('Error Updating Order Status');
        }
    }

    return (
        <section class="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col">
                        <div class="card">
                            <div class="card-body p-4">

                                <div class="row">

                                    <div class="col-lg-7" style={{ position: 'relative' }}>
                                        <h4 class="mb-3" style={{ display: 'flex' }}>
                                            <div onClick={() => window.history.back()}><i class="fas fa-long-arrow-alt-left me-2"></i></div>Product Details</h4>
                                        <hr />
                                        {loading ?
                                            <Loading />
                                            :
                                            <>
                                                {details?.products?.map((data, index) => (
                                                    <div class="card mb-3" key={index}>
                                                        <div class="card-body">
                                                            <div class="d-flex justify-content-between">
                                                                <div class="d-flex flex-row align-items-center">
                                                                    <div>
                                                                        <img
                                                                            src={data?.productId?.image}
                                                                            class="img-fluid rounded-3" alt="Shopping item" style={{ width: '65px' }} />
                                                                    </div>
                                                                    <div class="ms-3">
                                                                        <h5>{data?.productId?.title?.length > 20 ? data?.productId?.title.substr(0, 19) + "..." : data?.productId?.title}</h5>
                                                                        <p class="small mb-0">{data?.productId?.description?.length > 40 ? data?.productId?.description.substr(0, 37) + "..." : data?.productId?.description}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex flex-row align-items-center">
                                                                    <div style={{ width: '50px' }}>
                                                                        <h5 class="fw-normal mb-0">{data?.quantity}</h5>
                                                                    </div>
                                                                    <div style={{ width: '80px' }}>
                                                                        <h5 class="mb-0">${data?.productId?.price}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        }
                                    </div>
                                    <div class="col-lg-5">

                                        <div class="card rounded-3">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between align-items-center mb-4">
                                                    <h5 class="mb-0">Customer Details</h5>
                                                </div>

                                                <form class="mt-4">
                                                    <div className='row'>
                                                        <div class="mb-4 col-md-6">
                                                            <label class="form-label" for="typeName" style={{ fontWeight: 500 }}>First Name:</label>
                                                            <br />
                                                            <label class="form-label" for="typeName" style={{ textTransform: 'capitalize' }}>{details?.firstName}</label>
                                                        </div>

                                                        <div class=" mb-4 col-md-6">
                                                            <label class="form-label" for="typeName" style={{ fontWeight: 500 }}>Last Name:</label>
                                                            <br />
                                                            <label class="form-label" for="typeText" style={{ textTransform: 'capitalize' }}>{details?.lastName}</label>
                                                        </div>
                                                    </div>

                                                    <div class="row mb-4">
                                                        <div class="col-md-12 mb-4">
                                                            <div class="form-outline form-white">
                                                                <label class="form-label" for="typeName" style={{ fontWeight: 500 }}>Address:</label>
                                                                <br />
                                                                <label class="form-label" for="typeExp">{details?.address}</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-outline form-white">
                                                                <label class="form-label" for="typeName" style={{ fontWeight: 500 }}>Phone Number:</label>
                                                                <br />
                                                                <label class="form-label" for="typeText">{details?.phone}</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-outline form-white">
                                                                <label class="form-label" for="typeName" style={{ fontWeight: 500 }}>Email:</label>
                                                                <br />
                                                                <label class="form-label" for="typeText">{details?.email}</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>

                                                <hr class="my-4" />

                                                <div class="d-flex justify-content-between">
                                                    <p class="mb-2">Subtotal</p>
                                                    <p class="mb-2">${totalPrice}</p>
                                                </div>

                                                <div class="d-flex justify-content-between">
                                                    <p class="mb-2">Shipping</p>
                                                    <p class="mb-2">$0.00</p>
                                                </div>

                                                <div class="d-flex justify-content-between mb-4">
                                                    <p class="mb-2">Total(Incl. taxes)</p>
                                                    <p class="mb-2">${totalPrice}</p>
                                                </div>
                                                {pending ?
                                                    <button type="button" class="btn btn-success btn-block btn-lg" onClick={() => { handleStatus() }}>
                                                        <div class="d-flex justify-content-between">
                                                            <span>Completed </span>
                                                        </div>
                                                    </button>
                                                    :
                                                    <button type="button" class="btn btn-secondary btn-block btn-lg disabled">
                                                        <div class="d-flex justify-content-between">
                                                            <span>Completed </span>
                                                        </div>
                                                    </button>
                                                }


                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Orderdetails