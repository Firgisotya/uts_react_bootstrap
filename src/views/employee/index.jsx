import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import axios from "axios";
import { Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const IndexEmployee = () => {
  const [employee, setEmployee] = useState([]);

  const getAllEmployee = async () => {
    let res = await axios.get("http://localhost:3001/Employe");
    setEmployee(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getAllEmployee();
  }, []);
  const handleDelete = (id) => async () => {
    try {
      await axios.delete(`http://localhost:3001/Employe/${id}`);
      getAllEmployee();
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
        <Link to="/createEmployee" className="btn btn-primary mb-3">
          Create
        </Link>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((employee, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{employee.Name}</td>
                <td>{employee.Username}</td>
                <td>{employee.Email}</td>
                <td>{employee.Phone}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to={`/editEmployee/${employee.id}`}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} onClick={handleDelete(employee.id)}>
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

export default IndexEmployee;
