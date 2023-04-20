import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBarUser from "./components/NavBarUser";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/ShoppingCart";
import Profile from "./pages/Profile";
import login from "./pages/login";

function App() {
  return (
    <div className="App">
      <Router>
      <NavBarUser/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/productos" element={<Products/>}/>
          <Route path="/carrito" element={<Cart/>}/>
          <Route path="/perfil" element={<Profile/>}/>
          <Route path="/login" element={<login/>}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
