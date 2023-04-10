import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import axios from "axios";
import { Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const IndexUser = () => {
  const [user, setUser] = useState([]);

  const getAllUser = async () => {
    let res = await axios.get("http://localhost:3001/Users");
    setUser(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getAllUser();
  }, []);
  const handleDelete = (id) => async () => {
    try {
      await axios.delete(`http://localhost:3001/Users/${id}`);
      getAllUser();
      MySwal.fire({
        icon: 'success',
        title: 'Data deleted successfully',
        text: `Your data has been deleted successfully`,
      });
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <>
      <div className="my-3 mx-5">
        <Link to="/createUser" className="btn btn-primary mb-3">
          Create
        </Link>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Umur</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.age}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to={`/editUser/${user.id}`}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} onClick={handleDelete(user.id)}>
                        Hapus
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default IndexUser;
