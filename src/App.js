import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import Privatecomponent from "./components/Privatecomponent";
import Login from "./pages/Login";
import Users from "./components/Users";
import Edit from "./components/Edit"
import Home from './pages/Home';
import Register from './pages/Register'
import Profile from './pages/Profile';
import Products from './pages/Products';
import Addproduct from './pages/Addproducts';
import Productslist from './pages/Productslist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Editproduct from './pages/Editproduct';
import Productdetails from './pages/Productdetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Thankyou from './pages/Thankyou';
import Orders from './pages/Orders';
import Orderdetails from './pages/Orderdetails';
import Completedorders from './pages/Completedorders';
import Aboutus from './pages/Aboutus';
import Thankforsignup from './components/Thankforsignup';

function App() {
  return (
    <>
    <BrowserRouter>
    <ToastContainer />
    <Navbar />
    <Routes>
        <Route element={<Privatecomponent />}>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/aboutus" element={<Aboutus />}/>
        <Route path="/user" element={<Users />}/>
        <Route path="/edit/:Id" element={<Edit />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/thankyou" element={<Thankyou />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/thankforsignup" element={<Thankforsignup />}/>
        <Route path='/checkout' element={<Checkout />} />
        <Route path="/addProduct" element={<Addproduct />}/>
        <Route path="/productsList" element={<Productslist/>}/>
        <Route path="/editProduct/:Id" element={<Editproduct />}/>
        <Route path="/productDetails/:Id" element={<Productdetails />}/>
        <Route path="/orderDetails/:Id" element={<Orderdetails />}/>
        <Route path="/completedOrders" element={<Completedorders />}/>
        <Route path="/orders" element={<Orders />}/>
        </Route>
        <Route path="/register" element={<Register />}/>
        <Route path="/thankforsignup" element={<Thankforsignup />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
