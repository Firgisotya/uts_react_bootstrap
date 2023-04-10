import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const EditProduct = () => {
    const {id} = useParams();

    const navigate = useNavigate();
   
    const [product, setProduct] = useState({})

    useEffect(() => {
       const res = async () => {
            try {
                let response = await axios.get(`http://localhost:3001/Products/${id}`)
                setProduct(response.data)
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
           const edit = await axios.put(`http://localhost:3001/Products/${id}`, product)
            if(edit.status === 200){
                navigate('/product')
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
            <Form.Control type="text" placeholder="Masukkan Nama" name='Name' value={product.Name} onChange={(e) => setProduct({...product, Name: e.target.value})} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Price"  name='Price' value={product.Price} onChange={(e) => setProduct({...product, Price: e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword"> 
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Quantity" name='Quantity' value={product.Quantity} onChange={(e) => setProduct({...product, Quantity: e.target.value})}/>
        </Form.Group>

        
        <Button variant="primary" type="submit" onClick={handleEdit}>
            Submit
        </Button>
        </Form>
   </div>
   </div>
  )
}

export default EditProduct