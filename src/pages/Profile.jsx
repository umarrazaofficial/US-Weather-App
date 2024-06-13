import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../components/loading';
import accountSetting from "../assets/accountSetting.svg"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const auth = localStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authObject = JSON.parse(auth);
        setId(authObject._id);
        const response = await axios.get(`https://us-store-backend.vercel.app/api/getsingleaccount/${authObject._id}`);
        setLoading(false);
        setName(response.data?.name);
        setEmail(response.data?.email);
        setPassword(response.data?.password);
        document.title = "US-Weather-App - Account Setting";
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
    <div style={{ display: 'flex', minHeight: '541px', backgroundColor: " rgba(0,0,0,.4)", color: '#fff' }} className='login-section'>
      {loading ?

        <Loading />
        :
        <>
          <div style={{ display: 'flex', alignItems: 'center', width: '50%' }} className='profile-div-1'>
            <img src={accountSetting} style={{ width: '100%' }} draggable="false" />
          </div>
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }} className='profile-div-2'>
            <h2>Account Setting</h2>
            <div className="col-md-8 styled-input">
              <label htmlFor="inputname4" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputname4"
                placeholder="Enter Your Name:"
                style={{ backgroundColor: "rgba(0,0,0,.4)", color: "#fff" }}
                readOnly
                value={name}
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
                style={{ backgroundColor: "rgba(0,0,0,.4)", color: "#fff" }}
                readOnly
                value={email}
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
                readOnly
                style={{ backgroundColor: "rgba(0,0,0,.4)", color: "#fff" }}
                value={password}
              />
            </div>


            <div className="col-8">
              <Link to={
                `/edit/${id}`
              }
                className="btn btn-outline-light" >
                <EditIcon style={{ fontSize: 22, paddingRight: '3px' }} />
                Edit Profile
              </Link>
              <button className="btn btn-outline-light ms-2" onClick={handleOpen}>
                <DeleteIcon style={{ fontSize: 22, paddingRight: '3px' }} />
                Delete Account
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h5" component="h2" style={{ fontFamily: 'Poppins' }}>
                    Delete Account
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Poppins' }}>
                    Are you sure you want to delete your account permanenlty?
                  </Typography>
                  <Link
                    onClick={() => {
                      return (
                        handleDelete(id),
                        localStorage.clear('user'),
                        navigate("/")
                      )
                    }}
                    className="btn btn-danger"
                    style={{ marginTop: '50px' }}
                  >
                    Delete Permanently
                  </Link>
                </Box>
              </Modal>

            </div>
          </div>
        </>
      }
    </div>

  )
}

export default Profile