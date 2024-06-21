import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Edit from './Edit';
import Login from '../pages/Login';
import Register from '../pages/Register'
import Aboutus from '../pages/Aboutus';
import Thankforsignup from './Thankforsignup';
import Weatherupdates from '../pages/Weatherupdates';

const Privatecomponent = () => {
  const [admin, setAdmin] = useState('');
  const auth = localStorage.getItem('user');
  useEffect(() => {
    try {
      const authObject = JSON.parse(auth);
      setAdmin(authObject.isAdmin)
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }, [auth]);

  return (
    auth ? (
      admin ?
        <Outlet />
        :
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:Id" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/weatherupdates" element={<Weatherupdates />} />
          <Route path="/thankforsignup" element={<Thankforsignup />} />
        </Routes>
    ) :
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thankforsignup" element={<Thankforsignup />} />
        <Route path="/" element={<Login />} />
      </Routes>

  )
}

export default Privatecomponent