import {React,useState,useEffect} from 'react'
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
import moment from 'moment';
import { Switch } from '@mui/material';
import Paginations from './Paginations';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function Offer()
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

  //----------------------------------------------------------------------------------get---------------------------------------------------------
const [data, setData] = useState([])
const getData = async () => {
  const res = await axios.get("http://localhost:3002/viewoffer")
  setData(res.data)
  console.log("Response api",res.data)
}
useEffect(() => {
  getData()
},[])
//------------------------------------------------------------------------------------post-------------------------------------------------
const [offercode, setOffercode] = useState("");
const [offername, setOffername] = useState("");
const [valid_from, setValid_from] = useState("");
const [valid_to, setValid_to] = useState("");
const [discount_percentage, setDiscount_percentage] = useState("");
const [flat_discount, setFlat_discount] = useState("");


console.log(offercode,offername,valid_from,valid_to,discount_percentage,flat_discount)

const submitData = async () => {
  const data = {
    offercode,
    offername,
    valid_from,
    valid_to,
    discount_percentage,
    flat_discount,
   
  }
  console.log(data)
  const res = await axios.post("http://localhost:3002/insertoffer", data)
  console.log("postData response", res)
}
//--------------------------------------------------------------------------update------------------------------------------------------------------

const [newoffercode, setNewoffercode] = useState("");
const [newoffername, setNewoffername] = useState("");
const [newvalid_from, setNewvalid_from] = useState("");
const [newvalid_to, setNewvalid_to] = useState("");
const [newdiscount_percentage, setNewdiscount_percentage] = useState("");
const [newflat_discount, setNewflat_discount] = useState("");


async function updateData(offercode,offername,valid_from,valid_to,discount_percentage,flat_discount) {
  console.log(offercode,offername,valid_from,valid_to,discount_percentage,flat_discount)
  setNewoffercode(offercode);
  setNewoffername(offername);
  setNewvalid_from(valid_from);
  setNewvalid_to(valid_to);
  setNewdiscount_percentage(discount_percentage)
  setNewflat_discount(flat_discount)
  handleShowss()
}

async function saveUpdatedData() {
  let response = await axios.put(`http://localhost:3002/updateoffer/${newoffercode}`,
  {
    "offercode":newoffercode,
    "offername":newoffername,
    "valid_from":newvalid_from,
    "valid_to":newvalid_to,
    "discount_percentage":newdiscount_percentage,
    "flat_discount":newflat_discount

  })
  console.log(response)
}
//--------------------------------------------------------------------------toggle button-----------------------------------------------------------------------------------
async function activestatus(offercode,e)
{
let response = await axios.patch(`http://localhost:3002/updatestatusoffer?status=active&offercode=${offercode}`);
  console.log(response)
};

async function deactivestatus(offercode,e)
{
  let response = await axios.patch(`http://localhost:3002/updatestatusoffer?status=deactive&offercode=${offercode}`);
  console.log(response)
};
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
    OFFER
</Typography>
<Box >
<Button variant="light" style={{width:'70px',marginLeft:'55px',height:'35px'}}   onClick={handleShow}>ADD</Button>
  <input  type="search" placeholder="Search" style={{ height:'35px',marginLeft:'20px',paddingLeft:'50px'}}/>
      
</Box> 
 <Box style={{marginTop:'20px',marginLeft:'50px',marginRight:'50px'}}> 


  <Table striped bordered hover variant="dark" border='1px' width="80%" height="100%" >
      <thead>
        <tr class="table-dark">
          <th>OFFER CODE</th>
          <th>OFFER NAME</th>
          <th>VALID FROM</th>
          <th>VALID TO</th>
          <th>DISCOUNT</th>
          <th> FLAT DISCOUNT</th>
          <th>STATUS</th>
          <th>ACTION</th>
          
        </tr>
      </thead>
      <tbody  style={{height:'100%',marginLeft:'50px'}}>
      {currentPosts &&
            currentPosts.map((item,index) => (
        <tr  key={index}>
          <td>{item.offercode}</td>
          <td>{item.offername}</td>
          <td>{moment(item.valid_from).format('MMMM Do YYYY')}</td>
          <td>{moment(item.valid_to).format('MMMM Do YYYY')}</td>
          <td>{item.discount_percentage}</td>
          <td>{item.flat_discount}</td>
          <td>{
          item.status == "deactive" ? (
            <Switch onChange={(e) => activestatus(item.offercode,e)}
             />
           ) : (
            <Switch
            defaultChecked 
           onChange = {(e) => deactivestatus(item.offercode,e)}
          />
          
           )
        }</td>
          <td><i class="fa fa-edit"  onClick={() => updateData(item.offercode, item.offername, item.valid_from,item.valid_to,item.discount_percentage,item.flat_discount)} style={{color:'red',fontSize:"30px"}}></i></td>
         
        </tr>
        ))}
        
      </tbody>
    </Table>   
    <Paginations totalPosts = {data.length} postsPerPage={postPerPage} setCurrentPage ={setCurrentPage} /> 

    


      </Box> 
</Box>
</Box>
{/* -----------------------------------------------------------------add-------------------------------------------- */}
<Modal show={show} onHide={handleClose} style={{marginTop:'50px'}}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Offercode</Form.Label>
        <Form.Control type="text" placeholder="Enter offercode" value={offercode} onChange={(e) => setOffercode(e.target.value)}/>
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>offername</Form.Label>
        <Form.Control type="text" placeholder="Enter offername"   value={offername} onChange={(e) => setOffername(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Valid from</Form.Label>
        <Form.Control type="date" placeholder="Enter Valid_from"   value={valid_from} onChange={(e) => setValid_from(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Valid to</Form.Label>
        <Form.Control type="date" placeholder="Enter Valid_to"   value={valid_to} onChange={(e) => setValid_to(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>discount_percentage</Form.Label>
        <Form.Control type="text" placeholder="Enter Discount"  value={discount_percentage} onChange={(e) => setDiscount_percentage(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Flat_discount</Form.Label>
        <Form.Control type="text" placeholder="Enter Flat Discount"  value={flat_discount}  onChange={(e) => setFlat_discount(e.target.value)} />
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
{/* ---------------------------------------------------------------------------update------------------------------------------------------ */}
<Modal show={showss} onHide={handleClosess}  style={{marginTop:'50px'}}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Offercode</Form.Label>
        <Form.Control type="text" placeholder="Enter offercode" value={newoffercode} onChange={(e) => setNewoffercode(e.target.value)}/>
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>offername</Form.Label>
        <Form.Control type="text" placeholder="Enter offername"   value={newoffername} onChange={(e) => setNewoffername(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Valid from</Form.Label>
        <Form.Control type="date" placeholder="Enter Valid_from"   value={newvalid_from} onChange={(e) => setNewvalid_from(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Valid to</Form.Label>
        <Form.Control type="date" placeholder="Enter Valid_to"   value={newvalid_to} onChange={(e) => setNewvalid_to(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>discount_percentage</Form.Label>
        <Form.Control type="text" placeholder="Enter Discount"  value={newdiscount_percentage} onChange={(e) => setNewdiscount_percentage(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Flat_discount</Form.Label>
        <Form.Control type="text" placeholder="Enter Flat Discount"  value={newflat_discount}  onChange={(e) => setNewflat_discount(e.target.value)} />
      </Form.Group>
      
      
      
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosess}>
            Close
          </Button>
          <Button variant="primary"  onClick={()=>saveUpdatedData()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
        </ThemeProvider>
        </>
    )
}


export default Offer;