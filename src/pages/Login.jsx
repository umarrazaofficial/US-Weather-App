import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import Loading from '../components/loading';
import loginPage from "../assets/loginpage.jpg";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = { email: email, password: password };
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "US-Store - Login";
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let response = await axios.post("https://us-store-backend.vercel.app/api/login", state);
    if (response.data.name) {
      await localStorage.setItem('user', JSON.stringify({ email: response.data.email, password: response.data.password, _id: response.data._id, name: response.data.name, isAdmin: response.data.isAdmin }))
      await navigate('/')
      setLoading(false);
      window.location.reload(true);
    } else {
      alert("Invalid Email or Password")
    }
  };
  return (
    <div style={{ display: 'flex', minHeight: '541px' }} className='login-section'>
      {loading ?

        <Loading />
        :
        <>
          <div style={{ width: '50%' }} className='login-div-1'>
            <img draggable='false' src={loginPage} style={{ width: '80%' }} />
          </div>
          <div className='login-div-2' style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }}>
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
        </>
      }
    </div>
  )
}

export default Login