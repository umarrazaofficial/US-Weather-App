import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import editProduct from "../assets/editproduct.jpg";

const Editproduct = () => {
    const { Id } = useParams();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        image: null,
    });

    const navigate = useNavigate();

    // useEffect(()=>{
    //   const auth = localStorage.getItem('user');
    //   if(auth){
    //       navigate('/')
    //   }
    // })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://us-store-backend.vercel.app/api/getProduct/${Id}`);
                setProduct({
                    title: response.data.title,
                    description: response.data.description,
                    price: response.data.price,
                })
                document.title = "US-Store - Edit Product";
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('title', product.title);
        formdata.append('description', product.description);
        formdata.append('price', product.price);
        formdata.append('image', product.image);
        for (var pair of formdata.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        // localStorage.setItem('user',JSON.stringify(state))

        try {
            await axios.put(`https://us-store-backend.vercel.app/api/updateProduct/${Id}`, formdata, { headers: { 'Content-Type': "multipart/form-data" } });
            navigate('/productsList')
        } catch (error) {
            console.log(error.message)
        }
    };
    return (
        <div style={{ display: 'flex', minHeight: '541px' }}>
            <div style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
                <img draggable='false' src={editProduct} style={{ width: '85%' }} />
            </div>
            <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px', padding: '40px 0px' }}>
                <h1>Edit Product</h1>
                <form class="row g-3" onSubmit={handleSubmit}>
                    <div class="col-md-8">
                        <label for="inputtitle4" class="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="inputtitle4"
                            placeholder="Enter Title Here:"
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            required
                        />
                    </div>
                    <div class="col-md-8">
                        <label for="inputdescription4" class="form-label">
                            Description
                        </label>
                        <textarea
                            class="form-control"
                            id="inputdescription4"
                            placeholder="Enter Description Here:"
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            required
                            value={product.description}
                        />
                    </div>
                    <div class="col-md-8">
                        <label for="inputprice4" class="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            class="form-control"
                            id="inputprice4"
                            placeholder="Enter Price Here:"
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            value={product.price}
                            required
                        />
                    </div>
                    <div class="col-md-8">
                        <label for="inputimage4" class="form-label">
                            Image
                        </label>
                        <input
                            type="file"
                            name='file'
                            class="form-control"
                            id="inputimage4"
                            required
                            onChange={(e) => {
                                setProduct({ ...product, image: e.target.files[0] });
                            }}

                        />
                    </div>


                    <div class="col-8">
                        <button type="submit" value='Upload' class="btn btn-success" style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                            <SaveIcon style={{ fontSize: 22, marginRight: '5px' }} />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Editproduct