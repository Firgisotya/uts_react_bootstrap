import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import axios from "axios";
import { Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const IndexPayment = () => {
  const [payment, setPayment] = useState([]);

  const getAllPayment = async () => {
    let res = await axios.get("http://localhost:3001/Payments");
    setPayment(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getAllPayment();
  }, []);
  const handleDelete = (id) => async () => {
    try {
      await axios.delete(`http://localhost:3001/Payments/${id}`);
      getAllPayment();
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
        <Link to="/createPayment" className="btn btn-primary mb-3">
          Create
        </Link>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama bank</th>
              <th>Nomor Kartu</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {payment.map((payment, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{payment.Bankname}</td>
                <td>{payment.Cardnumber}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to={`/editPayment/${payment.id}`}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} onClick={handleDelete(payment.id)}>
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

export default IndexPayment;
