import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";
import Loading from "./loading";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from "./molecules/Table"
import TableLayout from "./molecules/TableLayout"
import { ActionBtnList } from "./molecules/ActionBtns/ActionBtns.styles";

const Users = () => {
  const [loading, setLoading] = useState(true);
  // const [search, setSearch] = useState("");
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://us-weather-app-backend.vercel.app/api/deleteUser/${id}`);
      toast.success('User Deleted Successfully. Please Refresh the Page', { position: 'top-center' })
    } catch (error) {
      console.log(error.message);
    }



  };
  const [users, setUsers] = useState([])
  useEffect(() => {
    document.title = "US-Weather-App - Users";
    axios.get('https://us-weather-app-backend.vercel.app/api/getUser')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [])

  const actionBtns = (user) => (
    <>
      <ActionBtnList>
        <li>
          <Link to={{
            pathname: `/edit/${user._id}`,
            state: {
              name: `${user?.name}`,
              email: `${user?.email}`,
              password: `${user?.password}`
            },
          }}
            className="btn btn-sm btn-outline-light">
            <EditIcon style={{ fontSize: 22, paddingRight: '3px' }} />
            Edit
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleDelete(user._id)}
            className="btn btn-sm btn-outline-light ms-2"
          >
            <DeleteIcon style={{ fontSize: 22, paddingRight: '3px' }} />
            Delete
          </Link>
        </li>
      </ActionBtnList>
    </>
  );

  const { product_rows, totalItems } = useMemo(() => ({
    product_rows: users?.map((user) => [
      user?.name || "------------",
      user?.email || "------------",
      '********' || "------------",
      actionBtns(user),
    ]),
  }));
  const columnNamess = [
    `Name:`,
    `Email:`,
    `Password:`,
    "Actions",
  ];

  return (
    <div style={{ paddingTop: "20px", paddingBottom: '40px', minHeight: '481px', backgroundColor: " rgba(0,0,0,.4)", color: '#fff' }}>
      <div
        className="container styled-input"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link
          to="/register"
          className="btn btn-outline-light my-3" style={{ display: 'flex', alignItems: 'center' }}>
          <AddIcon style={{ fontSize: 22, marginRight: '3px' }} />
          Create User
        </Link>
        {/* <input
          className="form-control my-3"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ width: "30%", backgroundColor: "rgba(0,0,0,.4)", color: "#fff" }}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
      </div>

      <TableLayout
      >
        <Table
          width={1024}
          rowsData={product_rows}
          // loading={loading}
          columnNames={columnNamess}
          noPadding
        />
      </TableLayout>

    </div>
  );
};

export default Users;
