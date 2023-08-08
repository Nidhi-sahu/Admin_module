import { React, useEffect, useState } from 'react'
import Dashboard from './Dashboard';
import Box from '@mui/material/Box';
import Table from 'react-bootstrap/Table';
//  import { Button} from 'antd';
import Typography  from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Paginations from './Paginations';
import axios from 'axios';
import { Switch } from '@mui/material';
import moment from 'moment';
import { BiSolidLowVision } from "react-icons/bi";
import {BiSolidMessageSquareEdit}  from "react-icons/bi";
import Button from 'react-bootstrap/Button';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  

function User() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//--------------------------------------------------update data----------------------------
  const [shows, setShows] = useState(false);
  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);
//---------------------------------------------------------Assign role---------------------------------
const [assignrole, setAssignrole] = useState(false);
const handleCloseassign = () => setAssignrole(false);
const handleShowassign = () => setAssignrole(true);
//----------------------------------------------------------view---------------------------------------
const [viewrole, setViewrole] = useState(false);
const handleCloseviewrole = () => setViewrole(false);
const handleShowviewrole = () => setViewrole(true);

//--------------------------------------------------------------pagination--------------------------------------

const [currentPage, setCurrentPage] = useState(1)
const [postPerPage, setPostPerPage] = useState(6)

 //-----------------------------------------------------------------get-----------------------------------------------------

 const [data, setData] = useState([])
 const getData = async () => {
   const res = await axios.get("http://localhost:3002/userlist")
   setData(res.data)
   console.log("Response api", res.data)
 }
 useEffect(() => {
   getData()
 }, [])

//----------------------------------------------------------------post--------------------------------------------------------
const [id, setId] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
console.log(id, name, password)
const submitData = async () => {
  const data = {
    id,
    name,
    password
  }
  console.log(data)
  const res = await axios.post("http://localhost:3002/registeruser", data)
  console.log("postData response", res)
}

//----------------------------------------------------------------------update------------------------------------------------------

const [newid, setNewid] = useState("");
const [newname, setNewname] = useState("");
const [newpassword, setNewpassword] = useState("");

async function updateData(id, name, password) {
  console.log(id, name, password)
  setNewid(id);
  setNewname(name);
  setNewpassword(password);
  handleShows()
}

async function saveUpdatedData() {
  let response = await axios.put(`http://localhost:3002/usermodify/${newid}`,
    {
      "id": newid,
      "name": newname,
      "password": newpassword

    })
  console.log(response)
}

 //-----------------------------------------------------------toggle button--------------------------------------------------------
 async function activestatus(id) {
  let response = await
    axios.patch(`http://localhost:3002/userstatus?status=active&id=${id}`);
  console.log(response)
}
async function deactivestatus(id) {
  let response = await axios.patch(`http://localhost:3002/userstatus?status=deactive&id=${id}`);
  console.log(response)
}
//----------------------------------------------------------------------roles show--------------------------------------------------

const [role, setRole] = useState([]);

  const getApiData = async (e) => {
    console.log("hy");
    // e.preventDefault()
    const res = await axios.get("http://localhost:3002/getroles");
    console.log("hiiii roles")
    await setRole(res.data);
    console.log(res)
    setAssignrole(true)
    console.log("firstshow", role);
  }

//------------------------------------------------------------------------Assign Role----------------------------------------------------------------
const [uid, setUid] = useState("")
const [roleid, setRoleid] = useState("")

async function AssignRole() {
  let newData = {
    "id": uid,
    "roleid": roleid,

  }
  console.log("assign role")
  let response = await axios.post(`http://localhost:3002/assignrole`, newData);
  console.log("ho gy assgin")
  console.log(newData);
  console.log(response.data.affectedRows)

  // setSst(response.data.affectedRows)

}

//-------------------------------------------------------------------------------------get role assign-------------------------------------------------------------
const [usersrole, setUsersrole] = useState([]);
const getUsersApiData = async (id) => {
  const res = await axios.get(`http://localhost:3002/rolesget?id=${id}`);
  console.log("get role assign")
  setViewrole(true)
  await setUsersrole(res.data);
  console.log("first", res);
};
useEffect(() => {
  getApiData();
}, []);

//-------------------------------------------------------------------------------delete--------------------------------------------------
const deleteRoleAssign = async (id, roleid) => {
  const res = await axios.delete(`http://localhost:3002/revokerole?id=${id}&roleid=${roleid}`);
  console.log("Response api", uid)
  console.log("Response api hello", roleid)
  console.log(res)
  getData()
}
useEffect(() => {
  deleteRoleAssign()
}, [])

//--------------------------------------------------------------------------pagination------------------------------------------
const lastPostIndex = currentPage * postPerPage;
const firstPostIndex = lastPostIndex - postPerPage
const currentPosts = data.slice(firstPostIndex, lastPostIndex)
console.log(currentPosts, 'currentPosts')

    return (
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
    USERS
</Typography>
<Box >
  {/* <Button block style={{width:'70px',marginLeft:'55px'}} onClick={handleShow}>ADD</Button> */}
  <Button variant="light" style={{width:'70px',marginLeft:'55px',height:'35px'}}   onClick={handleShow}>ADD</Button>
  <input  type="search" placeholder="Search" style={{ height:'35px',marginLeft:'20px',paddingLeft:'50px'}}/>
      
</Box>   
<Box style={{marginTop:'20px',marginLeft:'50px',marginRight:'50px'}}>


<Table striped bordered hover variant="dark" border='1px' width="80%" height="100%" >
      <thead>
        <tr >
          <th>EMP ID</th>
          <th> NAME</th>
          <th>STATUS</th>
          <th>ROLES</th>
          <th>CREATEON</th>
          <th>ACTION</th>
          
        </tr>
      </thead>
      <tbody  style={{height:'100%',marginLeft:'50px'}}>
      {currentPosts &&
            currentPosts.map((item, index) => {
          return (
        <tr key={index} >
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.status == "deactive" ? (
                      <Switch onChange={(e) => activestatus(item.id, e)}
                      />
                    ) : (
                      <Switch
                        defaultChecked
                        onChange={(e) => deactivestatus(item.id, e)}
                      />

                    )
                    }</td>
          <td>  <BiSolidMessageSquareEdit  onClick={(e) => getApiData(e)} style={{ width:'40px',height:'30px',marginLeft:'10px'}}/>
            <BiSolidLowVision onClick={() => { getUsersApiData(item.id) }} style={{ width:'40px',height:'30px'}}/>
           </td>
          <td>{moment(item.createon).format('MMMM Do YYYY')}</td>
          <td><i class="fa fa-edit"  onClick={() => updateData(item.id, item.name, item.password)} style={{color:'red',fontSize:"30px"}}></i></td>
         
        </tr>
        
        )
      })}
      </tbody>
    </Table>
    <Paginations totalPosts={data.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} />
    </Box>
    </Box>
   </Box>
  {/* --------------------------------------------------------------------------Add DATA---------------------------------------- */}
  <Modal show={show} onHide={handleClose} style={{marginTop:'50px'}}>
          <Modal.Header closeButton>
            <Modal.Title>ADD DATA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicname">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control type="text" placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicname">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder=" Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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

{/* -----------------------------------------------------------------------update------------------------------------ */}
<Modal show={shows} onHide={handleCloses} style={{marginTop:'50px'}}>
          <Modal.Header closeButton>
            <Modal.Title>UPDATE DATA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicid">
                <Form.Label>Id</Form.Label>
                <Form.Control type="text" placeholder="Enter ID"  value={newid} onChange={(e) => setNewid(e.target.value)}  />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={newname} onChange={(e) => setNewname(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder=" Enter Password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)}></Form.Control>
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloses}>
              Close
            </Button>
            <Button variant="primary" onClick={() => saveUpdatedData()}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
  {/* -----------------------------------------------------------------------Assign role------------------------------------------- */}
  <Modal show={assignrole} onHide={handleCloseassign} style={{marginTop:'50px'}}>
          <Modal.Header closeButton>
            <Modal.Title>ASSIGN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> ID</Form.Label>
                <Form.Control type="text" value={uid} onChange={(e) => setUid(e.target.value)} placeholder="Enter User Id"

                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Choose Roles</Form.Label>{
                  <Form.Select aria-label="Default select example"

                    id="role_id"
                    name="role_id"
                    value={roleid}
                    onChange={(e) => setRoleid(e.target.value)}

                  >
                    <option></option>
                    {
                      role.map((row, index) => {
                        return <option value={row.roleid}>{row.roleid} {row.rolename}</option>;

                      })}

                  </Form.Select>
                }
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseassign}>
              Close
            </Button>
            <Button variant="primary" onClick={() => AssignRole()}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
{/* -------------------------------------------------------------------view------------------------------------------ */}
 <Modal show={viewrole} onHide={handleCloseviewrole} style={{marginTop:'50px'}} >

<Modal.Body>
            {usersrole.map((item) => {
              return (
                <>
                  <div>
                    <h5 style={{fontSize:'30px',backgroundColor:'black',marginTop:'20px',marginBottom:'20px'}}>{item.rolename}</h5>
                  </div>
                  <div>
                    <Button onClick={() => deleteRoleAssign(item.id, item.roleid)}>Revoke</Button>
                  </div>

                </>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseviewrole}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseviewrole}>
              Ok
            </Button>
          </Modal.Footer>
</Modal> 
            </ThemeProvider>

   
        
        
           
        </>
    )
}


export default User;