import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import accountSetting from "../assets/accountSetting.jpeg"

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');

  const auth = localStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authObject = JSON.parse(auth);
        setName(authObject.name);
        setEmail(authObject.email);
        setPassword(authObject.password);
        setId(authObject._id);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://us-store-backend.vercel.app/api/deleteUser/${id}`);
  };
  return (
    <div style={{ display: 'flex', minHeight: '541px' }} className='profile-section'>
      <div style={{ display: 'flex', alignItems: 'center', width: '50%' }} className='profile-div-1'>
        <img src={accountSetting} style={{ width: '100%' }} />
      </div>
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }} className='profile-div-2'>
        <h2>Account Setting</h2>
        <div class="col-md-8">
          <label for="inputname4" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="inputname4"
            placeholder="Enter Your Name:"
            readOnly
            value={name}
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
            readOnly
            value={email}
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
            readOnly
            value={password}
          />
        </div>


        <div class="col-8" className='login-buttons'>
          <Link to={
            `/edit/${id}`
          }
            className="btn btn-success" >
            <EditIcon style={{ fontSize: 22, paddingRight: '3px' }} />
            Edit Profile
          </Link>
          <Link
            onClick={() => {
              return (
                handleDelete(id),
                localStorage.clear('user')
              )
            }}
            className="btn btn-danger ms-2"
          >
            <DeleteIcon style={{ fontSize: 22, paddingRight: '3px' }} />
            Delete Account
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Profile