import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const EditPayment = () => {
    const {id} = useParams();

    const navigate = useNavigate();
   
    const [payment, setPayment] = useState({})

    useEffect(() => {
       const res = async () => {
            try {
                let response = await axios.get(`http://localhost:3001/Payments/${id}`)
                setPayment(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error);                
            }
       }
       res()
    }, [])

    const handleEdit = async (e) => {
        e.preventDefault()
        try {
           const edit = await axios.put(`http://localhost:3001/Payments/${id}`, payment)
            if(edit.status === 200){
                navigate('/payment')
                 MySwal.fire({
                icon: 'success',
                title: 'Data updated successfully',
                text: `Your data has been updated successfully`,
              });
            }
        } catch (error) {
            console.log(error);
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
            <Form.Label>Nama Bank</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama Bank" name='Bankname' value={payment.Bankname} onChange={(e) => setPayment({...payment, Bankname: e.target.value})} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Nomor Kartu</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nomor Kartu"  name='Cardnumber' value={payment.Cardnumber} onChange={(e) => setPayment({...payment, Cardnumber: e.target.value})}/>
        </Form.Group>

        
        <Button variant="primary" type="submit" onClick={handleEdit}>
            Submit
        </Button>
        </Form>
   </div>
   </div>
  )
}

export default EditPayment