import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const EditEmployee = () => {
    const {id} = useParams();

    const navigate = useNavigate();
   
    const [employee, setEmployee] = useState({})

    useEffect(() => {
       const res = async () => {
            try {
                let response = await axios.get(`http://localhost:3001/Employe/${id}`)
                setEmployee(response.data)
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
           const edit = await axios.put(`http://localhost:3001/Employe/${id}`, employee)
            if(edit.status === 200){
                navigate('/employee')
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
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama" name='Name' value={employee.Name} onChange={(e) => setEmployee({...employee, Name: e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Username" name='Username' value={employee.Username} onChange={(e) => setEmployee({...employee, Username: e.target.value})} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Masukkan Email"  name='Email' value={employee.Email} onChange={(e) => setEmployee({...employee, Email: e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword"> 
            <Form.Label>Phone</Form.Label>
            <Form.Control type="number" placeholder="Masukkan Phone" name='age' value={employee.Phone} onChange={(e) => setEmployee({...employee, Phone: e.target.value})}/>
        </Form.Group>

        
        <Button variant="primary" type="submit" onClick={handleEdit}>
            Submit
        </Button>
        </Form>
   </div>
   </div>
  )
}

export default EditEmployee