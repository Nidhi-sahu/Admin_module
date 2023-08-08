// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './Login';
import User from './pages/Users';
import Roles from './pages/Roles';
import Subcategory from './pages/Subcategory';
import Category from './pages/Category';
import Thirdparty from './pages/Thirdparty';
import Offer from './pages/Offer';
import Retailer from './pages/Retailer';
import Customer from './pages/Customer';
import Dashboardone from './pages/Dasboardone';


function App() {
  return (
    <> 
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/dash' element={<Dashboard />}></Route>
          <Route path='/dashboard' element={<Dashboardone />}></Route>
          <Route path='/user' element={<User />}></Route>
          <Route path='/role' element={<Roles />}></Route>
          <Route path='/subcategory' element={<Subcategory />}></Route>
          <Route path='/category' element={<Category />}></Route>
          <Route path='/customer' element={<Customer />}></Route>
          <Route path='/thirdparty' element={<Thirdparty />}></Route>
          <Route path='/offer' element={<Offer />}></Route>
          <Route path='/retailer' element={<Retailer />}></Route>
        </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
