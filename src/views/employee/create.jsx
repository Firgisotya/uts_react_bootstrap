import React, { useState } from 'react'
import {Button, Form} from 'react-bootstrap';
import axios from "axios";
import {  Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CreateEmployee = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
    id: '',        
    Name: '',
    Username: '',
    Email: '',
    Phone: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
    try {
        e.preventDefault()
        const cr = await axios.post('http://localhost:3001/Employe', form)
        if(cr.status === 201){
            navigate('/employee')
            MySwal.fire({
                icon: 'success',
                title: 'Data submited successfully',
                text: `Your data has been submited successfully`,
              });
        }
    } catch (error) {
        console.log(error)
        MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
    }

    }
  return (
   <div className='m-auto w-50 '>
    {/* buatkan form create */}
   <div className='my-5'>
   <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Masukkan ID" name='id' onChange={handleChange} value={form.id} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama" name='Name' onChange={handleChange} value={form.Name} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Username" name='Username' onChange={handleChange} value={form.Username} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Masukkan Email"  name='Email' onChange={handleChange} value={form.Email}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail"> 
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Phone" name='Phone' onChange={handleChange} value={form.Phone} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
        </Button>
        </Form>
   </div>
   </div>
  )
}

export default CreateEmployee