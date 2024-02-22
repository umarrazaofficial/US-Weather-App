import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = { email: email, password: password };
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await axios.post("http://localhost:8000/api/login", state);
    if (response.data.name) {
      localStorage.setItem('user', JSON.stringify({ email: response.data.email, password: response.data.password, _id: response.data._id, name: response.data.name, isAdmin: response.data.isAdmin }))
      navigate('/')
    } else {
      alert("Invalid Email or Password")
    }
  };
  return (
    <div style={{ display: 'flex', minHeight: '541px' }}>
      <div style={{ width: '50%' }}>
        <img draggable='false' src='https://junior-shahucollegelatur.org.in/screening-test/public/assets/img/register/login-still.jpg' style={{ width: '80%' }} />
      </div>
      <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }}>
        <h1>Log In</h1>
        <form class="row g-3" onSubmit={handleSubmit}>

          <div class="col-md-8">
            <label for="inputemail4" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="inputemail4"
              placeholder="Enter Your Email:"
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
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          <div class="col-8" style={{ marginTop: '40px' }}>
            <button type="submit" class="btn btn-success">
              <LoginIcon style={{ fontSize: 22 }} /> Log In
            </button>
          </div>
        </form>
      </div>
    </div>

    // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px', minHeight: '541px' }}>
    // <h1>Login</h1>

    // </div>
  )
}

export default Login