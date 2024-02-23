import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  Data: state.cardItems
});
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

          <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#2B6356" }} data-bs-theme="dark">
            <div className="container-fluid">
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
              <Link className="navbar-brand" to="/" style={{ marginRight: "50px" }}>
                US-Store
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
                    <Link className="nav-link" aria-current="page" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/addProduct">
                      Add Products
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/productsList">
                      Products List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">
                      Orders List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/completedOrders">
                      Completed Orders
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
                      <Link className="nav-link" aria-current="page" to="/products">
                        Products
                      </Link>
                    </li>
                  </ul>
                }

                <form className="d-flex" role="search" data-bs-theme="light">
                  <button className="btn btn-outline-light" style={{ display: 'flex', alignItems: 'center', marginRight: "5px" }} onClick={() => { localStorage.clear('user'); navigate('/login') }}>
                    <LogoutIcon style={{ fontSize: 22 }} />Logout
                  </button>
                  {admin ? "" :
                    <Link className="nav-link" aria-current="page" to="/cart">

                      <button className="btn btn-outline-light" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <ShoppingCartIcon style={{ fontSize: 20, marginRight: '15px' }} />
                        <div style={{ position: 'absolute', left: '32%', top: '5%', fontSize: '14px' }}>{props?.Data?.length}
                        </div> {"  "}Cart
                      </button>
                    </Link>
                  }
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
          <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#2B6356" }} data-bs-theme="dark">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/login" style={{ marginRight: "50px" }}>
                Welcome to US-Store
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <form className="d-flex ms-auto" data-bs-theme="light">
                  <button className="btn btn-outline-light">
                    <Link className="nav-link" to="/login">
                      <LoginIcon style={{ fontSize: 22 }} /> {"  "}Login
                    </Link>
                  </button>

                  <button className="btn btn-outline-light" style={{ marginLeft: '10px' }}>
                    <Link className="nav-link" to="/register">
                      <LoginIcon style={{ fontSize: 22 }} /> {"  "}Sign Up
                    </Link>
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </>
      }

    </>
  );
};

export default connect(mapStateToProps)(Navbar)
