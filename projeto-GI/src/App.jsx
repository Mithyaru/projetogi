import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Navbar from './navbar/navbar'
import Login from './login/login'
import Cadastro from './cadastro/Cadastro'
import Timer from "./timer/Timer";
import Perfil from "./perfil/Perfil";

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Navbar></Navbar>
      <div className='content'>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<Cadastro />} replace /> 
        </Routes>
      </div>
    </Router>
  )
}

export default App
