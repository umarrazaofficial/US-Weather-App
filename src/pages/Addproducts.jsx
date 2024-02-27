import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import addProduct from "../assets/addproduct.png"

const Addproduct = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const state = { title, description, price, image };

    const navigate = useNavigate();

    // useEffect(()=>{
    //   const auth = localStorage.getItem('user');
    //   if(auth){
    //       navigate('/')
    //   }
    // })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('title', title);
        formdata.append('description', description);
        formdata.append('price', price);
        formdata.append('image', image);



        // localStorage.setItem('user',JSON.stringify(state))

        try {
            await axios.post("https://us-store-backend.vercel.app/api/addProduct", formdata);
            navigate('/products')
        } catch (error) {
            console.log(error.message)
        }
    };
    return (
        <div style={{ display: 'flex', alignItems: "center", minHeight: '541px' }} className='add-product-section'>
            <div style={{ width: '50%' }} className='add-product-div-1'>
                <img draggable='false' src={addProduct} style={{ width: '85%' }} />
            </div>
            <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px', padding: '40px 0px' }} className='add-product-div-2'>
                <h1>Add Product</h1>
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
                            onChange={(e) => setTitle(e.target.value)}
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
                            onChange={(e) => setDescription(e.target.value)}
                            required
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
                            onChange={(e) => setPrice(e.target.value)}
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
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>


                    <div class="col-8">
                        <button type="submit" value='Upload' class="btn btn-success" style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                            <AddCircleOutlineIcon style={{ fontSize: 22, marginRight: '5px' }} />
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addproduct