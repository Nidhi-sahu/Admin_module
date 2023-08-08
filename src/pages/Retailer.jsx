import {  react,useState,useEffect }from 'react'
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
import { Switch } from '@mui/material';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function Retailer()
{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showss, setShowss] = useState(false);
  const handleClosess = () => setShowss(false);
  const handleShowss = () => setShowss(true);
  //-----------------------------States for pagination-----------------------------------
  const[currentPage, setCurrentPage] = useState(1)
  const[postPerPage, setPostPerPage] = useState(6)

  //-----------------------------------------------------------toggle button--------------------------------------------------------
  async function activestatus(id) {
    let response = await
      axios.patch(`http://localhost:3002/updateshopstatus?status=active&retailer_id=${id}`);
    console.log(response)
  }
  async function deactivestatus(id) {
    let response = await axios.patch(`http://localhost:3002/updateshopstatus?status=deactive&retailer_id=${id}`);
    console.log(response)
  }

  //-----------------------------------------------------------------------get------------------------------------------------------------------
const[data, SetData] = useState([])
const getData = async () =>{
  const res = await axios.post("http://localhost:3002/viewshop")
  SetData(res.data)
  console.log("Response",res.data)
  
}

useEffect(() => {
  getData()
},[])
//---------------------------------------------------------------------------------post---------------------------------------------------------

let [retailer_id,setRetailer_id] = useState('');
let [shop_name,setShop_name] = useState('');
let [password,setPassword] = useState('');
let [owner_name,setOwner_name] = useState('');
let [ registration_doc,setRegistration_doc] = useState('');
let [profile_photo,setProfile_photo] = useState('');
let [ gst_no,setGst_no] = useState('');
let [pan_no, setPan_no] = useState('');
let [address,setAddress] = useState('');
let [state,setState] = useState('');
let [city,setCity] = useState('');
let [pincode,setPincode] = useState('');
let [contact_no, setContact_no]  = useState('');
let [ email,setEmail] = useState('');
// let [status,setStatus] = useState('');



const submitData = async () => {
  const data = {
  retailer_id,
  shop_name,
  password,
  owner_name,
  registration_doc,
  profile_photo,
  gst_no,
  pan_no,
  address,
  state,
  city,
  pincode,
  contact_no,
  email,
  // status 
}
  console.log(data)
  const res = await axios.post("http://localhost:3002/shopregistration",data)
  console.log("postData response",res)
  
}
//----------------------------------------------------------------------update----------------------------------------------------------------------
const [newretailer_id, setNewretailer_id] = useState("");
const [newshop_name, setNewshop_name] = useState("");
const [newpassword, setNewpassword] = useState("");
const [newowner_name, setNewowner_name] = useState("");
const [newregistration_doc, setNewregistration_doc] = useState("");
const [newprofile_photo, setNewprofile_photo] = useState("");
const [newgst_no, setNewgst_no] = useState("");
const [newpan_no, setNewpan_no] = useState("");
const [newaddress, setNewaddress] = useState("");
const [newstate, setNewstate] = useState("");
const [newcity, setNewcity] = useState("");
const [newpincode, setNewpincode] = useState("");
const [newcontact_no, setNewcontact_no] = useState("");
const [newemail, setNewemail] = useState("");
// const [newstatus, setNewstatus] = useState("");

async function updateData(retailer_id, shop_name, password,owner_name,registration_doc,profile_photo,gst_no,pan_no,address,state,city,pincode,contact_no,email) {
  console.log(retailer_id, shop_name, password,owner_name,registration_doc,profile_photo,gst_no,pan_no,address,state,city,pincode,contact_no,email)
  setNewretailer_id(retailer_id);
  setNewshop_name(shop_name);
  setNewpassword(password);
  setNewowner_name(owner_name);
  setNewregistration_doc(registration_doc);
  setNewprofile_photo(profile_photo);
  setNewgst_no(gst_no);
  setNewpan_no(pan_no);
  setNewaddress(address);
  setNewstate(state);
  setNewcity(city);
  setNewpincode(pincode);
  setNewcontact_no(contact_no);
  setNewemail(email);
  // setNewstatus(status);
 handleShowss()
}

async function saveUpdatedData() {
  let response = await axios.patch(`http://localhost:3002/updateshop/${newretailer_id}`,
  {
    "retailer_id":newretailer_id,
    "shop_name":newshop_name,
    "password":newpassword,
    "owner_name":newowner_name,
    "registration_doc":newregistration_doc,
    "profile_photo":newprofile_photo,
    "gst_no":newgst_no,
    "pan_no":newpan_no,
    "address":newaddress,
    "state":newstate,
    "city":newcity,
    "pincode":newpincode,
    "contact_no":newcontact_no,
    "email":newemail
    // "status":newstatus
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
   RETAILER
</Typography>
<Box >
<Button variant="light" style={{width:'70px',marginLeft:'55px',height:'35px'}}   onClick={handleShow}>ADD</Button>
    <input  type="search" placeholder="Search" style={{ height:'35px',marginLeft:'20px',paddingLeft:'50px'}}/>    
      
</Box> 
<Box style={{marginTop:'20px',marginLeft:'50px',marginRight:'50px'}}>


<Table striped bordered hover variant="dark" border='1px' width="80%" height="100%" >
      <thead>
        <tr >
          <th>RETAILER ID</th>
          <th>SHOP NAME</th>
          {/* <th>Pssword</th> */}
          <th>OWNER</th>
          {/* <th>Reg_doc</th> */}
          <th>PROFILE</th>
          <th>GST</th>
          <th>PAN</th>
          <th>ADDRESS</th>
          {/* <th>State</th> */}
          <th>CITY</th>
          <th>PINCODE</th>
          {/* <th>Contact</th> */}
          {/* <th>Email</th> */}
          <th>STATUS</th>   
          <th>ACTION</th>
          <th>REGISTER ON</th>
          
        </tr>
      </thead>
        <tbody  style={{height:'100%',marginLeft:'50px'}}>
        {currentPosts &&
            currentPosts.map((item,index) =>{
        return(
        < tr  key={index} >
          <td>{item.retailer_id}</td>
          <td>{item.shop_name}</td>
            {/* <td>{item.password}</td> */}
          <td>{item.owner_name}</td>
           {/* <td>{item.registration_doc}</td> */}
          <td>{item.profile_photo}</td>
          <td>{item.gst_no}</td>
          <td>{item.pan_no}</td>
          <td>{item.address}</td>
           {/* <td>{item.state}</td> */}
          <td>{item.city}</td>
          <td>{item.pincode}</td>
          {/* <td>{item.contact_no}</td> */}
          {/* <td>{item.email}</td> */}
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
          <td><i class="fa fa-edit"  onClick={() => updateData(item.retailer_id, item.shop_name,item.password,item.owner_name,item.registration_doc,item.profile_photo,item.gst_no,item.pan_no,item.address,item.state,item.city,item.pincode,item.contact_no,item.email)} style={{color:'red',fontSize:"25px"}}></i></td>
          <td>{item.registration_no}</td>
        </tr>
        
        )})
      }
      </tbody>
    </Table>
    <Paginations totalPosts = {data.length} postsPerPage={postPerPage} setCurrentPage ={setCurrentPage} /> 
    </Box>
</Box>
</Box>
{/* ----------------------------------------------------------add data------------------------------------- */}
<Modal show={show} onHide={handleClose} style={{}}>
          
        <Modal.Header closeButton>
         
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <div style={{display:"flex"}}>  
        <div style={{marginRight:"40px"}}>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> retailer_id</Form.Label>
        <Form.Control type="name" placeholder="retailer_id" value={retailer_id} onChange={(e) =>setRetailer_id(e.target.value) } />
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>shop_name</Form.Label>
        <Form.Control type="text" placeholder="Enter shop_name" value={shop_name} onChange={(e) =>setShop_name(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) =>setPassword(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> owner_name</Form.Label>
        <Form.Control type="text" placeholder=" Enter owner_name" value={owner_name} onChange={(e) =>setOwner_name(e.target.value) }  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> registration_doc</Form.Label>
        <Form.Control type="text" placeholder="Enter registration" value={registration_doc} onChange={(e) =>setRegistration_doc(e.target.value) }  />
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> profile_photo</Form.Label>
        <Form.Control type="text" placeholder="Enter profile_photo" value={profile_photo} onChange={(e) =>setProfile_photo(e.target.value) }  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> contact_no</Form.Label>
        <Form.Control type="text" placeholder="Enter contact_no"  value={contact_no} onChange={(e) =>setContact_no(e.target.value) } />
      </Form.Group>
      
      </Form>
      </div>
      
      <div>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Gst_no</Form.Label>
        <Form.Control type="text" placeholder="Enter gst_no" value={gst_no} onChange={(e) =>setGst_no(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Pan_no</Form.Label>
        <Form.Control type="text" placeholder="Enter Pan_no" value={pan_no} onChange={(e) =>setPan_no(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) =>setAddress(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>State</Form.Label>
        <Form.Control type="text" placeholder="Enter State" value={state} onChange={(e) =>setState(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder="Enter City" value={city} onChange={(e) =>setCity(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Pincode</Form.Label>
        <Form.Control type="text" placeholder="Enter Pincode" value={pincode} onChange={(e) =>setPincode(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) =>setEmail(e.target.value) }/>
      </Form.Group>
      
      
    </Form>
   </div> 
   </div> 
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
    {/* ----------------------------------------------------------------------------update------------------------------------ */}
    <Modal show={showss} onHide={handleClosess}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{display:"flex"}}>  
        <div style={{marginRight:"40px"}}>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> retailer_id</Form.Label>
        <Form.Control type="name" placeholder="retailer_id" value={newretailer_id} onChange={(e) =>setNewretailer_id(e.target.value) } />
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>shop_name</Form.Label>
        <Form.Control type="text" placeholder="Enter shop_name" value={newshop_name} onChange={(e) =>setNewshop_name(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={newpassword} onChange={(e) =>setNewpassword(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> owner_name</Form.Label>
        <Form.Control type="text" placeholder=" Enter owner_name" value={newowner_name} onChange={(e) =>setNewowner_name(e.target.value) }  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> registration_doc</Form.Label>
        <Form.Control type="text" placeholder="Enter registration" value={newregistration_doc} onChange={(e) =>setNewregistration_doc(e.target.value) }  />
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> profile_photo</Form.Label>
        <Form.Control type="text" placeholder="Enter profile_photo" value={newprofile_photo} onChange={(e) =>setNewprofile_photo(e.target.value) }  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> contact_no</Form.Label>
        <Form.Control type="text" placeholder="Enter contact_no"  value={newcontact_no} onChange={(e) =>setNewcontact_no(e.target.value) } />
      </Form.Group>
      
      </Form>
      </div>
      <div>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Gst_no</Form.Label>
        <Form.Control type="text" placeholder="Enter gst_no" value={newgst_no} onChange={(e) =>setNewgst_no(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Pan_no</Form.Label>
        <Form.Control type="text" placeholder="Enter Pan_no" value={newpan_no} onChange={(e) =>setNewpan_no(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter Address" value={newaddress} onChange={(e) =>setNewaddress(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>State</Form.Label>
        <Form.Control type="text" placeholder="Enter State" value={newstate} onChange={(e) =>setNewstate(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder="Enter City" value={newcity} onChange={(e) =>setNewcity(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Pincode</Form.Label>
        <Form.Control type="text" placeholder="Enter Pincode" value={newpincode} onChange={(e) =>setNewpincode(e.target.value) }/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" value={newemail} onChange={(e) =>setNewemail(e.target.value) }/>
      </Form.Group>
      
      
    </Form>
   </div> 
   </div> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosess}>
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


export default Retailer;