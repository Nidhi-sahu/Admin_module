import {React,useEffect,useState} from 'react'
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
import axios from 'axios';
import Paginations from './Paginations';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


function Category()
{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [shows, setShows] = useState(false);
  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);
 //--------------------------------------------------------------pagination--------------------------------------
 const[currentPage, setCurrentPage] = useState(1)
 const[postPerPage, setPostPerPage] = useState(6)
  //------------------------------------------------------------------get-----------------------------------------------------------------------------
const [data, setData] = useState([])
const getData = async () => {
  const res = await axios.get("http://localhost:3002/viewcategory")
  setData(res.data)
  console.log("Response api",res.data)
}
useEffect(() => {
  getData()
},[])
//----------------------------------------------------------------------post----------------------------------------------------------------------
const [category_id, setCategory_id] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [category_image, setCategory_image] = useState("");
  console.log(category_id,category_name,category_image)
  const submitData = async () => {
    const data = {
      category_id,
      category_name,
      category_image
    }
    console.log(data)
    const res = await axios.post("http://localhost:3002/addcategory", data)
    console.log("postData response", res)
  }
//---------------------------------------------------------------------update-------------------------------------------------------------------------
const [newcategory_id, setNewcategory_id] = useState("");
const [newcategory_name, setNewcategory_name] = useState("");
const [newcategory_image, setNewcategory_image] = useState("");

async function updateData(category_id, category_name, category_image) {
  console.log(category_id, category_name, category_image)
  setNewcategory_id(category_id);
  setNewcategory_name(category_name);
  setNewcategory_image(category_image);
  handleShows()
}

async function saveUpdatedData() {
  let response = await axios.patch(`http://localhost:3002/updatecategory/${newcategory_id}`,
  {
    "category_id":newcategory_id,
    "category_name":newcategory_name,
    "category_image":newcategory_image

  })
  console.log(response)
}
//--------------------------------------------------------------------------pagination------------------------------------------
const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = data.slice(firstPostIndex,lastPostIndex)
  console.log(currentPosts, 'currentPosts')

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
    CATEGORY
</Typography>
<Box >
<Button variant="light" style={{width:'70px',marginLeft:'55px',height:'35px'}}   onClick={handleShow}>ADD</Button>
    <input  type="search" placeholder="Search" style={{ height:'35px',marginLeft:'20px',paddingLeft:'50px'}}/>
</Box> 
<Box style={{marginTop:'20px',marginLeft:'50px',marginRight:'50px'}}>


<Table striped bordered hover variant="dark" border='1px' width="80%" height="100%" >
      <thead>
        <tr >
          <th>CATEGORY ID</th>
          <th>CATEGORY NAME</th>
          <th>CATEGORY IMAGE</th>
          <th>ACTION</th>
          
        </tr>
      </thead>
      <tbody  style={{height:'100%',marginLeft:'50px'}}>
      {currentPosts &&
            currentPosts.map((item,index) => (
        <tr  key={index}>
          <td>{item.category_id}</td>
          <td>{item.category_name}</td>
          <td>{item.category_image}</td>
          <td><i class="fa fa-edit"  onClick={() => updateData(item.category_id, item.category_name, item.category_image)} style={{color:'red',fontSize:"30px"}}></i></td>
         
        </tr>
       
       ))}
      </tbody>
    </Table>
    <Paginations totalPosts = {data.length} postsPerPage={postPerPage} setCurrentPage ={setCurrentPage} /> 
    </Box>
</Box>
            </Box>
       {/* ----------------------------------------------------------------------- Add DAtA------------------------------------------------*/}
       <Modal show={show} onHide={handleClose} style={{marginTop:'50px'}}>
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicid">
        <Form.Label>Category ID</Form.Label>
        <Form.Control type="email" placeholder=" category ID"  value={category_id} onChange={(e) => setCategory_id(e.target.value)}/>
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicname">
        <Form.Label>Category Name</Form.Label>
        <Form.Control type="text" placeholder=" category Name" value={category_name} onChange={(e) => setCategory_name(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicname">
        <Form.Label>Category Image</Form.Label>
        <Form.Control type="text" placeholder="Image" value={category_image} onChange={(e) => setCategory_image(e.target.value)}/>
      </Form.Group>
       
      
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitData}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ---------------------------------------------------------------edit------------------------------------------- */}
      <Modal show={shows} onHide={handleCloses} style={{marginTop:'50px'}}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicid">
        <Form.Label>Category Id</Form.Label>
        <Form.Control type="text" placeholder="category ID" value={newcategory_id} onChange={(e) => setNewcategory_id(e.target.value)}  />
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicname">
        <Form.Label>Category Name</Form.Label>
        <Form.Control type="text" placeholder="Category Name" value={newcategory_name} onChange={(e) => setNewcategory_name(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Category Image</Form.Label>
        <Form.Control type="text" placeholder=" Enter Image" value={newcategory_image}  onChange={(e) => setNewcategory_image(e.target.value)} />
      </Form.Group>
     
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloses}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>saveUpdatedData()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
 </ThemeProvider>
        </>
    )
}


export default Category;