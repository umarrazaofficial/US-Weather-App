import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from '../components/loading';
import axios from "axios";
import editProfile from "../assets/Edit-Profile.webp";
import SaveIcon from '@mui/icons-material/Save';

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const { Id } = useParams();
  const [defaultname, setDefaultname] = useState('');
  const [defaultemail, setDefaultemail] = useState('');
  const [defaultpassword, setDefaultpassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://us-store-backend.vercel.app/api/getsingleaccount/${Id}`);
        setLoading(false);
        setDefaultname(response.data?.name);
        setDefaultemail(response.data?.email);
        setDefaultpassword(response.data?.password);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);


  const navigate = useNavigate();
  const state = { name: defaultname, email: defaultemail, password: defaultpassword }
  const handleEdit = async () => {
    await axios.put(`https://us-store-backend.vercel.app/api/updateUser/${Id}`, state);
    await navigate("/user");
    window.location.reload(true);
  };
  return (
    <div style={{ display: 'flex', minHeight: '541px' }} className='login-section'>
      {loading ?

        <Loading />
        :
        <>
          <div style={{ display: 'flex', alignItems: 'center', width: '50%' }} className='profile-div-1'>
            <img src={editProfile} style={{ width: '100%' }} draggable="false" />
          </div>
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }} className='profile-div-2'>
            <h2>Edit Profile</h2>
            <div class="col-md-8">
              <label for="inputname4" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="inputname4"
                placeholder="Enter Your Name:"
                onChange={(e) => setDefaultname(e.target.value)}
                value={defaultname}
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
                onChange={(e) => setDefaultemail(e.target.value)}
                value={defaultemail}
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
                onChange={(e) => setDefaultpassword(e.target.value)}
                value={defaultpassword}
              />
            </div>


            <div class="col-8" className='login-buttons'>
              <button
                className="btn btn-success" onClick={() => { handleEdit() }}>
                <SaveIcon style={{ fontSize: 22, paddingRight: '3px' }} />
                Save Changes
              </button>

            </div>
          </div>
        </>
      }
    </div>




    // <div className="container " style={{ marginTop: "100px", minHeight: '481px' }}>
    //   <form class="row g-3" onSubmit={handleEdit}>
    //     <div class="col-md-6">
    //       <label for="inputname4" class="form-label">
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         class="form-control"
    //         id="inputname4"
    //         placeholder="Enter Name:"
    //         onChange={(e) => setDefaultname(e.target.value)}
    //         value={defaultname}
    //       />
    //     </div>
    //     <div class="col-md-6">
    //       <label for="inputemail4" class="form-label">
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         class="form-control"
    //         id="inputemail4"
    //         placeholder="Enter Email:"
    //         onChange={(e) => setDefaultemail(e.target.value)}
    //         value={defaultemail}
    //       />
    //     </div>
    //     <div class="col-md-6">
    //       <label for="inputnumber4" class="form-label">
    //         Password
    //       </label>
    //       <input
    //         type="text"
    //         class="form-control"
    //         id="inputnumber4"
    //         placeholder="Enter Phone Number:"
    //         onChange={(e) => setDefaultpassword(e.target.value)}
    //         value={defaultpassword}
    //       />
    //     </div>
    //     <div class="col-12">
    //       <button type="submit" class="btn btn-secondary">
    //         Save Changes
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Edit;
