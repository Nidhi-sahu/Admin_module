import {React,useEffect,useState} from "react"
import Dashboard from './Dashboard';
import Box from '@mui/material/Box';
import Typography  from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Table from 'react-bootstrap/Table';
// import { Button} from 'antd';
import Form from "react-bootstrap/Form"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Paginations from "./Paginations";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function Subcategory()
{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [shows, setShows] = useState(false);
  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);
//-----------------------------States for pagination-----------------------------------
  const[currentPage, setCurrentPage] = useState(1)
  const[postPerPage, setPostPerPage] = useState(6)
//---------------------------------------------------------------------------get--------------------------------------------
const[data, SetData] = useState([])
const getData = async () =>{
  const res = await axios.get("http://localhost:3002/viewsubcategory")
  SetData(res.data)
  console.log("Response",res.data)
}
useEffect(() => {
  getData()
},[])
//-----------------------------------------------------------------------------post----------------------------------------------
const [category_id, setCategory_id] = useState("");
  const [sub_category, setSub_category] = useState("");
  const [sub_categoryname, setSub_categoryname] = useState("");
  const [sub_categoryimage, setSub_Categoryimage] = useState("");
  console.log(category_id,sub_category,sub_categoryname,sub_categoryimage)
  const submitData = async () => {
    const data = {
      category_id,
      sub_category,
      sub_categoryname,
      sub_categoryimage
    }
    console.log(data)
    const res = await axios.post("http://localhost:3002/insertsubcategory", data)
    console.log("postData response", res)
  }
//---------------------------------------------------------------------------update--------------------------------------------------------
const [newcategory_id, setNewcategory_id] = useState("");
const [newsub_category, setNewsub_category] = useState("");
const [newsub_categoryname, setNewsub_categoryname] = useState("");
const [newsub_categoryimage,setNewsub_categoryimage] = useState("");

async function updateData(category_id, sub_category, sub_categoryname,sub_categoryimage) {
  console.log(category_id, sub_category,sub_categoryname, sub_categoryimage)
  setNewcategory_id(category_id);
  setNewsub_category(sub_category);
  setNewsub_categoryname(sub_categoryname);
  setNewsub_categoryimage(sub_categoryimage)
  handleShows()
} 
async function saveUpdatedData() {
  let response = await axios.put(`http://localhost:3002/updatesubcategory/${newsub_category}`,
  {
    "category_id":newcategory_id,
    "sub_category":newsub_category,
    "sub_categoryname":newsub_categoryname,
    "sub_categoryimage":newsub_categoryimage

  })
  console.log(response)
}
//---------------------------------for pagination-------------------------------
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
    SUBCATEGORY
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
          <th>SUBCATEGORY ID</th>
          <th>SUB NAME</th>
          <th>SUB IMAGE</th>
          <th>ACTION</th>
          
        </tr>
      </thead>
      <tbody  style={{height:'100%',marginLeft:'50px'}}>
      {currentPosts &&
            currentPosts.map((item,index) => {
         return(
        <tr  key={index}>
          <td>{item.category_id}</td>
          <td>{item.sub_category}</td>
          <td>{item.sub_categoryname}</td>
          <td>{item.sub_categoryimage}</td>
          <td><i class="fa fa-edit" onClick={() => updateData(item.category_id, item.sub_category,item.sub_categoryname,item.sub_categoryimage)} style={{color:'red',fontSize:"30px"}}></i></td>
         
        </tr>
         )
        
        })}
        
      </tbody>
    </Table>
    <Paginations totalPosts = {data.length} postsPerPage={postPerPage} setCurrentPage ={setCurrentPage} />
    </Box>
</Box>
            </Box>
  {/* -----------------------------------------------------------------ADD DATA--------------------------------------- */}
  <Modal show={show} onHide={handleClose} style={{marginTop:'50px'}}>
        <Modal.Header closeButton>
          <Modal.Title>ADD DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicId">
        <Form.Label>ID</Form.Label>
        <Form.Control type="text" placeholder="Enter ID" value={category_id} onChange={(e) => setCategory_id(e.target.value)}/>
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicid">
        <Form.Label>Subcategory ID</Form.Label>
        <Form.Control type="text" placeholder="Sub Category ID"  value={ sub_category} onChange={(e) => setSub_category(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Subcate Name</Form.Label>
        <Form.Control type="text" placeholder="Enter subcate Name" value={sub_categoryname} onChange={(e) => setSub_categoryname(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>subcate Image</Form.Label>
        <Form.Control type="text" placeholder="Enter subcate Image"  value={sub_categoryimage} onChange={(e) => setSub_Categoryimage(e.target.value)} />
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
{/* --------------------------------------------------------------------update--------------------------------------------- */}
<Modal show={shows} onHide={handleCloses} style={{marginTop:'50px'}}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicid">
        <Form.Label>ID</Form.Label>
        <Form.Control type="text" placeholder="Enter Id" value={newcategory_id} onChange={(e) => setNewcategory_id(e.target.value)}/>
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Subcategory ID</Form.Label>
        <Form.Control type="text" placeholder="Enter Subcategory ID" value={newsub_category} onChange={(e) => setNewsub_category(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Subcate Name</Form.Label>
        <Form.Control type="text" placeholder="Enter SubCategory Name"   value={newsub_categoryname} onChange={(e) => setNewsub_categoryname(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>subcate Image</Form.Label>
        <Form.Control type="text" placeholder="Enter Subcategory Image" value={newsub_categoryimage} onChange={(e) => setNewsub_categoryimage(e.target.value)}/>
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
          <Button variant="primary" onClick={()=>saveUpdatedData()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
            </ThemeProvider>
        </>
    )
}


export default Subcategory;