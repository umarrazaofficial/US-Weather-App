import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { editUser } from "./UserReducer";
import axios from "axios";

const Edit = () => {
  const { Id } = useParams();
  const [defaultname, setDefaultname] = useState('');
  const [defaultemail, setDefaultemail] = useState('');
  const [defaultpassword, setDefaultpassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getsingleaccount/${Id}`);
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
  const handleEdit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8000/api/updateUser/${Id}`, state)
    navigate("/user");
  };
  return (
    <div className="container " style={{ marginTop: "100px", minHeight: '481px' }}>
      <form class="row g-3" onSubmit={handleEdit}>
        <div class="col-md-6">
          <label for="inputname4" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="inputname4"
            placeholder="Enter Name:"
            onChange={(e) => setDefaultname(e.target.value)}
            value={defaultname}
          />
        </div>
        <div class="col-md-6">
          <label for="inputemail4" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="inputemail4"
            placeholder="Enter Email:"
            onChange={(e) => setDefaultemail(e.target.value)}
            value={defaultemail}
          />
        </div>
        <div class="col-md-6">
          <label for="inputnumber4" class="form-label">
            Password
          </label>
          <input
            type="text"
            class="form-control"
            id="inputnumber4"
            placeholder="Enter Phone Number:"
            onChange={(e) => setDefaultpassword(e.target.value)}
            value={defaultpassword}
          />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-secondary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
