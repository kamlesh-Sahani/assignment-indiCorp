import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import './App.css'

import Register from './pages/register/Register';
import Login from "./pages/login/Login";
import AdminRegister from "./pages/admin/register/Register";
import AdminLogin from "./pages/admin/login/Login";
import Home from "./pages/home/Home";
import Tool from "./pages/tool/Tool";
function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={
          <Home />

        }/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/admin/register' element={<AdminRegister />}/>
        <Route path='/admin/login' element={<AdminLogin />}/>
        <Route path="/tool" element={<Tool />}/>
      </Routes>
    </Router>
  )
}

export default App
