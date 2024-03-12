import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../components/loading';
import accountSetting from "../assets/accountSetting.jpeg"

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    setLoading(true);
    await axios.delete(`https://us-store-backend.vercel.app/api/deleteUser/${id}`);
    setLoading(false);
    navigate('/login');
    window.location.reload(true);
  };
  return (
    <div style={{ display: 'flex', minHeight: '541px' }} className='login-section'>
      {loading ?

        <Loading />
        :
        <>
          <div style={{ display: 'flex', alignItems: 'center', width: '50%' }} className='profile-div-1'>
            <img src={accountSetting} style={{ width: '100%' }} draggable="false" />
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
                    localStorage.clear('user'),
                    navigate("/")
                  )
                }}
                className="btn btn-danger ms-2"
              >
                <DeleteIcon style={{ fontSize: 22, paddingRight: '3px' }} />
                Delete Account
              </Link>

            </div>
          </div>
        </>
      }
    </div>

  )
}

export default Profile