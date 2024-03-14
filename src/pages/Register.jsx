import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Registration from "../assets/registration.jpg";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = { name: name, email: email, password: password };
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "US-Store - Register";
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://us-store-backend.vercel.app/api/createuser", state);
      if (response.data.name) {
        await localStorage.setItem('user', JSON.stringify({ email: response.data.email, password: response.data.password, _id: response.data._id, name: response.data.name, isAdmin: response.data.isAdmin }))
        setLoading(false);
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
    <div style={{ display: 'flex', minHeight: '541px' }} className='login-section'>
      {loading ?

        <Loading />
        :
        <>
          <div style={{ width: '50%' }} className="register-div-1">
            <img src={Registration} style={{ width: '95%' }} draggable="false" />
          </div>
          <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }} className="register-div-2">
            <h1>Register</h1>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-8">
                <label htmlFor="inputname4" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputname4"
                  placeholder="Enter Your Name:"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-8">
                <label htmlFor="inputemail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputemail4"
                  placeholder="Enter Your Email:"
                  title="Please enter a valid email address"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-8">
                <label htmlFor="inputpassword4" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputpassword4"
                  placeholder="Enter Your Password:"
                  minLength="8"
                  maxLength="20"
                  title="Password must be between 8 and 20 characters"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>


              <div className="col-8">
                <button type="submit" className="btn btn-success" style={{ display: 'flex', alignItems: 'center' }}>
                  <HowToRegIcon style={{ fontSize: 22, marginRight: '3px' }} />
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </>
      }
    </div>
  )
}

export default Signup