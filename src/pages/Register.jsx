import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Registration from "../assets/registration.svg";
import Search from '../components/Search/Search';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState(null);
  const [password, setPassword] = useState("");
  const state = { name, email, password, location };
  const navigate = useNavigate();
  console.log(location);
  useEffect(() => {
    document.title = "US-Weather-App - Register";
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://us-weather-app-backend.vercel.app/api/createuser", state);
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
    <div style={{ display: 'flex', minHeight: '541px', backgroundColor: " rgba(0,0,0,.4)", color: '#fff' }} className='login-section'>
      {loading ?

        <Loading />
        :
        <>
          <div style={{ width: '50%' }} className="register-div-1">
            <img src={Registration} style={{ width: '95%' }} draggable="false" alt='registration' />
          </div>
          <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }} className="register-div-2">
            <h1>Register</h1>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-8 styled-input">
                <label htmlFor="inputname4" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputname4"
                  placeholder="Enter Your Name:"
                  onChange={(e) => setName(e.target.value)}
                  style={{ backgroundColor: "rgba(0,0,0,.4)", color: "#fff" }}
                  required
                />
              </div>
              <div className="col-md-8 styled-input">
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
                  style={{ backgroundColor: "rgba(0,0,0,.4)", color: "#fff" }}
                  required
                />
              </div>
              <div className="col-md-8 styled-input">
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
                  style={{ backgroundColor: "rgba(0,0,0,.4)", color: "#fff" }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-md-8" style={{ color: "black" }}>
                <label htmlFor="inputpassword4" className="form-label text-white">
                  Location
                </label>
                <Search onSearchChange={(data) => { setLocation(data) }} />
              </div>


              <div className="col-8">
                <button type="submit" className="btn btn-outline-light" style={{ display: 'flex', alignItems: 'center' }}>
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