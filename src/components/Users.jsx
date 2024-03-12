import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";
import Loading from "./loading";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://us-store-backend.vercel.app/api/deleteUser/${id}`);
      toast.success('User Deleted Successfully. Please Refresh the Page', { position: 'top-center' })
    } catch (error) {
      console.log(error.message);
    }



  };
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get('https://us-store-backend.vercel.app/api/getUser')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [])

  return (
    <div className="container " style={{ marginTop: "20px", marginBottom: '40px', minHeight: '481px' }}>
      <div
        className="container "
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link
          to="/register"
          className="btn btn-success my-3" style={{ display: 'flex', alignItems: 'center' }}>
          <AddIcon style={{ fontSize: 22, marginRight: '3px' }} />
          Create User
        </Link>
        <input
          class="form-control my-3"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ width: "30%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>Name:</td>
            <td>Email:</td>
            <td>Password:</td>
            <td>Action:</td>
          </tr>
        </thead>


        <tbody>

          {loading ?
            <Loading />

            :

            <>
              {users?.filter((user) => {
                return (
                  (search.toLowerCase() === "" ||
                    (user.name && user.name.toLowerCase().includes(search)) ||
                    (user.email && user.email.toLowerCase().includes(search)))
                );
              }).map((user, index) => (
                <tr key={index}>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.password}</td>
                  <td>
                    <Link to={{
                      pathname: `/edit/${user._id}`,
                      state: {
                        name: `${user?.name}`,
                        email: `${user?.email}`,
                        password: `${user?.password}`
                      },
                    }}
                      className="btn btn-sm btn-success">
                      <EditIcon style={{ fontSize: 22, paddingRight: '3px' }} />
                      Edit
                    </Link>
                    <Link
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-sm btn-danger ms-2"
                    >
                      <DeleteIcon style={{ fontSize: 22, paddingRight: '3px' }} />
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          }


        </tbody>

      </table>
    </div>
  );
};

export default Users;
