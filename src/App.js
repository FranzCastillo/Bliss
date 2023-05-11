import './App.css';
import React from 'react';
import {useEffect, useState} from 'react';
import {supabase} from './supabase/client.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBarUser from "./components/NavBarUser";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/ShoppingCart";
import Profile from "./pages/Profile";
import login from "./pages/login";
import ShoppingCartProvider from "./contexts/ShoppingCartContext";
import {Container} from "@mui/material";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ProductsGrid from './pages/ProductsGrid';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {

    //Obtener los lugares que se muestran en el select
    async function getProducts() {
        const {data: productData} = await supabase.rpc('getproducts')
        //await supabase.from('categorias').select('*');
        //await supabase.rpc('getproducts')
        setProductos(productData);
    }
    getProducts();

  }, []);

  const products = productos.map((dato) => ({
    id: dato.id,
    name: dato.nombre,
    detail: dato.descripcion,
    code: dato.codigo,
    price: dato.precio,
    imageUrl: dato.imagen,
  }));

  console.log(products)

    // Products data for the grid (test)

      
      return (
        <div className="App">
            <ShoppingCartProvider>
                <Router>
                    <NavBarUser/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/productos" element={<Products/>}/>
                        <Route path="/grid" element={<ProductsGrid products={products} />}/>
                        <Route path="/carrito" element={<Cart/>}/>
                        <Route path="/perfil" element={<Profile/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                    </Routes>
                </Router>
            </ShoppingCartProvider>
        </div>

        
    );

}

export default App;
