import {React,useEffect,useState} from "react"
import Box from '@mui/material/Box';
import Sidebaar from '../component/Sidebaar';
import Dashboard from './Dashboard';
import { Group, MapsHomeWork } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Typography  from '@mui/material/Typography';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Table from 'react-bootstrap/Table';
// import { Button} from 'antd';
import axios from 'axios';
import Paginations from "./Paginations";
import Button from 'react-bootstrap/Button';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function Roles()
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

//-----------------------------------------------get api----------------------------------------
const[data, SetData] = useState([])
  const getData = async () =>{
    const res = await axios.get("http://localhost:3002/viewrole")
    SetData(res.data)
    console.log("Response",res.data)
    
  }
  
  useEffect(() => {
    getData()
  },[])

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filterData = () => {
    const filtered = data.filter(item => {
      return item.rolename.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
//---------------------------------------------------post----------------------------------------------------------------------------------
let [role_id, setRoleid] = useState('');
let [rolename,setRolename] = useState('');
const submitData = async () => {
  const data = {
  role_id,
  rolename
  }
  console.log(data)
  const res = await axios.post("http://localhost:3002/addrole",data)
  console.log("postData response",res)
  
}

//---------------------------------------------------------------------------update------------------------------------------------------------
const [newrole_id, setNewRole_id] = useState("");
const [newrolename, setNewRolename] = useState("");


async function updateData(role_id, rolename) {
  console.log(role_id, rolename)
  setNewRole_id(role_id);
  setNewRolename(rolename);
  handleShows()
}

async function saveUpdatedData() {
  let response = await axios.put(`http://localhost:3002/updaterole/${newrole_id}`,
  {
    "role_id":newrole_id,
    "rolename": newrolename,
    

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
    ROLES
</Typography>

  <Box >
  {/* <Button block style={{width:'70px',marginLeft:'55px'}}   onClick={handleShow} >ADD</Button> */}
  <Button variant="light" style={{width:'70px',marginLeft:'55px',height:'35px'}}   onClick={handleShow}>ADD</Button>
    <input  type="search" placeholder="Search" 
    //  value={search} onChange={handleChange} 
    value={searchTerm} onChange={handleSearch}
     style={{ height:'35px',marginLeft:'20px',paddingLeft:'50px'}}/>   
  
</Box>   
<Box style={{marginTop:'20px',marginLeft:'20px',marginRight:'50px'}}>


<Table  className="tab" striped bordered hover variant="dark" border='1px' width="80%" height="100%" >
      <thead>
        <tr >
          <th>ROLE ID</th>
          <th>ROLE NAME</th>
          <th>ACTION</th>
          
        </tr>
      </thead>
      <tbody  style={{height:'100%',marginLeft:'50px'}}>
       {currentPosts &&
            currentPosts.map((item,index) =>{
           return(
        <tr  key={index}>
          <td>{item.role_id}</td>
          <td>{item.rolename}</td>
          <td><i class="fa fa-edit"   onClick={() => updateData(item.role_id, item.rolename)} style={{color:'red',fontSize:"25px"}}></i></td>
         
        </tr>
        
        )})
      }
      </tbody>
    </Table>
    <Paginations totalPosts = {data.length} postsPerPage={postPerPage} setCurrentPage ={setCurrentPage} />  
    </Box>
    </Box>
    </Box>
     
    
      <Modal show={show} onHide={handleClose} style={{marginTop:'50px'}}>
        <Modal.Header closeButton>
         <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="validationFormik01">
        <Form.Label>Role Id</Form.Label>
        <Form.Control type="text" name="Id"
       value={role_id} onChange={(e) =>setRoleid(e.target.value) }
      
         placeholder="Enter your Id" />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
     </Form.Group>
     <Form.Group className="mb-3" controlId="validationformik02">
        <Form.Label>Role Name</Form.Label>
        <Form.Control type="text"
        name="roleName"
        value={rolename} onChange={(e) =>setRolename(e.target.value) }
      placeholder="Enter your Name"
        
        />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
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
      {/* ----------------------------------------------------------------------update---------------------------------------------------- */}
       <Box>
      <Modal show={shows} onHide={handleCloses} style={{marginTop:'50px'}}>
        <Modal.Header closeButton>
          <Modal.Title>update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
<Form >
      <Form.Group className="mb-3" controlId="validationFormik01">
        <Form.Label>Role Id</Form.Label>
        <Form.Control type="text"
        name="Id"
        value={newrole_id}  onChange={(e) => setNewRole_id(e.target.value)}
         placeholder="Enter your Id" />
                 <Form.Control.Feedback type="invalid">
                  
                  </Form.Control.Feedback>
         
     </Form.Group>
     <Form.Group className="mb-3" controlId="validationFormik02">
        <Form.Label> Role Name</Form.Label>
        <Form.Control type="text"
         name="roleName"
         value={newrolename} 
          onChange={(e) => setNewRolename(e.target.value)}
         
        
        placeholder="Enter your Name"
        
        />
                <Form.Control.Feedback type="invalid">
                  </Form.Control.Feedback>
                 
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
      </Box>
</ThemeProvider>

 
        </>
    )
}
export default Roles;