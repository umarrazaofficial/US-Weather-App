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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Aboutus from './pages/Aboutus';
import Thankforsignup from './components/Thankforsignup';
import Weatherupdates from './pages/Weatherupdates';

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
        <Route path="/aboutus" element={<Aboutus />}/>
        <Route path="/user" element={<Users />}/>
        <Route path="/edit/:Id" element={<Edit />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/weatherupdates" element={<Weatherupdates />}/>
        <Route path="/thankforsignup" element={<Thankforsignup />}/>
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
