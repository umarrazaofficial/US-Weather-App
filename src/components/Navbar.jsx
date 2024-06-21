import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [admin, setAdmin] = useState('');

  const auth = localStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authObject = JSON.parse(auth);
        setAdmin(authObject.isAdmin)
        const id = authObject._id;
        const response = await axios.get(`https://us-store-backend.vercel.app/api/getsingleaccount/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [auth]);
  return (
    <>
      {auth ?
        <>

          <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "rgba(0,0,0,.4)" }} data-bs-theme="dark">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => {
                  document.getElementById('navbarSupportedContent').classList.toggle('show');
                }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link className="navbar-brand" to="/" style={{ marginRight: "50px" }}>
                US-Weather-App
              </Link>


              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {admin ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/aboutus">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/user">
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/weatherupdates">
                      Weather Updates
                    </Link>
                  </li>

                </ul>
                  :
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link" aria-current="page" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" aria-current="page" to="/aboutus">
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" aria-current="page" to="/weatherupdates">
                        Weather Updates
                      </Link>
                    </li>
                  </ul>
                }

                <form className="d-flex" role="search" data-bs-theme="light">
                  <button className="btn btn-outline-light" style={{ display: 'flex', alignItems: 'center', marginRight: "5px" }} onClick={() => { localStorage.clear('user'); navigate('/login') }}>
                    <LogoutIcon style={{ fontSize: 22 }} />Logout
                  </button>
                </form>
              </div>
              <div className="me-2 ms-2 text-white ">
                <Link className="nav-link" to="/profile">
                  <PersonIcon />
                  {user?.name && user?.name}
                </Link>
              </div>
            </div>
          </nav>
        </>
        : <>
          <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "rgba(0,0,0,.4)" }} data-bs-theme="dark">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/login" style={{ marginRight: "50px" }}>
                Welcome to US-Weather-App
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => {
                  console.log('Button clicked');
                  document.getElementById('navbarSupportedContent').classList.toggle('show');
                }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <form className="d-flex ms-auto" data-bs-theme="light">
                  <Link className="nav-link" to="/login">
                    <button className="btn btn-outline-light">
                      <LoginIcon style={{ fontSize: 22 }} /> {"  "}Login
                    </button>
                  </Link>
                  <Link className="nav-link" to="/register">
                    <button className="btn btn-outline-light" style={{ marginLeft: '10px' }}>
                      <LoginIcon style={{ fontSize: 22 }} /> {"  "}Sign Up
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </nav>
        </>
      }

    </>
  );
};

export default Navbar
