import React, { useState } from 'react'
import {Button, Form} from 'react-bootstrap';
import axios from "axios";
import {  Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CreateProduct = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
    id: '',        
    Name: '',
    Price: '',
    Quantity: ''
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
        const cr = await axios.post('http://localhost:3001/Products', form)
        if(cr.status === 201){
            navigate('/product')
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
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Price"  name='Price' onChange={handleChange} value={form.Price}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail"> 
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Quantity" name='Quantity' onChange={handleChange} value={form.Quantity} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
        </Button>
        </Form>
   </div>
   </div>
  )
}

export default CreateProduct