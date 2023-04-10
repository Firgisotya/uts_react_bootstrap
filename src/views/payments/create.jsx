import React, { useState } from 'react'
import {Button, Form} from 'react-bootstrap';
import axios from "axios";
import {  Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CreatePayment = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
    id: '',        
    Bankname: '',
    Cardnumber: '',
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
        const cr = await axios.post('http://localhost:3001/Payments', form)
        if(cr.status === 201){
            navigate('/payment')
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
            <Form.Label>Nama Bank</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama Bank" name='Bankname' onChange={handleChange} value={form.Bankname} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nomor Kartu</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nomor Kartu"  name='Cardnumber' onChange={handleChange} value={form.Cardnumber}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
        </Button>
        </Form>
   </div>
   </div>
  )
}

export default CreatePayment