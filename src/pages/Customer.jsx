import {React,useState,useEffect} from "react";
import Dashboard from './Dashboard';
import Box from '@mui/material/Box';
import Typography  from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Table from 'react-bootstrap/Table';
// import { Button} from 'antd';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function Customer()
{

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [shows, setShows] = useState(false);
  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);

    return(
        <>
        <ThemeProvider theme={darkTheme}>
      <CssBaseline />
       <Box sx={{display:'flex'}}>
            <Dashboard/>
            <Box 
 sx={{
  height: 400,
  width: '100%'
  
 }}
 >
  <Typography
  variant='h3'
  component='h3'
  sx={{textAlign:'center',mt:3, mb:3,marginTop:'100px',marginRight:'100px'}}
  >
   CUSTOMER
</Typography>
<Box >
<Button variant="light" style={{width:'70px',marginLeft:'55px',height:'35px'}}   onClick={handleShow}>ADD</Button>
    <input  type="search" placeholder="Search" style={{ height:'35px',marginLeft:'20px',paddingLeft:'50px'}}/>    
      
</Box> 
<Box style={{marginTop:'20px',marginLeft:'50px',marginRight:'50px'}}>


<Table striped bordered hover variant="dark" border='1px' width="80%" height="100%" >
      <thead>
        <tr >
          <th>EMAIL</th>
          <th>MOBILE</th>
          <th>REGISTER ON</th>
          <th>STATUS</th>
          <th>ACTION</th>
          
        </tr>
      </thead>
      <tbody  style={{height:'100%',marginLeft:'50px'}}>
        <tr >
          <td>1</td>
          <td>Mark</td>
          <td>cat</td>
          <td>dog</td>
          <td><i class="fa fa-edit" onClick={handleShows} style={{color:'red',fontSize:"25px"}}></i></td>
         
        </tr>
       
        
      </tbody>
    </Table>
    </Box>
</Box>
</Box>
{/* -----------------------------------------------------------------add------------------------------------------------ */}
<Modal show={show} onHide={handleClose} style={{marginTop:'50px'}}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="email" placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email</Form.Label>
        <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Employee</Form.Label>
        <Form.Control type="text" placeholder="Employee Id" />
        </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

{/* -----------------------------------------------------------------------------update-------------------------------------------- */}
<Modal show={shows} onHide={handleCloses} style={{marginTop:'50px'}}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="email" placeholder="Enter Name" />
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Employeess</Form.Label>
        <Form.Control type="text" placeholder="Employee Id" />
      </Form.Group>
      
      {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloses}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloses}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
            </ThemeProvider>
        </>
    )
}


export default Customer;