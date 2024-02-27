import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Registration from "../assets/registration.jpg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = { name: name, email: email, password: password };
  const navigate = useNavigate();

  // useEffect(()=>{
  //   const auth = localStorage.getItem('user');
  //   if(auth){
  //       navigate('/')
  //   }
  // })

  const handleSubmit = async (event) => {
    event.preventDefault();
    // localStorage.setItem('user',JSON.stringify(state))

    try {
      const response = await axios.post("https://us-store-backend.vercel.app/api/createuser", state);
      if (response.data.name) {
        localStorage.setItem('user', JSON.stringify({ email: response.data.email, password: response.data.password, _id: response.data._id, name: response.data.name, isAdmin: response.data.isAdmin }))
        navigate('/thankforsignup');
        window.location.reload(true);
      } else {
        alert("Invalid Email or Password")
      }
    } catch (error) {
      console.log(error.message)
    }
  };
  return (
    <div style={{ display: 'flex', minHeight: '541px' }} className="register-section">
      <div style={{ width: '50%' }} className="register-div-1">
        <img src={Registration} style={{ width: '95%' }} draggable="false" />
      </div>
      <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }} className="register-div-2">
        <h1>Register</h1>
        <form class="row g-3" onSubmit={handleSubmit}>
          <div class="col-md-8">
            <label for="inputname4" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="inputname4"
              placeholder="Enter Your Name:"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div class="col-md-8">
            <label for="inputemail4" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="inputemail4"
              placeholder="Enter Your Email:"
              title="Please enter a valid email address"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="col-md-8">
            <label for="inputpassword4" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="inputpassword4"
              placeholder="Enter Your Password:"
              minLength="8"
              maxLength="20"
              title="Password must be between 8 and 20 characters"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          <div class="col-8">
            <button type="submit" class="btn btn-success" style={{ display: 'flex', alignItems: 'center' }}>
              <HowToRegIcon style={{ fontSize: 22, marginRight: '3px' }} />
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup